import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList, TextInput, Button, ScrollView, KeyboardAvoidingView, Keyboard } from "react-native";
import { Formik } from "formik";
import { RadioButton, Text, Divider } from "react-native-paper";
import { Separator, Content, Container } from "native-base";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { globalStyles, globalColors, globalSizes } from "../styles/global";
import { Icon, PricingCard, SearchBar, ListItem } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function VisitPlanResultProductForm(props) {
  let initialItem = props.initialItem;
let onCancel=props.onCancel;
let onSubmit=props.onSubmit;
  const [isOnProductSearch, setisOnProductSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [presentationData, setPresentationData] = useState(props.productsRawData);
  const [selectedItem, setSelectedItem] = useState(initialItem);
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);

  useEffect(() => {
    // setSelectedItem(props.initialItem);
    // setPresentationData(props.productsRawData);
    // console.log(JSON.stringify(props.productsRawData));
    console.log(initialItem);
  }, []);

  useEffect(() => {
    setPresentationData(
      props.productsRawData.filter((item) => {
        let trimmedSearchText = searchText.trim();
        if (!trimmedSearchText) return false;
        else return item.Title.includes(searchText) || item.Taste.includes(searchText);
      })
    );
  }, [searchText]);

  return (
    <Formik
      initialValues={selectedItem}
      onSubmit={(values, actions) => {

        values.ProductSubId = selectedItem.ProductSubId;
        values.Title = selectedItem.Title;
        values.Taste = selectedItem.Taste;
        
        actions.resetForm();
        onSubmit(values); 
        console.log(values);
      }}>
      {(props) => (
        <View style={globalStyles.container}>
          <ScrollView style={isSearchBarFocused ? styles.productListOnSearching : styles.productListOnNotSearching} keyboardShouldPersistTaps='never'>
            {isOnProductSearch || !selectedItem?.ProductSubId ? (
              <View style={{ borderWidth: 0.5, marginVertical: 15, borderRadius: 2 }}>
                <SearchBar
                  onFocus={() => setIsSearchBarFocused(true)}
                  onBlur={() => setIsSearchBarFocused(false)}
                  cancelIcon={<FontAwesome5 name='arrow-left' size={24} color={globalColors.searchBarIcon} />}
                  platform='android'
                  lightTheme
                  placeholder='جستجوی محصول...'
                  onChangeText={(val) => {
                    setSearchText(val);
                  }}
                  value={searchText}
                />
                {presentationData.map((item, i) => (
                  <ListItem
                    containerStyle={{ backgroundColor: globalColors.listItemHeaderContainer }}
                    key={item.ProductSubId.toString()}
                    title={`${item.Title}  ⟸  ${item.Taste}`}
                    bottomDivider
                    leftElement={
                      <Button
                        title='انتخاب'
                        onPress={() => {
                          console.log(selectedItem);
                          setSelectedItem(item);
                          Keyboard.dismiss();
                          setIsSearchBarFocused(false);
                          setisOnProductSearch(false);
                        }}></Button>
                    }
                  />
                ))}
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
              style={globalStyles.addModalFieldInput}
              placeholder='قیمت فروش محصول'
              keyboardType='number-pad'
              onChangeText={props.handleChange("SellPrice")}
              value={props.values?.SellPrice?.toString()}
            />
          </View>
          <View style={globalStyles.addModalFieldContainer}>
            <Text style={{ ...globalStyles.addModalFieldTitle, flex: 0 }}>وزن (گرم) </Text>
            <TextInput
              style={globalStyles.addModalFieldInput}
              placeholder='وزن محصول (گرم) '
              keyboardType='number-pad'
              onChangeText={props.handleChange("Weight")}
              value={props.values?.Weight?.toString()}
            />
          </View>
          <View style={globalStyles.addModalFieldContainer}>
            <Text style={{ ...globalStyles.addModalFieldTitle, flex: 0 }}>موجودی قابل مشاهده</Text>
            <TextInput
              style={globalStyles.addModalFieldInput}
              placeholder='موجودی قابل مشاهده'
              keyboardType='number-pad'
              onChangeText={props.handleChange("ShelfVisibleCount")}
              value={props.values?.ShelfVisibleCount?.toString()}
            />
          </View>
          <Button title='تأیید' color={globalColors.btnAdd} onPress={props.handleSubmit} />
          <View style={{ marginVertical: 5 }} />
          <Button title='انصراف' color={globalColors.btnCancel} onPress={onCancel} />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  productListOnSearching: { minHeight: "70%", marginBottom: 50 },
  productListOnNotSearching: { maxHeight: "40%", marginBottom: 50 },
});
