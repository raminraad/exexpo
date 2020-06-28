import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList, TextInput, ScrollView, Modal, Alert, RecyclerViewBackedScrollView } from "react-native";
import { Separator, Content, Container, Spinner } from "native-base";
import { Overlay, ListItem, PricingCard, Button } from "react-native-elements";
import { Formik } from "formik";
import { RadioButton, Text, Divider } from "react-native-paper";
import Swipeable from "react-native-gesture-handler/Swipeable";
import * as rxGlobal from "../lib/rxGlobal";
import { Icon, SearchBar } from "react-native-elements";
import { FontAwesome5,FontAwesome,MaterialCommunityIcons ,AntDesign ,Entypo,Feather } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import VisitPlanResultProductForm from "./VisitPlanResultProductForm";
import { openDatabase } from "expo-sqlite";
import * as Location from "expo-location";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import { getDistance, getPreciseDistance } from "geolib";
import Moment from "moment";
import * as enums from "../lib/enums";
import VisitPlanResultContext from "../contexts/VisitPlanResultContext";

export default function VisitPlanResultForm(props) {
  const db = openDatabase("db");
  let navigation = props.navigation;
  let { initialItem } = props.route.params;
  const [visitResultStatus, setVisitResultStatus] = useState(initialItem?.ResultStatus ?? null);
  const [rawData, setRawData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productModalItem, setProductModalItem] = useState(null);
  const visitPlanResultContext = useContext(VisitPlanResultContext);
  let contextValue = visitPlanResultContext.value;
  const isGeoLocationAcceptable = async (lat, long) => {
    console.log("SUBMITTING");
    let { status } = await Location.requestPermissionsAsync();
    console.log(status);
    if (status !== "granted") {
      Alert.alert(
        "",
        rxGlobal.globalLiterals.validationErrors.locationPermissionDenied,
        [
          {
            text: rxGlobal.globalLiterals.buttonTexts.ok,
          },
        ],
        { cancelable: true }
      );
      return false;
    } else {
      let userLocation = await Location.getCurrentPositionAsync({});
      console.log(`1 : ${JSON.stringify(userLocation)}`);

      let p1 = { latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude };
      console.log(p1);
      let p2 = { latitude: lat, longitude: long };
      console.log(p2);
      let distance = await getPreciseDistance(p1, p2, 1);
      console.log(distance);

      if (userLocation && distance <= global.dynamicSetting.allowedDistanceForVisitor) return true;
      else {
        Alert.alert(
          "",
          rxGlobal.globalLiterals.validationErrors.notInGeoRange,
          [
            {
              text: rxGlobal.globalLiterals.buttonTexts.ok,
            },
          ],
          { cancelable: true }
        );
        return false;
      }
    }
  };

  const onProductModalSubmit = (item) => {
    let rawClone = [...rawData];
    if (item.rxSync === enums.syncStatuses.synced || item.rxSync === enums.syncStatuses.modified) {
      item.rxSync = enums.syncStatuses.modified;
      rawClone[rawClone.findIndex((r) => r.rxKey === item.rxKey)] = item;
    } else {
      if (!item.rxKey)
        item.rxKey =
          Math.max.apply(
            Math,
            rawClone.map(function (o) {
              return o.rxKey;
            })
          ) + 1;
      rawClone.push(item);
    }
    setRawData(rawClone);
    setIsProductModalVisible(false);
  };

  const confirmAndDelete = (item) => {
    Alert.alert(
      "",
      rxGlobal.globalLiterals.Confirmations.deleteProduct,
      [
        {
          text: rxGlobal.globalLiterals.buttonTexts.yes,
          onPress: () => onListItemDelete(item),
        },
        {
          text: rxGlobal.globalLiterals.buttonTexts.no,
        },
      ],
      { cancelable: true }
    );
  };

  const onListItemDelete = (item) => {
    let rawClone = [...rawData];
    let index = rawClone.findIndex((r) => r.rxKey === item.rxKey);
    if (item.rxSync === enums.syncStatuses.synced || item.rxSync === enums.syncStatuses.modified) {
      item.rxSync = enums.syncStatuses.deleted;
      rawClone[index] = item;
    } else {
      rawClone.splice(index, 1);
    }
    setRawData(rawClone);
  };

  useEffect(() => {
    let rawDataQuery = `select *,res.Id as Id, ${enums.syncStatuses.synced} as rxSync from VisitPlanResults res
     inner join ProductSub sub on res.ProductSubId = sub.Id
     inner join Product prd on prd.Id = sub.ProductId
     inner join ProductGroup grp on grp.Id =  prd.ProductGroupId
     where VisitPlanCustomerId = ${initialItem.Id}`;

    db.transaction((tx) => {
      tx.executeSql(
        rawDataQuery,
        [],
        (_, { rows: { _array } }) => {
          //todo: replace with sql side indexing
          for (let i = 0; i < _array.length; i++) _array[i].rxKey = i + 1;

          setRawData(_array);
          console.log(`👍 RAW_DATA: ${rawDataQuery} => length: ${_array.length} => ${JSON.stringify([..._array])}`);
        },
        (transaction, error) => console.log(`❌ ${rawDataQuery} =>=> ${error}`)
      );
    });

    setIsLoading(false);
    return () => console.log("EFFECT");
  }, []);


  const renderSubtitle = (item) => (
    <View style={{ flexDirection: "row-reverse", marginTop: 10 ,justifyContent:'space-evenly'}}>
      <View style={styles.subtitleFieldContainer}>
        <FontAwesome name='money' size={16} color={rxGlobal.globalColors.listItemSubtitleIcon} />
        {item.PriceValue ? (
          <View style={styles.subtitleFieldContainer}>
            <Text style={{ ...styles.titleValue, marginRight: 5 }}>{item.PriceValue}</Text>
            <Text style={styles.titleScale}>{enums.priceTypesToLiteral(item.PriceType)}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.subtitleFieldContainer}>
        <MaterialCommunityIcons name='altimeter' size={16} color={rxGlobal.globalColors.listItemSubtitleIcon} />
        {item.MeasurmentScale ? (
          <View style={styles.subtitleFieldContainer}>
            <Text style={{ ...styles.titleValue, marginRight: 5 }}>{item.MeasurmentScale}</Text>
            <Text style={styles.titleScale}>{enums.measurementTypesToLiteral(item.MeasurmentType)}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.subtitleFieldContainer}>
        <FontAwesome5 name='eye' size={16} color={rxGlobal.globalColors.listItemSubtitleIcon} />
          <View style={styles.subtitleFieldContainer}>
            <Text style={{ ...styles.titleValue, marginRight: 5 }}>{item.ShelfVisibleCount}</Text>
          </View>
      </View>
    </View>
  );
  const renderSubtitle0 = (item) => (
    <View style={styles.listItemSubtitleContainer}>
      <View style={styles.listItemSubtitleItem}>
        <FontAwesome name='money' size={rxGlobal.globalSizes.icons.small} color={rxGlobal.globalColors.listItemSubtitleIcon} />
        <Text style={styles.listItemSubtitleText}>{item.SellPrice} ريال</Text>
      </View>
      <View style={styles.listItemSubtitleItem}>
        <FontAwesome5 name='weight-hanging' size={rxGlobal.globalSizes.icons.small} color={rxGlobal.globalColors.listItemSubtitleIcon} />
        <Text style={styles.listItemSubtitleText}>{item.Weight} گرم</Text>
      </View>
      <View style={styles.listItemSubtitleItem}>
        <FontAwesome5 name='eye' size={rxGlobal.globalSizes.icons.small} color={rxGlobal.globalColors.listItemSubtitleIcon} />
        <Text style={styles.listItemSubtitleText}>{item.ShelfVisibleCount}</Text>
      </View>
    </View>
  );
  const swipeLeftAction = (item) => (
    <View style={rxGlobal.globalStyles.listItemSwipeLeftContainer}>
      <FontAwesome5 name='trash-alt' onPress={() => confirmAndDelete(item)} size={rxGlobal.globalSizes.icons.medium} color={rxGlobal.globalColors.btnDelete} />
      <Separator style={{ backgroundColor: rxGlobal.globalColors.transparent }} />
      <FontAwesome5
        name='edit'
        onPress={() => {
          setProductModalItem(item);
          setIsProductModalVisible(true);
        }}
        size={rxGlobal.globalSizes.icons.medium}
        color={rxGlobal.globalColors.btnUpdate}
      />
    </View>
  );

  const [isProductModalVisible, setIsProductModalVisible] = useState(false);

  const renderItemBreadcrump = (item, i) => {
    let data = item.productGroupTitles.concat(item.productTitle).reverse();
    return (
      <View>
        <FlatList
          contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
          horizontal={true}
          ItemSeparatorComponent={() => (
            <FontAwesome5
              name='chevron-left'
              size={12}
              color={rxGlobal.globalColors.breadcrumpSeparator}
              style={{ alignSelf: "center", marginHorizontal: 10 }}
            />
          )}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => <Text style={data.indexOf(item)===0? rxGlobal.globalStyles.breadCrumpLevel2:rxGlobal.globalStyles.breadCrumpLevel1}>{item}</Text>}
        />
      </View>
    );
  };

  const renderItemHeader = (item, i) => (
    <Swipeable renderLeftActions={() => swipeLeftAction(item)} key={item.rxKey}>
      <ListItem
        containerStyle={[rxGlobal.globalStyles.shadowedContainer, rxGlobal.globalStyles.listItemHeaderContainer]}
        Component={TouchableScale}
        key={item.rxKey}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        linearGradientProps={rxGlobal.globalColors.gradients.listItem}
        title={() => renderItemBreadcrump(item)}
        subtitle={() => renderSubtitle(item)}
      />
    </Swipeable>
  );

  const renderEmptyList = () => (
    <View style={{ ...rxGlobal.globalStyles.emptyList, marginLeft: 20, marginTop: 10 }}>
      <Text style={{ color: rxGlobal.globalColors.listItemSubtitleText }}>{rxGlobal.globalLiterals.messages.emptyList}</Text>
    </View>
  );

  return (
    <Container>
      <Content>
        <ScrollView style={{padding:20 }} keyboardShouldPersistTaps='handled'>
          {/* <Modal visible={isProductModalVisible} animationType='slide'>
            <VisitPlanResultProductForm onSubmit={onProductModalSubmit} onCancel={() => setIsProductModalVisible(false)} initialItem={productModalItem} />
          </Modal> */}
          <View style={{flexDirection:'row-reverse',alignItems:'center',justifyContent:'center',marginBottom:18}}>
          <Entypo name="shop" size={26} color={rxGlobal.globalColors.screenTitleText} />
            <Text style={[rxGlobal.globalStyles.screenTitleText,{marginRight:10}]}>{contextValue.visitPlanCustomer.Title}</Text>
          </View>
          <View style={{ flexDirection: "row-reverse", justifyContent: "space-between" }}>
            <Text style={rxGlobal.globalStyles.addModalFieldTitle}>فهرست محصولات</Text>
            {/* <View style={rxGlobal.globalStyles.shadowedContainer}>
              <FontAwesome5.Button
                name='plus'
                backgroundColor={globalColors.btnAdd}
                onPress={() => {
                  setProductModalItem({
                    rxSync: enums.syncStatuses.created,
                    ProductSubId: "",
                    SellPrice: "",
                    Weight: "",
                    ShelfVisibleCount: "",
                    VisitPlanCustomerId: initialItem.Id,
                  });
                  setIsProductModalVisible(true);
                }}>
                افزودن آیتم به لیست پویش فروشگاه
              </FontAwesome5.Button>
            </View> */}
          </View>
          {isLoading ? (
            <Spinner style={{ height: "100%" }} color='grey' size={50} />
          ) : contextValue.visitPlanResults.length ? (
            contextValue.visitPlanResults.filter((r) => r.rxSync !== enums.syncStatuses.deleted).map((item, i) => renderItemHeader(item, i))
          ) : (
            renderEmptyList()
          )}
          <Formik
            initialValues={initialItem}
            onSubmit={async (values, actions) => {
              if (
                !global.dynamicSetting.allowedDistanceForVisitor ||
                !initialItem.Lat ||
                !initialItem.Long ||
                (await isGeoLocationAcceptable(initialItem.Lat, initialItem.Long))
              ) {
                console.log("submitting");
                actions.resetForm();
                //fixme: convert context before save
                values.details = contextValue.visitPlanResults;
                values.LastModifiedDate = Moment(new Date()).format("YYYY/MM/DD HH:mm:ss");
                values.ResultVisitedDate = Moment(new Date()).format("YYYY/MM/DD HH:mm:ss");
                values.SyncStatus = enums.syncStatuses.modified;
                values.rxSync = enums.syncStatuses.modified;
                navigation.navigate("VisitPlanCustomers", { yoyo: values });
              }
            }}>
            {(props) => (
              <View style={{ marginTop: 30 }}>
                <View>
                  <Text style={rxGlobal.globalStyles.addModalFieldTitle}>شرح مختصر</Text>
                  <TextInput
                    style={[rxGlobal.globalStyles.addModalFieldInput, { height: 100 }, rxGlobal.globalStyles.listItemHeaderContainer]}
                    textAlignVertical='top'
                    placeholder='توضیحات مختصر درباره گزارش پویش'
                    multiline
                    onChangeText={props.handleChange("ResultSummary")}
                    value={props.values.ResultSummary}
                  />
                </View>
                <View style={{marginTop:30}}>
                  <Text style={rxGlobal.globalStyles.addModalFieldTitle}>وضعیت</Text>
                  <View style={[rxGlobal.globalStyles.addModalFieldInput, rxGlobal.globalStyles.addModalFieldRadioButtonGroupContainer,rxGlobal.globalStyles.listItemHeaderContainer]}>
                    <RadioButton.Group onValueChange={(value) => props.setFieldValue("ResultStatus", value)} value={props.values.ResultStatus} >
                      <View style={rxGlobal.globalStyles.radioItemContainer}>
                      <RadioButton uncheckedColor='#02c39a' color='#02c39a' value={7} />
                        <Text style={{color:'#02c39a'}}>پویش موفق</Text>
                      </View>
                      <View style={rxGlobal.globalStyles.radioItemContainer}>
                      <RadioButton uncheckedColor='#f94144' color='#f94144' value={3} />
                        <Text style={{color:'#f94144'}}>عدم همکاری</Text>
                      </View>
                      <View style={rxGlobal.globalStyles.radioItemContainer}>
                      <RadioButton uncheckedColor='#0077b6' color='#0077b6' value={11} />
                        <Text style={{color:'#0077b6'}}>تغییر کاربری</Text>
                      </View>
                      <View style={rxGlobal.globalStyles.radioItemContainer}>
                        <RadioButton uncheckedColor='#0077b6' color='#0077b6' value={13} />
                        <Text style={{color:'#0077b6'}}>یافت نشد</Text>
                      </View>
                      <View style={rxGlobal.globalStyles.radioItemContainer}>
                        {/* fixme : ask the enum value of 2} */}
                        <RadioButton uncheckedColor='#0077b6' color='#0077b6' value={2} />
                        <Text style={{color:'#0077b6'}}>پویش نشده</Text>
                      </View>
                    </RadioButton.Group>
                  </View>
                </View>

                <View style={{ marginTop: 60, flexDirection: "row-reverse", justifyContent: "space-around"}}>
                  <TouchableOpacity
                    style={{ ...rxGlobal.globalStyles.buttonGroupButton, backgroundColor: rxGlobal.globalColors.btnAdd }}
                    onPress={props.handleSubmit}>
                    <Text style={{ color: "white" }}>{rxGlobal.globalLiterals.buttonTexts.ok}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ ...rxGlobal.globalStyles.buttonGroupButton, backgroundColor: rxGlobal.globalColors.btnCancel }}
                    onPress={navigation.goBack}>
                    <Text style={{ color: "white" }}>{rxGlobal.globalLiterals.buttonTexts.cancel}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        
        </ScrollView>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  listItemSubtitleContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-around",
  },
  listItemSubtitleItem: {
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  listItemSubtitleText: {
    color: rxGlobal.globalColors.listItemSubtitleText,
    marginHorizontal: 3,
  },

  subtitleFieldContainer: { flexDirection: "row-reverse", alignItems: "center"},
  titleValue: { fontSize: 18, color: rxGlobal.globalColors.listItemTitleText, fontWeight: "bold", marginLeft: 5 },
  titleScale: { fontSize: 12 },

});
