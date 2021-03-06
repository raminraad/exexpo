import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList, TextInput, ScrollView, Modal, Alert, RecyclerViewBackedScrollView } from "react-native";
import { Separator, Content, Container, Spinner } from "native-base";
import { Overlay, ListItem, PricingCard, Button } from "react-native-elements";
import { Formik } from "formik";
import { RadioButton, Text, Divider } from "react-native-paper";
import Swipeable from "react-native-gesture-handler/Swipeable";
import * as rxGlobal from "../lib/rxGlobal";
import { Icon, SearchBar } from "react-native-elements";
import { FontAwesome5, FontAwesome, MaterialCommunityIcons, AntDesign, Entypo, Feather } from "@expo/vector-icons";
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
  let navigation = props.navigation;
  const [rawData, setRawData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productModalItem, setProductModalItem] = useState(null);
  const visitPlanResultContext = useContext(VisitPlanResultContext);
  
  // let { initialItem } = contextValue?.visitPlanCustomer;

  useEffect(() => {
    // setContextValue(visitPlanResultContext.value);
    console.log('EFFECT')
    console.log(JSON.stringify(visitPlanResultContext.value))
    console.log(JSON.stringify(visitPlanResultContext.value))
    
  }, []);

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
    let clone = {...visitPlanResultContext.value};
    let index = clone.visitPlanResults.findIndex((r) => r.rxKey === item.rxKey);
    if (item.rxSync === enums.syncStatuses.synced || item.rxSync === enums.syncStatuses.modified) {
      item.rxSync = enums.syncStatuses.deleted;
      clone.visitPlanResults[index] = item;
    } else {
      clone.visitPlanResults.splice(index, 1);
    }
    visitPlanResultContext.setValue(clone);
  };

  const renderSubtitle = (item) => (
    <View style={{ flexDirection: "row-reverse", marginTop: 10, justifyContent: "space-evenly" }}>
      <View style={styles.subtitleFieldContainer}>
        <FontAwesome name='money' size={16} color={rxGlobal.globalColors.listItemSubtitleIcon} />
        {item.SellPrice ? (
          <View style={styles.subtitleFieldContainer}>
            <Text style={{ ...styles.titleValue, marginRight: 5 }}>{item.SellPrice}</Text>
            <Text style={styles.titleScale}>{enums.priceTypesToLiteral(item.PriceType)}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.subtitleFieldContainer}>
        <MaterialCommunityIcons name='altimeter' size={16} color={rxGlobal.globalColors.listItemSubtitleIcon} />
        {item.Weight ? (
          <View style={styles.subtitleFieldContainer}>
            <Text style={{ ...styles.titleValue, marginRight: 5 }}>{item.Weight}</Text>
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
    let data = item.productGroupTitles?.concat(item.productTitle).reverse();
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
          renderItem={({ item, index }) => (
            <Text style={index === 0 ? rxGlobal.globalStyles.breadCrumpLevel2 : rxGlobal.globalStyles.breadCrumpLevel1}>{item}</Text>
          )}
        />
      </View>
    );
  };

  const renderItemHeader = (item, i) => {
    console.log(`🏁 [VisitPlanResultsFrom.renderItemHeader]`);
    console.log(`💬 [VisitPlanResultsFrom.renderItemHeader] item => ${JSON.stringify(item)}`);
    return (
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
  };

  const renderEmptyList = () => (
    <View style={{ ...rxGlobal.globalStyles.emptyList, marginLeft: 20, marginTop: 10 }}>
      <Text style={{ color: rxGlobal.globalColors.listItemSubtitleText }}>{rxGlobal.globalLiterals.messages.emptyList}</Text>
    </View>
  );

  return (
    <Container>
      <Content>
        <ScrollView style={{ padding: 20 }} keyboardShouldPersistTaps='handled'>
          {/* <Modal visible={isProductModalVisible} animationType='slide'>
            <VisitPlanResultProductForm onSubmit={onProductModalSubmit} onCancel={() => setIsProductModalVisible(false)} initialItem={productModalItem} />
          </Modal> */}
          <View style={{ flexDirection: "row-reverse", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
            <Entypo name='shop' size={26} color={rxGlobal.globalColors.screenTitleText} />
            <Text style={[rxGlobal.globalStyles.screenTitleText, { marginRight: 10 }]}>{visitPlanResultContext.value?.visitPlanCustomer?.Title}</Text>
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
          {console.log(`💬 [VisitPlanResultFrom.render] context value: ${JSON.stringify(visitPlanResultContext.value)}`)}
          {isLoading ? (
            <Spinner style={{ height: "100%" }} color='grey' size={50} />
          ) : visitPlanResultContext.value?.visitPlanResults?.length ? (
            visitPlanResultContext.value?.visitPlanResults.filter((r) => r.rxSync !== enums.syncStatuses.deleted).map((item, i) => renderItemHeader(item, i))
          ) : (
            renderEmptyList()
          )}
          <Formik
            initialValues={visitPlanResultContext.value?.visitPlanCustomer}
            onSubmit={async (values, actions) => {
              if (
                !global.dynamicSetting?.allowedDistanceForVisitor ||
                !visitPlanResultContext.value?.visitPlanCustomer.Lat ||
                !visitPlanResultContext.value?.visitPlanCustomer.Long ||
                (await isGeoLocationAcceptable(visitPlanResultContext.value?.visitPlanCustomer.Lat, visitPlanResultContext.value?.visitPlanCustomer.Long))
              ) {
                actions.resetForm();
                let clone = {...visitPlanResultContext.value};
                
                clone.visitPlanCustomer.LastModifiedDate = Moment(new Date()).format("YYYY/MM/DD HH:mm:ss");
                clone.visitPlanCustomer.ResultVisitedDate = Moment(new Date()).format("YYYY/MM/DD HH:mm:ss");
                clone.visitPlanCustomer.ResultStatus = values.ResultStatus ?? enums.resultStatuses.NotVisited;
                clone.visitPlanCustomer.SyncStatus = enums.syncStatuses.modified;
                visitPlanResultContext.setValue(clone);

                console.log(`💬 [Formik.onSubmit] Submitting context value => \n${JSON.stringify(visitPlanResultContext.value)}`);
                navigation.navigate("VisitPlanCustomers", { todo : enums.componentActions.saveContext });
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
                    value={props.values?.ResultSummary}
                  />
                </View>
                <View style={{ marginTop: 30 }}>
                  <Text style={rxGlobal.globalStyles.addModalFieldTitle}>وضعیت پویش</Text>
                  <View
                    style={[
                      rxGlobal.globalStyles.addModalFieldInput,
                      rxGlobal.globalStyles.addModalFieldRadioButtonGroupContainer,
                      rxGlobal.globalStyles.listItemHeaderContainer,
                    ]}>
                    {/* <RadioButton.Group onValueChange={(value) => console.log(JSON.stringify(props))} value={props.values?.ResultStatus}> */}
                    <RadioButton.Group onValueChange={(value) => props.setFieldValue("ResultStatus", value)} value={props.values?.ResultStatus}>
                      <View style={rxGlobal.globalStyles.radioItemContainer}>
                        <RadioButton uncheckedColor='#02c39a' color='#02c39a' value={enums.resultStatuses.Success} />
                        <Text style={{ color: "#02c39a" }}>پویش موفق</Text>
                      </View>
                      <View style={rxGlobal.globalStyles.radioItemContainer}>
                        <RadioButton uncheckedColor='#f94144' color='#f94144' value={enums.resultStatuses.NoCooperation} />
                        <Text style={{ color: "#f94144" }}>عدم همکاری</Text>
                      </View>
                      <View style={rxGlobal.globalStyles.radioItemContainer}>
                        <RadioButton uncheckedColor='#0077b6' color='#0077b6' value={enums.resultStatuses.ChangeStatus} />
                        <Text style={{ color: "#0077b6" }}>تغییر کاربری</Text>
                      </View>
                      <View style={rxGlobal.globalStyles.radioItemContainer}>
                        <RadioButton uncheckedColor='#0077b6' color='#0077b6' value={enums.resultStatuses.NotExists} />
                        <Text style={{ color: "#0077b6" }}>یافت نشد</Text>
                      </View>
                      <View style={rxGlobal.globalStyles.radioItemContainer}>
                        <RadioButton uncheckedColor='#0077b6' color='#0077b6' value={enums.resultStatuses.NotVisited} />
                        <Text style={{ color: "#0077b6" }}>پویش نشده</Text>
                      </View>
                    </RadioButton.Group>
                  </View>
                </View>

                <View style={{ marginTop: 60, flexDirection: "row-reverse", justifyContent: "space-around" }}>
                  <TouchableOpacity
                    style={{ ...rxGlobal.globalStyles.buttonGroupButton, backgroundColor: rxGlobal.globalColors.btnAdd }}
                    onPress={props.handleSubmit}>
                    <Text style={{ color: "white" }}>{rxGlobal.globalLiterals.buttonTexts.ok}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ ...rxGlobal.globalStyles.buttonGroupButton, backgroundColor: rxGlobal.globalColors.btnCancel }}
                    onPress={()=>navigation.navigate('VisitPlanCustomers')}>
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

  subtitleFieldContainer: { flexDirection: "row-reverse", alignItems: "center" },
  titleValue: { fontSize: 18, color: rxGlobal.globalColors.listItemTitleText, fontWeight: "bold", marginLeft: 5 },
  titleScale: { fontSize: 12 },
});
