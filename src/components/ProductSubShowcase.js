import React, { useContext } from "react";
import { View, Text, FlatList, BackHandler, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { ListItem } from "react-native-elements";
import * as rxGlobal from "../lib/rxGlobal";
import TouchableScale from "react-native-touchable-scale";
import { Entypo, FontAwesome5, Ionicons, MaterialIcons, MaterialCommunityIcons, AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import * as enums from "../lib/enums";
import { Accordion, Spinner } from "native-base";
import { Formik } from "formik";
import * as yup from "yup";
import * as dp from "../lib/sqliteProvider";
import Moment from "moment";
import * as toastLib from "../lib/toastLib";

const auditItemSchema = yup.object().shape({
  PriceValue: yup.number().required(rxGlobal.globalLiterals.validationErrors.required),
  MeasurmentScale: yup.number().required(rxGlobal.globalLiterals.validationErrors.required),
  ShelfVisibleCount: yup.number().required(rxGlobal.globalLiterals.validationErrors.required),
});

export default function ProductSubShowcase(props) {
  let { data, onConfirm, isAdding } = props;

  const renderSubtitle = (item) => (
    <View style={{ flexDirection: "row-reverse", alignItems: "center", justifyContent: "flex-start" }}>
      <View style={styles.subtitleFieldContainer}>
        <Ionicons name='ios-barcode' size={16} color={rxGlobal.globalColors.listItemSubtitleIcon} />
        <Text style={{ marginHorizontal: 5 }}>{item.BarCode ?? "وارد نشده"}</Text>
      </View>

      <View style={styles.subtitleFieldContainer}>
        <Text style={{ color: rxGlobal.globalColors.listItemSubtitleIcon, fontFamily: "serif" }}>[Ir]</Text>
        <Text style={{ marginHorizontal: 5 }}>{item.IranCode ?? "وارد نشده"}</Text>
      </View>

      <View style={styles.subtitleFieldContainer}>
        <MaterialIcons name='language' size={16} color={rxGlobal.globalColors.listItemSubtitleIcon} />
        <Text>{item.language ? enums.languagesToLiteral(item.language) : "وارد نشده"}</Text>
      </View>
    </View>
  );

  const renderTitle = (item) => (
    <View style={{ flexDirection: "row-reverse", alignItems: "center", justifyContent: "flex-start", marginBottom: 10 }}>
      <View style={styles.subtitleFieldContainer}>
        {item.PriceValue ? (
          <View style={styles.subtitleFieldContainer}>
            <Text style={styles.titleValue}>{item.PriceValue}</Text>
            <Text style={styles.titleScale}>{enums.priceTypesToLiteral(item.PriceType)}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.subtitleFieldContainer}>
        <MaterialCommunityIcons name='altimeter' size={16} color={rxGlobal.globalColors.listItemSubtitleIcon} />
        {item.MeasurmentScale ? (
          <View style={styles.subtitleFieldContainer}>
            <Text style={{ ...styles.titleValue, marginRight: 5 }}>{item.MeasurmentScale}</Text>
            <Text style={styles.titleScale}>{enums.measurementTypesToLiteral(item.MeasurmentType)}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );

  const renderHeader = (item, expanded) => (
    <ListItem
      rightAvatar={<FontAwesome5 name='tag' size={28} color={rxGlobal.globalColors.breadcrumpListAvatar3} />}
      containerStyle={[rxGlobal.globalStyles.shadowedContainer, rxGlobal.globalStyles.listItemHeaderContainer]}
      underlayColor='FFFF'
      key={item.Id}
      style={{ marginTop: 10 }}
      linearGradientProps={rxGlobal.globalColors.gradients.listItem}
      title={() => renderTitle(item)}
      titleStyle={{ ...rxGlobal.globalStyles.listItemTitle, textAlign: "right", fontSize: 20 }}
      subtitle={() => renderSubtitle(item)}
      subtitleStyle={{ color: rxGlobal.globalColors.listItemSubtitleText, textAlign: "right", fontSize: 13 }}
      leftIcon={<AntDesign name={expanded ? "upcircle" : "downcircleo"} size={28} color={rxGlobal.globalColors.breadcrumpLevel3} />}
    />
  );

  const renderContent = (item) => {
    console.log(`FORMIK ITEM:${JSON.stringify(item)}`);
    return (
      <Formik
        initialValues={item}
        validationSchema={auditItemSchema}
        onSubmit={async (values, actions) => {
          // actions.resetForm();
          values.LastModifiedDate = Moment(new Date()).format("YYYY/MM/DD HH:mm:ss");
          onConfirm(values);
        }}>
        {(props) => (
          <View style={{ ...rxGlobal.globalStyles.listItemContentContainer, flexDirection: "row-reverse", paddingRight: 10 }}>
            <View style={{ flexDirection: "column", paddingHorizontal: 15, flex: 3 }}>
              <View style={styles.contentFieldContainer}>
                <FontAwesome name='money' size={20} color={rxGlobal.globalColors.listItemSubtitleIcon} />
                <TextInput
                  maxLength={8}
                  style={styles.input}
                  placeholder='قیمت فروش محصول'
                  keyboardType='number-pad'
                  onChangeText={props.handleChange("PriceValue")}
                  value={props.values?.PriceValue?.toString()}
                  onBlur={props.handleBlur("PriceValue")}
                />
              </View>
              <View style={styles.contentFieldContainer}>
                <MaterialCommunityIcons name='altimeter' size={20} color={rxGlobal.globalColors.listItemSubtitleIcon} />
                <TextInput
                  maxLength={8}
                  style={styles.input}
                  placeholder='وزن محصول (گرم) '
                  keyboardType='number-pad'
                  onChangeText={props.handleChange("MeasurmentScale")}
                  value={props.values?.MeasurmentScale?.toString()}
                  onBlur={props.handleBlur("MeasurmentScale")}
                />
              </View>
              <View style={styles.contentFieldContainer}>
                <FontAwesome5 name='eye' size={20} color={rxGlobal.globalColors.listItemSubtitleIcon} />
                <TextInput
                  maxLength={8}
                  style={styles.input}
                  placeholder='موجودی قابل مشاهده'
                  keyboardType='number-pad'
                  onChangeText={props.handleChange("ShelfVisibleCount")}
                  value={props.values?.ShelfVisibleCount?.toString()}
                  onBlur={props.handleBlur("ShelfVisibleCount")}
                />
              </View>
            </View>

            <View style={{ alignItems: "center", justifyContent: "center", flex: 2, alignSelf: "stretch" }}>
              {isAdding ? (
                <Spinner size={24} color={rxGlobal.globalColors.spinner}/>
              ) : (
                <>
                  <MaterialIcons.Button name='add-circle-outline' size={48} backgroundColor={rxGlobal.globalColors.btnAdd} onPress={props.handleSubmit}>
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>افزودن به لیست</Text>
                  </MaterialIcons.Button>
                  <Text style={{ color: rxGlobal.globalColors.addModalFieldValidationErrorText, textAlign: "center", marginTop: 20 }}>
                    {!props.isValid && rxGlobal.globalLiterals.validationErrors.allFieldsAreRequired}
                  </Text>
                </>
              )}
            </View>
          </View>
        )}
      </Formik>
    );
  };

  return <Accordion expanded dataArray={data} renderHeader={renderHeader} renderContent={renderContent} />;
}

const styles = StyleSheet.create({
  subtitleFieldContainer: { flexDirection: "row-reverse", alignItems: "center", marginRight: 10 },
  titleValue: { fontSize: 24, color: rxGlobal.globalColors.listItemTitleText, fontWeight: "bold", marginLeft: 5 },
  titleScale: { fontSize: 12 },
  contentFieldContainer: { marginBottom: 10, flexDirection: "row-reverse", alignItems: "center", marginTop: 10 },
  input: { ...rxGlobal.globalStyles.addModalFieldInput, marginRight: 15 },
});
