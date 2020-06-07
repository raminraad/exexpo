import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList, TextInput, ScrollView, Button, Modal, Alert } from "react-native";
import { Separator, Content, Container, Spinner } from "native-base";
import { Overlay, ListItem, PricingCard } from "react-native-elements";
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

export default function VisitPlanResultForm(props) {
  const db = openDatabase("db");
  let navigation = props.navigation;
  let initialItem = props.route.params.initialItem;
  const [productsRawData, setProductsRawData] = useState([]);
  const [visitResultStatus, setVisitResultStatus] = useState(initialItem?.ResultStatus ?? null);
  const [rawData, setRawData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productModalItem, setProductModalItem] = useState(null);

  const isGeoLocationAcceptable = async (lat, long) => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      return false;
    }

    let userLocation = await Location.getCurrentPositionAsync({});

    let p1 = { latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude };
    let p2 = { latitude: lat, longitude: long };
    console.log(p1);
    console.log(p2);
    let distance = await getPreciseDistance(p1, p2, 1);

    console.log(distance);

    return userLocation && distance <= global.AcceptableDistanceForVisitor;
  };

  const onProductModalSubmit = (item) => {
    let rawClone = [...rawData];
    if (item.rxSync === 0 || item.rxSync === 2) {
      item.rxSync = 2;
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
          text: globalLiterals.ButtonTexts.yes,
          onPress: () => onListItemDelete(item),
        },
        {
          text: globalLiterals.ButtonTexts.no,
        },
      ],
      { cancelable: true }
    );
  };

  const onListItemDelete = (item) => {
    let rawClone = [...rawData];
    let index = rawClone.findIndex((r) => r.rxKey === item.rxKey);
    if (item.rxSync === 0 || item.rxSync === 2) {
      item.rxSync = -1;
      rawClone[index] = item;
    } else {
      rawClone.splice(index, 1);
    }
    setRawData(rawClone);
  };

  useEffect(() => {
    let rawDataQuery = `select *,res.Id as Id, 0 as rxSync from VisitPlanResults res
     inner join ProductSub sub on res.ProductSubId = sub.Id
     inner join Product prd on prd.Id = sub.ProductId
     inner join ProductGroup grp on grp.Id =  prd.ProductGroupId
     where VisitPlanCustomerId = ${initialItem.Id}`;

    let productsRawDataQuery = `select *,sub.Id as ProductSubId from ProductSub sub 
     inner join Product prd on prd.Id = sub.ProductId
     inner join ProductGroup grp on grp.Id =  prd.ProductGroupId`;

    db.transaction((tx) => {
      tx.executeSql(
        rawDataQuery,
        [],
        (_, { rows: { _array } }) => {
          //todo: replace with sql side indexing
          for (let i = 0; i < _array.length; i++) _array[i].rxKey = i + 1;

          setRawData(_array);
          // console.log(`☺☺ RAW_DATA: ${rawDataQuery} => length: ${_array.length} => ${JSON.stringify([..._array])}`);
        },
        (transaction, error) => console.log(`☻☻ ${rawDataQuery} =>=> ${error}`)
      );
      tx.executeSql(
        productsRawDataQuery,
        [],
        (_, { rows: { _array } }) => {
          // console.log(`☺☺ PRODUCTS_RAW_DATA: ${productsRawDataQuery} => length: ${_array.length} => ${JSON.stringify([..._array])}`);
          //todo: replace with sql side indexing
          for (let i = 0; i < _array.length; i++) _array[i].rxKey = i + 1;

          setProductsRawData(_array);
        },
        (transaction, error) => console.log(`☻☻ ${productsRawDataQuery} =>=> ${error}`)
      );
    });

    setIsLoading(false);
    return () => setRawData([]);
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
      <Separator backgroundColor={globalColors.listItemSwipeLeftContainer} />
      <FontAwesome5
        name='edit'
        onPress={() => {
          setProductModalItem(item);
          setIsProductModalVisible(true);
        }}
        size={globalSizes.icons.medium}
        color={globalColors.btnUpdate}
      />
      <Separator backgroundColor={globalColors.listItemSwipeLeftContainer} />
    </View>
  );

  const [isProductModalVisible, setIsProductModalVisible] = useState(false);

  return (
    <View>
      <ScrollView style={{ padding: 25 }} keyboardShouldPersistTaps='never'>
        <View>
          <Modal visible={isProductModalVisible} animationType='slide'>
            <VisitPlanResultProductForm
              productsRawData={productsRawData}
              onSubmit={onProductModalSubmit}
              onCancel={() => setIsProductModalVisible(false)}
              initialItem={productModalItem}
            />
          </Modal>

          <View style={{ flexDirection: "row-reverse", justifyContent: "space-between" }}>
            <Text style={globalStyles.addModalFieldTitle}>محصولات فروشگاه</Text>
            <View style={globalStyles.shadowedContainer}>
              <FontAwesome5.Button
                name='plus'
                backgroundColor={globalColors.btnAdd}
                onPress={() => {
                  setProductModalItem({
                    rxSync: 1,
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
          ) : (
            rawData
              .filter((r) => r.rxSync !== -1)
              .map((item, index) => (
                <Swipeable renderLeftActions={() => swipeLeftAction(item)} key={index.toString()}>
                  {/* <ListItem
                  key={index.toString()}
                  containerStyle={{ backgroundColor: globalColors.listItemHeaderContainer, alignSelf: "stretch" }}
                  // fixme: fix productGroup multi layering
                  title={`${item.Title}  ⟸  ${item.Taste}`}
                  subtitle={`     قیمت فروش ${item.SellPrice}ريال      وزن محصول (گرم) ${item.Weight}      موجودی قابل مشاهده ${item.ShelfVisibleCount}`}
                  bottomDivider
                /> */}

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
                    leftElement={
                      <Entypo
                        name='chevron-thin-left'
                        size={globalSizes.icons.small}
                        color={globalColors.listItemTitleText}
                        onPress={() => {
                          onListItemNavigateForward(item);
                        }}
                      />
                    }
                  />
                </Swipeable>
              ))
          )}
          <Formik
            initialValues={initialItem}
            onSubmit={async (values, actions) => {
              if (!global.AcceptableDistanceForVisitor || (await isGeoLocationAcceptable(initialItem.Lat, initialItem.Long))) {
                console.log("submitting");
                actions.resetForm();
                values.details = rawData;
                values.LastModifiedDate = Moment(new Date()).format("YYYY/MM/DD HH:mm:ss");
                values.ResultVisitedDate = Moment(new Date()).format("YYYY/MM/DD HH:mm:ss");
                values.SyncStatus = 2;
                values.rxSync = 2;
                navigation.navigate("VisitPlanCustomers", { yoyo: values });
              } else {
                //fixme: replace alert with a nice one
                alert(globalLiterals.validationErrors.notInGeoRange);
              }
            }}>
            {(props) => (
              <View>
                <View style={globalStyles.addModalFieldContainer}>
                  <Text style={globalStyles.addModalFieldTitle}>شرح مختصر</Text>
                  <TextInput
                    style={[globalStyles.addModalFieldInput, { height: 100 }]}
                    textAlignVertical='top'
                    placeholder='توضیحات مختصر درباره گزارش پویش'
                    multiline
                    onChangeText={props.handleChange("ResultSummary")}
                    value={props.values?.ResultSummary}
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

                <Button title='تأیید' color={globalColors.btnAdd} onPress={props.handleSubmit} />
                <View style={{ marginVertical: 5 }} />
                <Button title='انصراف' color={globalColors.btnCancel} onPress={navigation.goBack} />
                <View style={{ marginVertical: 20 }} />
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
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
    alignItems:'center',
  },
  listItemSubtitleText: {
    color: globalColors.listItemSubtitleText,
    marginHorizontal:3
  },
});
