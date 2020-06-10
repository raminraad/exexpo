import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList, TextInput, Button, ScrollView, KeyboardAvoidingView, Keyboard, Alert } from "react-native";
import { Formik, ErrorMessage } from "formik";
import { RadioButton, Text, Divider } from "react-native-paper";
import { Separator, Content, Container, Spinner } from "native-base";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { globalStyles, globalColors, globalSizes, globalLiterals } from "../lib/rxGlobal";
import { Icon, PricingCard, SearchBar, ListItem } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import * as yup from "yup";
import Moment from "moment";
import { openDatabase } from "expo-sqlite";

const visitPlanResultProductSchema = yup.object().shape({
  ProductSubId: yup.string(globalLiterals.validationErrors.required).required("انتخاب کالا الزامیست"),
  SellPrice: yup.string(globalLiterals.validationErrors.required).required(globalLiterals.validationErrors.required),
  Weight: yup.number().required(globalLiterals.validationErrors.required),
  ShelfVisibleCount: yup.number().required(globalLiterals.validationErrors.required),
});

export default function VisitPlanResultProductForm(props) {
  const db = openDatabase("db");

  let initialItem = props.initialItem;
  let onCancel = props.onCancel;
  let onSubmit = props.onSubmit;
  const [isOnProductSearch, setisOnProductSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(initialItem);
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
  const productsRawData = useRef([]);

  useEffect(() => {
    (async () => {
      await loadProducts();
    })();
  }, []);

  const loadProducts = async () => {
    setIsProductLoading(true);

    let productsRawDataQuery = `select *,sub.Id as ProductSubId from ProductSub sub 
     inner join Product prd on prd.Id = sub.ProductId
     inner join ProductGroup grp on grp.Id =  prd.ProductGroupId`;

    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          productsRawDataQuery,
          [],
          (_, { rows: { _array } }) => {
            // console.log(`👍 PRODUCTS_RAW_DATA: ${productsRawDataQuery} => length: ${_array.length} => ${JSON.stringify([..._array])}`);
            //todo: replace with sql side indexing
            for (let i = 0; i < _array.length; i++) _array[i].rxKey = i + 1;
            productsRawData.current = _array;
            resolve();
          },
          (transaction, error) => {
            console.log(`❌ ${productsRawDataQuery} => ${error}`);
            reject();
          }
        );
      });
    }).finally(() => {
      setIsProductLoading(false);
    });
  };
  const confirmAndPullProducts = () => {
    Alert.alert(
      "",
      globalLiterals.Confirmations.reloadProducts,
      [
        {
          text: globalLiterals.buttonTexts.yes,
          onPress: pullProducts
        },
        {
          text: globalLiterals.buttonTexts.no,
        },
      ],
      { cancelable: true }
    );
  };

  const pullProducts=async ()=>{

    setIsProductLoading(true);
//fixme: implement real pullProducts
    setTimeout(() => {
      setIsProductLoading(false);
    }, 5000);

  }

  return (
    <Formik
      initialValues={selectedItem}
      validationSchema={visitPlanResultProductSchema}
      onSubmit={(values, actions) => {
        actions.resetForm();
        values.LastModifiedDate = Moment(new Date()).format("YYYY/MM/DD HH:mm:ss");
        onSubmit(values);
      }}>
      {(props) => (
        <View style={{ ...globalStyles.container, padding: 40 }}>
          <ScrollView style={isSearchBarFocused ? styles.productListOnSearching : styles.productListOnNotSearching} keyboardShouldPersistTaps='never'>
            {isOnProductSearch || !selectedItem?.ProductSubId ? (
              <View>
                <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                  <TouchableOpacity
                    style={{
                      width: 48,
                      backgroundColor: globalColors.btnReload,
                      aspectRatio: 1 / 1,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                    }}
                    onPress={loadProducts}
                    onLongPress={confirmAndPullProducts}>
                    {isProductLoading ? <Spinner color='white' /> : <Feather name='refresh-ccw' size={24} color='white' />}
                  </TouchableOpacity>
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <SearchBar
                      onFocus={() => setIsSearchBarFocused(true)}
                      onBlur={() => setIsSearchBarFocused(false)}
                      cancelIcon={<FontAwesome5 name='arrow-left' size={24} color={globalColors.searchBarIcon} />}
                      platform='default'
                      lightTheme
                      placeholder='جستجوی محصول...'
                      onChangeText={(val) => {
                        setSearchText(val);
                      }}
                      value={searchText}
                    />
                    {productsRawData.current
                  .filter((item) => {
                    let trimmedSearchText = searchText.trim();
                    if (!trimmedSearchText) return false;
                    else return item.Title.includes(searchText) || item.Taste.includes(searchText);
                  })
                  .map((item, i) => (
                    <ListItem
                      containerStyle={{ backgroundColor: globalColors.listItemHeaderContainer ,marginVertical:1}}
                      key={item.ProductSubId.toString()}
                      title={`${item.Title}  ⟸  ${item.Taste}`}
                      bottomDivider
                      onPress={() => {
                        setSelectedItem(item);
                        props.values.ProductSubId = item.ProductSubId;
                        props.values.Title = item.Title;
                        props.values.Taste = item.Taste;
                        Keyboard.dismiss();
                        setIsSearchBarFocused(false);
                        setisOnProductSearch(false);
                      }}
                    />
                  ))}
                  </View>
                </View>
                

                <Text style={globalStyles.addModalFieldValidationError}>{props.touched.ProductSubId && props.errors.ProductSubId}</Text>
              </View>
            ) : (
              <PricingCard
                containerStyle={{ alignSelf: "stretch", marginHorizontal: 50 }}
                color='#feb019'
                title={`${selectedItem.Title} ⟸ ${selectedItem.Taste}`}
                price={`${selectedItem.PriceValue} ريال`}
                pricingStyle={{ fontSize: 18 }}
                info={[`کد گروه ${selectedItem.ProductGroupCode}`, `کد کالا ${selectedItem.ProductCode}`]}
                button={{ title: "تغییر", icon: "edit" }}
                onButtonPress={() => setisOnProductSearch(true)}
              />
            )}
          </ScrollView>

          <View style={globalStyles.addModalFieldContainer}>
            <Text style={{ ...globalStyles.addModalFieldTitle, flex: 0 }}>قیمت فروش</Text>
            <TextInput
              maxLength={8}
              style={globalStyles.addModalFieldInput}
              placeholder='قیمت فروش محصول'
              keyboardType='number-pad'
              onChangeText={props.handleChange("SellPrice")}
              value={props.values?.SellPrice?.toString()}
              onBlur={props.handleBlur("SellPrice")}
            />
            <Text style={globalStyles.addModalFieldValidationError}>{props.touched.SellPrice && props.errors.SellPrice}</Text>
          </View>
          <View style={globalStyles.addModalFieldContainer}>
            <Text style={{ ...globalStyles.addModalFieldTitle, flex: 0 }}>وزن (گرم) </Text>
            <TextInput
              maxLength={8}
              style={globalStyles.addModalFieldInput}
              placeholder='وزن محصول (گرم) '
              keyboardType='number-pad'
              onChangeText={props.handleChange("Weight")}
              value={props.values?.Weight?.toString()}
              onBlur={props.handleBlur("Weight")}
            />
            <Text style={globalStyles.addModalFieldValidationError}>{props.touched.Weight && props.errors.Weight}</Text>
          </View>
          <View style={globalStyles.addModalFieldContainer}>
            <Text style={{ ...globalStyles.addModalFieldTitle, flex: 0 }}>موجودی قابل مشاهده</Text>
            <TextInput
              maxLength={8}
              style={globalStyles.addModalFieldInput}
              placeholder='موجودی قابل مشاهده'
              keyboardType='number-pad'
              onChangeText={props.handleChange("ShelfVisibleCount")}
              value={props.values?.ShelfVisibleCount?.toString()}
              onBlur={props.handleBlur("ShelfVisibleCount")}
            />
            <Text style={globalStyles.addModalFieldValidationError}>{props.touched.ShelfVisibleCount && props.errors.ShelfVisibleCount}</Text>
          </View>
          <View style={{ marginVertical: 5, flexDirection: "row-reverse", justifyContent: "space-around" }}>
            <TouchableOpacity style={{ ...globalStyles.buttonGroupButton, backgroundColor: globalColors.btnOk }} onPress={props.handleSubmit}>
              <Text style={{ color: "white" }}>{globalLiterals.buttonTexts.ok}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...globalStyles.buttonGroupButton, backgroundColor: globalColors.btnCancel }} onPress={onCancel}>
              <Text style={{ color: "white" }}>{globalLiterals.buttonTexts.cancel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  productListOnSearching: { minHeight: "70%", marginBottom: 50 },
  productListOnNotSearching: { maxHeight: "40%", marginBottom: 50 },
});
