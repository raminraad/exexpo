import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { globalStyles, colors, globalColors } from "../lib/rxGlobal";
import { Formik } from "formik";

export default function UserForm({ onSubmit, onCancel, item }) {
  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{
          key: `${item && item.key? item.key : null}`,
          fName: `${item && item.fName? item.fName : ""}`,
          lName: `${item && item.lName? item.lName : ""}`,
          jobTitle: `${item && item.jobTitle? item.jobTitle : ""}`,
          avatar_url: `${item && item.avatar_url? item.avatar_url : ""}`,
          description: `${item && item.description? item.description : ""}`,
        }}
        onSubmit={(values, actions) => {
          actions.resetForm();
          onSubmit(values);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="نام"
              onChangeText={props.handleChange("fName")}
              value={props.values.fName}
            />
            <TextInput
              multiline
              style={globalStyles.input}
              placeholder="نام خانوادگی"
              onChangeText={props.handleChange("lName")}
              value={props.values.lName}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="سمت"
              onChangeText={props.handleChange("jobTitle")}
              value={props.values.jobTitle}
            />
            <TextInput
              multiline
              keyboardType="numeric"
              style={globalStyles.input}
              placeholder="توضیحات"
              onChangeText={props.handleChange("description")}
              value={props.values.description}
            />
            <Button
              title="تأیید"
              color={globalColors.btnAdd}
              onPress={props.handleSubmit}
            />
            <View style={{ height: 15 }} />
            <Button
              title="انصراف"
              color={globalColors.btnCancel}
              onPress={onCancel}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}
