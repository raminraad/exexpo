import React from "react";
import { View, Text, FlatList, BackHandler ,StyleSheet} from "react-native";
import { ListItem } from "react-native-elements";
import * as rxGlobal from "../lib/rxGlobal";
import TouchableScale from "react-native-touchable-scale";
import { Entypo, FontAwesome5 ,Ionicons,MaterialIcons} from "@expo/vector-icons";
import * as enums from "../lib/enums";

export default function ProductSubShowcase(props) {
  let { data, onPress } = props;
  const renderSubtitle = (item) => (
    <View style={{flexDirection:'row-reverse',alignItems:'center',justifyContent:'flex-start'}}>
      <View style={styles.subtitleFieldContainer}>
        <Ionicons name='ios-barcode' size={16} color={rxGlobal.globalColors.listItemSubtitleIcon} />
        <Text style={{marginHorizontal:5}}>{item.BarCode ?? "وارد نشده"}</Text>
      </View>
      <View style={styles.subtitleFieldContainer}>
        <FontAwesome5 name='money-bill-alt' size={16} color={rxGlobal.globalColors.listItemSubtitleIcon} />
        {item.PriceValue?
        (<View style={styles.subtitleFieldContainer}>
          <Text style={{marginHorizontal:3}}>{item.PriceValue}</Text>
          <Text>{ enums.priceTypesToLiteral(item.PriceType)}</Text>
        </View>):null}
      </View>  
      <View style={styles.subtitleFieldContainer}>
        <MaterialIcons name='language' size={16} color={rxGlobal.globalColors.listItemSubtitleIcon} />
        <Text>{item.language? enums.languagesToLiteral(item.language):"وارد نشده"}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={({ item, i }) => {
        console.log(`PRODUCTSUB: ${JSON.stringify(item)}`);
        return (
          <ListItem
            Component={TouchableScale}
            rightAvatar={<FontAwesome5 name='layer-group' size={24} color={rxGlobal.globalColors.palette.mercury} />}
            friction={90} //
            tension={100} // These props are passed to the parent component (here TouchableScale)
            activeScale={0.8} //
            containerStyle={[rxGlobal.globalStyles.shadowedContainer, rxGlobal.globalStyles.listItemHeaderContainer]}
            underlayColor='FFFF'
            key={item.Id}
            style={{ marginVertical: 10 }}
            linearGradientProps={rxGlobal.globalColors.gradients.listItem}
            title={`${item.Taste}`}
            titleStyle={{ ...rxGlobal.globalStyles.listItemTitle, textAlign: "right", fontSize: 20 }}
            subtitle={() => renderSubtitle(item)}
            subtitleStyle={{ color: rxGlobal.globalColors.listItemSubtitleText, textAlign: "right", fontSize: 13 }}
            onPress={() => {
              onPress({ id: item.Id, title: item.Taste });
            }}
          />
        );
      }}
      keyExtractor={(item, index) => index}
    />
  );
}



const styles = StyleSheet.create({
  subtitleFieldContainer:{flexDirection:'row-reverse',alignItems:'center',marginRight:10}
})
