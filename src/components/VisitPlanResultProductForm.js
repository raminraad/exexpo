import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList, Modal, TextInput, Button, ScrollView } from "react-native";
import { Formik } from "formik";
import { RadioButton, Text, Divider } from "react-native-paper";
import { Separator, ListItem, Content, Container } from "native-base";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { globalStyles, globalColors, globalSizes } from "../styles/global";
import { Icon } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function VisitPlanResultProductForm({ onSubmit, onCancel, item }) {




  const [visitResultStatus, setVisitResultStatus] = useState(item && item.ResultStatus ? item.ResultStatus : null);
    return (
  <Container>
<Content padder>
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
      }}
    >
      {(props) => (
        <View>
          <View style={globalStyles.addModalFieldContainer}>
            <Text style={globalStyles.addModalFieldTitle}>شرح مختصر</Text>
            <TextInput
              style={[globalStyles.addModalFieldInput, { height: 100 }]}
              textAlignVertical="top"
              placeholder="توضیحات مختصر درباره گزارش پویش"
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
                  <RadioButton value="0" />
                </View>
                <View style={globalStyles.radioItemContainer}>
                  <Text>عدم همکاری</Text>
                  <RadioButton value="3" />
                </View>
                <View style={globalStyles.radioItemContainer}>
                  <Text>پویش موفق</Text>
                  <RadioButton value="7" />
                </View>
                <View style={globalStyles.radioItemContainer}>
                  <Text>تغییر کاربری</Text>
                  <RadioButton value="11" />
                </View>
                <View style={globalStyles.radioItemContainer}>
                  <Text>یافت نشد</Text>
                  <RadioButton value="13" />
                </View>
              </RadioButton.Group>
            </View>
          </View>

          <View style={globalStyles.addModalFieldContainer}>
            <View style={{ flexDirection: "row-reverse", justifyContent: "space-between" }}>
              <Text style={globalStyles.addModalFieldTitle}>محصولات فروشگاه</Text>
              <View style={{ marginBottom: 5 }}>
                <FontAwesome5.Button
                  name="plus-square"
                  backgroundColor={globalColors.btnAdd}
                  //todo: implement add functioinality
                  onPress={() => console.warn("add")}
                >
                  افزودن
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
              }}
            >
              <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={() => (
                  <Swipeable renderLeftActions={swipeLeftAction}>
                    <ListItem style={{ backgroundColor: globalColors.listItemHeaderContainer, paddingVertical: 2, flexDirection: "row-reverse" }}>
                      <Text style={{ textAlign: "right", flex: 1 }}>محصول شماره n شرکت مزمز</Text>
                      <Text style={{ textAlign: "right", flex: 1 }}>قیمت فروش:340000ريال</Text>
                    </ListItem>
                  </Swipeable>
                )}
              />
            </View>
          </View>

          <Button title="تأیید" color={globalColors.btnAdd} onPress={onSubmit} />
          <View style={{ marginVertical: 5 }} />
          <Button title="انصراف" color={globalColors.btnCancel} onPress={onCancel} />
          <Separator />
        </View>
      )}
    </Formik>
  
    </Content>
    </Container>
  );
}
