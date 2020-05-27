import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList, Modal, TextInput, ScrollView, Button } from "react-native";
import { Separator, Content, Container } from "native-base";
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

export default function VisitPlanResultForm({ onSubmit, onCancel, item , productList}) {
  const [visitResultStatus, setVisitResultStatus] = useState(item && item.ResultStatus ? item.ResultStatus : null);
  const [productSearchText, setProductSearchText] = useState("");
const [isOnProductSearch, setisOnProductSearch] = useState(false);
const [selectedProduct, setSelectedProduc] = useState(null);

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

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const list = [
    {
      title: "چیپس مزمز",
      icon: "av-timer",
    },
    {
      title: "پفک چی توز",
      icon: "flight-takeoff",
    },
  ];
  return (
    <Container>
      <Content>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ flex: 1 }}>
        <View style={{flex:1}}> 
          {!isOnProductSearch?
          <PricingCard
            containerStyle={{ alignSelf: "center" }}
            color='#fca311'
            title={list[0].title}
            price='18000 ريال'
            pricingStyle={{ fontSize: 18 }}
            info={[list[0].title, "Basic Support", "All Core Features"]}
            button={{ title: "تغییر", icon: "edit"}}
            onButtonPress={()=>setisOnProductSearch(true)}
          />
          :
            <View style={{ borderWidth: 0.5, marginVertical: 15, borderRadius: 2 }}>
          <SearchBar
            platform='default'
            lightTheme
            placeholder='جستجوی محصول...'
            onChangeText={(val) => {
              setProductSearchText(val);
            }}
            value={productSearchText}
          />
            {list.map((item, i) => (
              <ListItem containerStyle={{ backgroundColor: globalColors.listItemHeaderContainer }} key={i} title={item.title} bottomDivider 
              onPress={()=>setisOnProductSearch(false)}
              />
              ))}
          </View>
            }
            </View>
          <View style={{flex:1}}>
            <View style={globalStyles.addModalFieldContainer}>
              <Text style={{ ...globalStyles.addModalFieldTitle, flex: 0 }}>قیمت فروش</Text>
              <TextInput style={globalStyles.addModalFieldInput} placeholder='قیمت فروش محصول' />
            </View>
            <View style={globalStyles.addModalFieldContainer}>
              <Text style={{ ...globalStyles.addModalFieldTitle, flex: 0 }}>وزن (گرم) </Text>
              <TextInput style={globalStyles.addModalFieldInput} placeholder='وزن محصول (گرم) ' />
            </View>
            <View style={globalStyles.addModalFieldContainer}>
              <Text style={{ ...globalStyles.addModalFieldTitle, flex: 0 }}>موجودی قابل مشاهده</Text>
              <TextInput style={globalStyles.addModalFieldInput} placeholder='موجودی قابل مشاهده' />
            </View>
          </View>
          <Button title='تأیید' color={globalColors.btnAdd} onPress={() => console.log(productSearchText)} />
          <View style={{ marginVertical: 5 }} />
          <Button title='انصراف' color={globalColors.btnCancel} onPress={onCancel} />
        </Overlay>

        <ScrollView style={{ padding: 25 }}>
          <Formik
            initialValues={{
              Id: `${item && item.Id ? item.Id : null}`,
              VisitPlanCustomerId: `${item && item.VisitPlanCustomerId ? item.VisitPlanCustomerId : null}`,
              ProductSubId: `${item && item.ProductSubId ? item.ProductSubId : null}`,
              SellPrice: `${item && item.SellPrice ? item.SellPrice : ""}`,
              Weight: `${item && item.Weight ? item.Weight : ""}`,
              HasInventory: `${item && item.HasInventory ? item.HasInventory : ""}`,
              ShelfInventoryCount: `${item && item.ShelfInventoryCount ? item.ShelfInventoryCount : ""}`,
              ShelfVisibleCount: `${item && item.ShelfVisibleCount ? item.ShelfVisibleCount : ""}`,
              WarehouseInventoryCount: `${item && item.WarehouseInventoryCount ? item.WarehouseInventoryCount : ""}`,
              VerbalPurchaseCount: `${item && item.VerbalPurchaseCount ? item.VerbalPurchaseCount : ""}`,
              FactorPurchaseCount: `${item && item.FactorPurchaseCount ? item.FactorPurchaseCount : ""}`,
              LastModifiedDate: `${item && item.LastModifiedDate ? item.LastModifiedDate : ""}`,
              SyncStatus: `${item && item.SyncStatus ? item.SyncStatus : ""}`,

              ResultSummary: `${item && item.ResultSummary ? item.ResultSummary : ""}`,
              ResultStatus: `${item && item.ResultStatus ? item.ResultStatus : ""}`,
              SyncStatus: `${item && item.SyncStatus ? item.SyncStatus : ""}`,
              SyncStatus: `${item && item.SyncStatus ? item.SyncStatus : ""}`,
              SyncStatus: `${item && item.SyncStatus ? item.SyncStatus : ""}`,
            }}
            onSubmit={(values, actions) => {
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
                    onChangeText={props.handleChange("ResultSummary")}
                    multiline
                    value={props.values.fName}
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

                <View style={globalStyles.addModalFieldContainer}>
                  <View style={{ flexDirection: "row-reverse", justifyContent: "space-between" }}>
                    <Text style={globalStyles.addModalFieldTitle}>محصولات فروشگاه</Text>
                    <View style={{ marginBottom: 5 }}>
                      <FontAwesome5.Button name='plus-square' backgroundColor={globalColors.btnAdd} onPress={toggleOverlay}>
                        افزودن محصول
                      </FontAwesome5.Button>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row-reverse",
                      backgroundColor: globalColors.listItemHeaderContainer,
                      borderRadius: 6,
                      borderColor: globalColors.inputBorder,
                      borderWidth: 1,
                    }}>
                    <FlatList
                      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={() => (
                        <Swipeable renderLeftActions={swipeLeftAction}>
                          <ListItem containerStyle={{ backgroundColor: globalColors.listItemHeaderContainer }} title='محصول شماره یک مزمز' bottomDivider />
                        </Swipeable>
                      )}
                    />
                  </View>
                </View>

                <Button title='تأیید' color={globalColors.btnAdd} onPress={onSubmit} />
                <View style={{ marginVertical: 5 }} />
                <Button title='انصراف' color={globalColors.btnCancel} onPress={onCancel} />
              </View>
            )}
          </Formik>
        </ScrollView>
      </Content>
    </Container>
  );
}
