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
  let item = props.route.params.item;
  let onSubmit = props.route.params.onSubmit;
  let onCancel = props.route.params.onCancel;
  const [productsRawData, setProductsRawData] = useState([]);
  const [visitResultStatus, setVisitResultStatus] = useState(item && item.ResultStatus ? item.ResultStatus : null);
  const [rawData, setRawData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
const addVisitPlanResult = (item)=>{
  setRawData([...rawData,item]);
  setProductModalIsVisible(false);
}
  useEffect(() => {
    let rawDataQuery = `select * from VisitPlanResults res
     inner join ProductSub sub on res.ProductSubId = sub.Id
     inner join Product prd on prd.Id = sub.ProductId
     inner join ProductGroup grp on grp.Id =  prd.ProductGroupId
     where VisitPlanCustomerId = ${props.route.params.item.Id}`;
    let productsRawDataQuery = `select *,sub.Id as ProductSubId from ProductSub sub 
     inner join Product prd on prd.Id = sub.ProductId
     inner join ProductGroup grp on grp.Id =  prd.ProductGroupId`;
    db.transaction((tx) => {
      tx.executeSql(
        rawDataQuery,
        [],
        (_, { rows: { _array } }) => {
          setRawData(_array);
        },
        (transaction, error) => console.log(`☻☻ ${rawDataQuery} =>=> ${error}`)
      );
      tx.executeSql(
        productsRawDataQuery,
        [],
        (_, { rows: { _array } }) => {
          console.log(`☺☺ ${productsRawDataQuery} => length: ${_array.length} => ${JSON.stringify([..._array])}`);
          setProductsRawData(_array);
        },
        (transaction, error) => console.log(`☻☻ ${productsRawDataQuery} =>=> ${error}`)
      );
    });

    setIsLoading(false);
    return () => setRawData([]);
  }, []);

  const swipeLeftAction = () => (
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
        onPress={() => console.warn("edit")}
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
            initialValues={{
              ResultSummary: `${item?.ResultSummary ? item.ResultSummary : ""}`,
              ResultStatus: `${item?.ResultStatus ? item.ResultStatus : ""}`,
            }}
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
                    value={props.values.ResultSummary}
                  />
                </View>

                <View style={globalStyles.addModalFieldContainer}>
                  <Text style={globalStyles.addModalFieldTitle}>وضعیت</Text>
                  <View style={globalStyles.addModalFieldRadioButtonGroupContainer}>
                    <RadioButton.Group onValueChange={(value) => setVisitResultStatus(value)} value={visitResultStatus}>
                      <View style={globalStyles.radioItemContainer}>
                        <Text>پویش نشده</Text>
                        <RadioButton value='0' />
                      </View>
                      <View style={globalStyles.radioItemContainer}>
                        <Text>عدم همکاری</Text>
                        <RadioButton value='3' />
                      </View>
                      <View style={globalStyles.radioItemContainer}>
                        <Text>پویش موفق</Text>
                        <RadioButton value='7' />
                      </View>
                      <View style={globalStyles.radioItemContainer}>
                        <Text>تغییر کاربری</Text>
                        <RadioButton value='11' />
                      </View>
                      <View style={globalStyles.radioItemContainer}>
                        <Text>یافت نشد</Text>
                        <RadioButton value='13' />
                      </View>
                    </RadioButton.Group>
                  </View>
                </View>
                
                <Modal visible={productModalIsVisible} animationType='slide'>
                  <VisitPlanResultProductForm productsRawData={productsRawData} onSubmit={addVisitPlanResult} onCancel={() => setProductModalIsVisible(false)} />
                </Modal>
              
                
                <View style={{ flexDirection: "row-reverse", justifyContent: "space-between"}}>
                  <Text style={globalStyles.addModalFieldTitle}>محصولات فروشگاه</Text>
                  <View style={globalStyles.shadowedContainer}>
                    <FontAwesome5.Button
                      name='plus'
                      backgroundColor={globalColors.btnAdd}
                      onPress={() => {
                        setProductModalIsVisible(true);
                        console.log(productModalIsVisible);
                      }}>
                      افزودن محصول
                    </FontAwesome5.Button>
                  </View>
                </View>
                
                {isLoading ? (
                  <Spinner style={{ height: "100%" }} color='grey' size={50} />
                ) : (
                  rawData.map((item, index) => (
                    <Swipeable renderLeftActions={swipeLeftAction} key={index.toString()}>
                      <ListItem
                        key={index.toString()}
                        containerStyle={{ backgroundColor: globalColors.listItemHeaderContainer, alignSelf: "stretch" }}
                        // fixme: fix productGroup multi layering
                        title={`${item.Title}  ⟸  ${item.Taste}  ⟸  ${item.Weight} گرمی`}
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
