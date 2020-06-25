import React from "react";
import { View, Text, FlatList, BackHandler, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import * as rxGlobal from "../lib/rxGlobal";
import TouchableScale from "react-native-touchable-scale";
import { Entypo, FontAwesome5, Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as enums from "../lib/enums";
import { Accordion } from "native-base";

export default function ProductSubShowcase(props) {
  let { data, onPress } = props;
  const renderSubtitle = (item) => (
    <View style={{ flexDirection: "row-reverse", alignItems: "center", justifyContent: "flex-start" }}>
      <View style={styles.fieldContainer}>
        <Ionicons name='ios-barcode' size={16} color={rxGlobal.globalColors.listItemSubtitleIcon} />
        <Text style={{ marginHorizontal: 5 }}>{item.BarCode ?? "وارد نشده"}</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={{ color: rxGlobal.globalColors.listItemSubtitleIcon, fontFamily: "serif" }}>[Ir]</Text>
        <Text style={{ marginHorizontal: 5 }}>{item.IranCode ?? "وارد نشده"}</Text>
      </View>

      <View style={styles.fieldContainer}>
        <MaterialIcons name='language' size={16} color={rxGlobal.globalColors.listItemSubtitleIcon} />
        <Text>{item.language ? enums.languagesToLiteral(item.language) : "وارد نشده"}</Text>
      </View>
    </View>
  );
  const renderTitle = (item) => (
    <View style={{ flexDirection: "row-reverse", alignItems: "center", justifyContent: "flex-start", marginBottom: 10 }}>
      <View style={styles.fieldContainer}>
        {item.PriceValue ? (
          <View style={styles.fieldContainer}>
            <Text style={styles.titleValue}>{item.PriceValue}</Text>
            <Text style={styles.titleScale}>{enums.priceTypesToLiteral(item.PriceType)}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.fieldContainer}>
        <MaterialCommunityIcons name='altimeter' size={16} color={rxGlobal.globalColors.listItemSubtitleIcon} />
        {item.MeasurmentScale ? (
          <View style={styles.fieldContainer}>
            <Text style={{ ...styles.titleValue, marginRight: 5 }}>{item.MeasurmentScale}</Text>
            <Text style={styles.titleScale}>{enums.measurementTypesToLiteral(item.MeasurmentType)}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
  const renderHeader = (item, expanded) => (
    <ListItem
      rightAvatar={<FontAwesome5 name='tag' size={32} color={rxGlobal.globalColors.palette.mercury} />}
      containerStyle={[rxGlobal.globalStyles.shadowedContainer, rxGlobal.globalStyles.listItemHeaderContainer]}
      underlayColor='FFFF'
      key={item.Id}
      style={{ marginVertical: 10 }}
      linearGradientProps={rxGlobal.globalColors.gradients.listItem}
      title={() => renderTitle(item)}
      titleStyle={{ ...rxGlobal.globalStyles.listItemTitle, textAlign: "right", fontSize: 20 }}
      subtitle={() => renderSubtitle(item)}
      subtitleStyle={{ color: rxGlobal.globalColors.listItemSubtitleText, textAlign: "right", fontSize: 13 }}
      
    />
  );

  const renderContent = ( item) => <View style={{height:50}}>
    <Text>آیتم های مربوط به افزودن</Text>
  </View>;

  return <Accordion expanded dataArray={data} renderHeader={renderHeader} renderContent={renderContent} />;
}

const styles = StyleSheet.create({
  fieldContainer: { flexDirection: "row-reverse", alignItems: "center", marginRight: 10 },
  titleValue: { fontSize: 24, color: rxGlobal.globalColors.listItemTitleText, fontWeight: "bold", marginLeft: 5 },
  titleScale: { fontSize: 12 },
});
