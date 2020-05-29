import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList, TextInput, ScrollView, Button ,Modal} from "react-native";
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
import VisitPlanResultProductForm from "./VisitPlanResultProductForm";

export default function VisitPlanResultForm({ onSubmit, onCancel, item, productListRawData }) {
  const [visitResultStatus, setVisitResultStatus] = useState(item && item.ResultStatus ? item.ResultStatus : null);

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

  //xxx START
  const list = [
    {
      title: "chips",
      icon: "av-timer",
    },
    {
      title: "pofak",
      icon: "flight-takeoff",
    },
    {
      title: "lollipop",
      icon: "flight-takeoff",
    },
    {
      title: "nuts",
      icon: "flight-takeoff",
    },
  ];
  // XXX END
  return (
    <View>
      <View style={globalStyles.container}>
        
      <Modal visible={productModalIsVisible} animationType="slide">
        <VisitPlanResultProductForm rawData={list}/>
        
      </Modal>
      </View>

      <ScrollView style={{ padding: 25 }}>
        <View>
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

              <View>
                <View style={{ flexDirection: "row-reverse", justifyContent: "space-between" }}>
                  <Text style={globalStyles.addModalFieldTitle}>محصولات فروشگاه</Text>
                  <View style={{ marginBottom: 5 }}>
                    <FontAwesome5.Button name='plus-square' backgroundColor={globalColors.btnAdd} 
                    onPress={()=>{setProductModalIsVisible(true);console.log(productModalIsVisible);}
                    }>
                      افزودن محصول
                    </FontAwesome5.Button>
                  </View>
                </View>
                <View>

                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((value,index)=>(
                
                      <Swipeable renderLeftActions={swipeLeftAction}>
                        <ListItem key={index.toString()} containerStyle={{ backgroundColor: globalColors.listItemHeaderContainer ,alignSelf:'stretch'}} title='محصول شماره یک مزمز' bottomDivider />
                      </Swipeable>
                    ))}
              </View>
              </View>

              <Button title='تأیید' color={globalColors.btnAdd} onPress={onSubmit} />
              <View style={{ marginVertical: 5 }} />
              <Button title='انصراف' color={globalColors.btnCancel} onPress={onCancel}/>
              <View style={{ marginVertical: 20 }} />
            </View>
          )}
        </Formik>
        </View>
      </ScrollView>
    
    </View>
  );
}
