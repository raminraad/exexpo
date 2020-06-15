import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList, TextInput, ScrollView, Modal, Alert, RecyclerViewBackedScrollView } from "react-native";
import { Separator, Content, Container, Spinner } from "native-base";
import { Overlay, ListItem, PricingCard, Button } from "react-native-elements";
import { Formik } from "formik";
import { RadioButton, Text, Divider } from "react-native-paper";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { globalStyles, globalColors, globalSizes, globalLiterals } from "../lib/rxGlobal";
import { Icon, SearchBar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import VisitPlanResultProductForm from "./VisitPlanResultProductForm";
import { openDatabase } from "expo-sqlite";
import * as Location from "expo-location";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import { getDistance, getPreciseDistance } from "geolib";
import Moment from "moment";
import * as enums from "../lib/enums";

export default function VisitPlanResultForm(props) {
  const db = openDatabase("db");
  let navigation = props.navigation;
  let initialItem = props.route.params.initialItem;
  const [visitResultStatus, setVisitResultStatus] = useState(initialItem?.ResultStatus ?? null);
  const [rawData, setRawData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productModalItem, setProductModalItem] = useState(null);

  const { title } = props.route.params;
  
  const isGeoLocationAcceptable = async (lat, long) => {
    console.log("SUBMITTING");
    let { status } = await Location.requestPermissionsAsync();
    console.log(status);
    if (status !== "granted") {
      Alert.alert(
        "",
        globalLiterals.validationErrors.locationPermissionDenied,
        [
          {
            text: globalLiterals.buttonTexts.ok,
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

      if (userLocation && distance <= global.dynamicSetting.AcceptableDistanceForVisitor) return true;
      else {
        Alert.alert(
          "",
          globalLiterals.validationErrors.notInGeoRange,
          [
            {
              text: globalLiterals.buttonTexts.ok,
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
      globalLiterals.Confirmations.deleteProduct,
      [
        {
          text: globalLiterals.buttonTexts.yes,
          onPress: () => onListItemDelete(item),
        },
        {
          text: globalLiterals.buttonTexts.no,
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
    <View style={styles.listItemSubtitleContainer}>
      <View style={styles.listItemSubtitleItem}>
        <FontAwesome name='money' size={globalSizes.icons.small} color={globalColors.listItemSubtitleIcon} />
        <Text style={styles.listItemSubtitleText}>{item.SellPrice} ريال</Text>
      </View>
      <View style={styles.listItemSubtitleItem}>
        <FontAwesome5 name='weight-hanging' size={globalSizes.icons.small} color={globalColors.listItemSubtitleIcon} />
        <Text style={styles.listItemSubtitleText}>{item.Weight} گرم</Text>
      </View>
      <View style={styles.listItemSubtitleItem}>
        <FontAwesome5 name='eye' size={globalSizes.icons.small} color={globalColors.listItemSubtitleIcon} />
        <Text style={styles.listItemSubtitleText}>{item.ShelfVisibleCount}</Text>
      </View>
    </View>
  );
  const swipeLeftAction = (item) => (
    <View style={globalStyles.listItemSwipeLeftContainer}>
      <FontAwesome5 name='trash-alt' onPress={() => confirmAndDelete(item)} size={globalSizes.icons.medium} color={globalColors.btnDelete} />
      <Separator style={{ backgroundColor: globalColors.transparent }} />
      <FontAwesome5
        name='edit'
        onPress={() => {
          setProductModalItem(item);
          setIsProductModalVisible(true);
        }}
        size={globalSizes.icons.medium}
        color={globalColors.btnUpdate}
      />
    </View>
  );

  const [isProductModalVisible, setIsProductModalVisible] = useState(false);

  const renderItemHeader = (item, i) => (
    <Swipeable renderLeftActions={() => swipeLeftAction(item)} key={item.rxKey}>
      {/* fixme: fix productGroup multi layering */}
      <ListItem
        containerStyle={[globalStyles.shadowedContainer, globalStyles.listItemHeaderContainer]}
        Component={TouchableScale}
        key={item.rxKey}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        linearGradientProps={globalColors.gradients.listItem}
        title={`${item.Title}  ⟸  ${item.Taste}`}
        titleStyle={globalStyles.listItemTitle}
        subtitle={() => renderSubtitle(item)}
      />
    </Swipeable>
  );

  const renderEmptyList = () => (
    <View style={{ ...globalStyles.emptyList, marginLeft: 20, marginTop: 10 }}>
      <Text style={{ color: globalColors.listItemSubtitleText }}>{globalLiterals.messages.emptyList}</Text>
    </View>
  );

  return (
    <Container>
      <Content>
        
        <ScrollView style={{ padding: 25 }} keyboardShouldPersistTaps='never'>
          <View>
            <Modal visible={isProductModalVisible} animationType='slide'>
              <VisitPlanResultProductForm onSubmit={onProductModalSubmit} onCancel={() => setIsProductModalVisible(false)} initialItem={productModalItem} />
            </Modal>
              <View style={{...globalStyles.screenTitleContainer,marginBottom:32}}>
                <Text style={globalStyles.screenTitleText}>فرم پویش مربوط به {title}</Text>
              </View>

            <View style={{ flexDirection: "row-reverse", justifyContent: "space-between" }}>
              <Text style={globalStyles.addModalFieldTitle}>محصولات فروشگاه</Text>
              <View style={globalStyles.shadowedContainer}>
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
                  افزودن محصول
                </FontAwesome5.Button>
              </View>
            </View>
            {isLoading ? (
              <Spinner style={{ height: "100%" }} color='grey' size={50} />
            ) : rawData.length ? (
              rawData.filter((r) => r.rxSync !== enums.syncStatuses.deleted).map((item, i) => renderItemHeader(item, i))
            ) : (
              renderEmptyList()
            )}
            <Formik
              initialValues={initialItem}
              onSubmit={async (values, actions) => {
                if (
                  !global.dynamicSetting.AcceptableDistanceForVisitor ||
                  !initialItem.Lat ||
                  !initialItem.Long ||
                  (await isGeoLocationAcceptable(initialItem.Lat, initialItem.Long))
                ) {
                  console.log("submitting");
                  actions.resetForm();
                  values.details = rawData;
                  values.LastModifiedDate = Moment(new Date()).format("YYYY/MM/DD HH:mm:ss");
                  values.ResultVisitedDate = Moment(new Date()).format("YYYY/MM/DD HH:mm:ss");
                  values.SyncStatus = enums.syncStatuses.modified;
                  values.rxSync = enums.syncStatuses.modified;
                  navigation.navigate("VisitPlanCustomers", { yoyo: values });
                }
              }}>
              {(props) => (
                <View style={{ marginTop: 30, justifyContent: "space-between" }}>
                  <View style={globalStyles.addModalFieldContainer}>
                    <Text style={globalStyles.addModalFieldTitle}>شرح مختصر</Text>
                    <TextInput
                      style={[globalStyles.addModalFieldInput, { height: 100 }]}
                      textAlignVertical='top'
                      placeholder='توضیحات مختصر درباره گزارش پویش'
                      multiline
                      onChangeText={props.handleChange("ResultSummary")}
                      value={props.values.ResultSummary}
                    />
                  </View>
                  <View style={globalStyles.addModalFieldContainer}>
                    <Text style={globalStyles.addModalFieldTitle}>وضعیت</Text>
                    <View style={globalStyles.addModalFieldRadioButtonGroupContainer}>
                      <RadioButton.Group onValueChange={(value) => props.setFieldValue("ResultStatus", value)} value={props.values.ResultStatus}>
                        <View style={globalStyles.radioItemContainer}>
                          <Text>پویش نشده</Text>
                          {/* fixme : ask the enum value of 2} */}
                          <RadioButton value={2} />
                        </View>
                        <View style={globalStyles.radioItemContainer}>
                          <Text>عدم همکاری</Text>
                          <RadioButton value={3} />
                        </View>
                        <View style={globalStyles.radioItemContainer}>
                          <Text>پویش موفق</Text>
                          <RadioButton value={7} />
                        </View>
                        <View style={globalStyles.radioItemContainer}>
                          <Text>تغییر کاربری</Text>
                          <RadioButton value={11} />
                        </View>
                        <View style={globalStyles.radioItemContainer}>
                          <Text>یافت نشد</Text>
                          <RadioButton value={13} />
                        </View>
                      </RadioButton.Group>
                    </View>
                  </View>

                  <View style={{ marginVertical: 5, flexDirection: "row-reverse", justifyContent: "space-around" }}>
                    <TouchableOpacity style={{ ...globalStyles.buttonGroupButton, backgroundColor: globalColors.btnOk }} onPress={props.handleSubmit}>
                      <Text style={{ color: "white" }}>{globalLiterals.buttonTexts.ok}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...globalStyles.buttonGroupButton, backgroundColor: globalColors.btnCancel }} onPress={navigation.goBack}>
                      <Text style={{ color: "white" }}>{globalLiterals.buttonTexts.cancel}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
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
    color: globalColors.listItemSubtitleText,
    marginHorizontal: 3,
  },
});
