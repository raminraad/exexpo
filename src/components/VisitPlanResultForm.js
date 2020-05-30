import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList, TextInput, ScrollView, Button, Modal } from "react-native";
import { Separator, Content, Container, Spinner } from "native-base";
import { Overlay, ListItem, PricingCard } from "react-native-elements";
import { Formik } from "formik";
import { RadioButton, Text, Divider } from "react-native-paper";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { globalStyles, globalColors, globalSizes } from "../styles/global";
import { Icon, SearchBar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import VisitPlanResultProductForm from "./VisitPlanResultProductForm";
import { openDatabase } from "expo-sqlite";

export default function VisitPlanResultForm(props) {
  const db = openDatabase("db");
  let navigation = props.navigation;
  let initialItem = props.route.params.initialItem;
  let onSubmit = props.route.params.onSubmit;
  let onCancel = props.route.params.onCancel;
  const [productsRawData, setProductsRawData] = useState([]);
  const [visitResultStatus, setVisitResultStatus] = useState(initialItem?.ResultStatus ?? null);
  const [rawData, setRawData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productModalItem, setProductModalItem] = useState(null);

  const onProductModalSubmit = (item) => {
    //fixme implement add edit
    
    let rawClone = [...rawData];
    if (item.VisitPlanResultId) 
    {
      item.rxSync=1;
      rawClone.find(r=>r.VisitPlanResultId===item.VisitPlanResultId)[0]=item;
    }
    else console.log("insert");
    {
      item.rxSync=2;
      rawClone.push(item);
    }
    setRawData(rawClone);
    console.log(rawData);
    setProductModalIsVisible(false);
  };

  useEffect(() => {
    let rawDataQuery = `select *,res.Id as VisitPlanResultId from VisitPlanResults res
     inner join ProductSub sub on res.ProductSubId = sub.Id
     inner join Product prd on prd.Id = sub.ProductId
     inner join ProductGroup grp on grp.Id =  prd.ProductGroupId
     where VisitPlanCustomerId = ${initialItem.Id}`;

    let productsRawDataQuery = `select *,sub.Id as ProductSubId from ProductSub sub 
     inner join Product prd on prd.Id = sub.ProductId
     inner join ProductGroup grp on grp.Id =  prd.ProductGroupId`;
console.log("###########################################");
console.log(initialItem);

    db.transaction((tx) => {
      tx.executeSql(
        rawDataQuery,
        [],
        (_, { rows: { _array } }) => {
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
          setProductsRawData(_array);
        },
        (transaction, error) => console.log(`☻☻ ${productsRawDataQuery} =>=> ${error}`)
      );
    });

    setIsLoading(false);
    return () => setRawData([]);
  }, []);

  const swipeLeftAction = (item) => (
    <View style={globalStyles.listItemSwipeLeftContainer}>
      <FontAwesome5
        name='trash-alt'
        // todo: implement update functionality
        onPress={() => console.warn("delete")}
        size={globalSizes.icons.medium}
        color={globalColors.btnDelete}
      />
      <Separator backgroundColor={globalColors.listItemSwipeLeftContainer} />
      <FontAwesome5
        name='edit'
        // todo: implement update functionality
        onPress={() => {
          setProductModalItem(item);
          setProductModalIsVisible(true);
        }}
        size={globalSizes.icons.medium}
        color={globalColors.btnUpdate}
      />
      <Separator backgroundColor={globalColors.listItemSwipeLeftContainer} />
    </View>
  );

  const [productModalIsVisible, setProductModalIsVisible] = useState(false);

  return (
    <View>
      <ScrollView style={{ padding: 25 }} keyboardShouldPersistTaps='never'>
        <View>
          <Formik
            initialValues={initialItem}
            onSubmit={(values, actions) => {
              values.ResultStatus = visitResultStatus;
              actions.resetForm();
              onSubmit(values);
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
                    <RadioButton.Group onValueChange={(value) => props.setFieldValue('ResultStatus',value)} value={props.values.ResultStatus}>
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

                <Modal visible={productModalIsVisible} animationType='slide'>
                  <VisitPlanResultProductForm
                    productsRawData={productsRawData}
                    onSubmit={onProductModalSubmit}
                    onCancel={() => setProductModalIsVisible(false)}
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
                        setProductModalItem({});
                        setProductModalIsVisible(true);
                      }}>
                      افزودن محصول
                    </FontAwesome5.Button>
                  </View>
                </View>
                {isLoading ? (
                  <Spinner style={{ height: "100%" }} color='grey' size={50} />
                ) : (
                  rawData.map((item, index) => (
                    <Swipeable renderLeftActions={() => swipeLeftAction(item)} key={index.toString()}>
                      <ListItem
                        key={index.toString()}
                        containerStyle={{ backgroundColor: globalColors.listItemHeaderContainer, alignSelf: "stretch" }}
                        // fixme: fix productGroup multi layering
                        title={`${item.Title}  ⟸  ${item.Taste}`}
                        subtitle={`     قیمت فروش ${item.SellPrice}ريال      وزن محصول (گرم) ${item.Weight}      موجودی قابل مشاهده ${item.ShelfVisibleCount}`}
                        // todo: place other properties in subtitle
                        bottomDivider
                      />
                    </Swipeable>
                  ))
                )}

                <Button title='تأیید' color={globalColors.btnAdd} onPress={onSubmit} />
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
