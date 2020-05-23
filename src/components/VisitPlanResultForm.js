import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList, Modal, TextInput, Button } from "react-native";
import { globalStyles, colors, globalColors } from "../styles/global";
import { Formik } from "formik";
import { RadioButton, Text } from "react-native-paper";

export default function VisitPlanResultForm({ onSubmit, onCancel, item }) {
  const [visitResultStatus, setVisitResultStatus] = useState(item && item.ResultStatus ? item.ResultStatus : null);
  console.log(visitResultStatus);
  return (
    <View style={globalStyles.addModalContainer}>
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
              <Text style={globalStyles.addModalFieldTitle}>محصولات فروشگاه</Text>
              <TextInput
                style={[globalStyles.addModalFieldInput, { height: 100 }]}
                textAlignVertical='top'
                placeholder='توضیحات مختصر درباره گزارش پویش'
                onChangeText={props.handleChange("ResultSummary")}
                multiline
                value={props.values.fName}
              />
            </View>

            <TextInput multiline style={globalStyles.input} placeholder='نام خانوادگی' onChangeText={props.handleChange("lName")} value={props.values.lName} />
            <TextInput style={globalStyles.input} placeholder='سمت' onChangeText={props.handleChange("jobTitle")} value={props.values.jobTitle} />
            <TextInput
              multiline
              keyboardType='numeric'
              style={globalStyles.input}
              placeholder='توضیحات'
              onChangeText={props.handleChange("description")}
              value={props.values.description}
            />
            <Button title='تأیید' color={globalColors.btnAdd} onPress={props.handleSubmit} />
            <View style={{ height: 15 }} />
            <Button title='انصراف' color={globalColors.btnCancel} onPress={onCancel} />
          </View>
        )}
      </Formik>
    </View>
  );
}
