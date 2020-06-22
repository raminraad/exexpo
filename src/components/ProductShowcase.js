import React from "react";
import { View, Text, FlatList, BackHandler } from "react-native";
import { ListItem } from "react-native-elements";
import * as rxGlobal from "../lib/rxGlobal";
import TouchableScale from "react-native-touchable-scale";
import { Entypo } from "@expo/vector-icons";

export default function Productdata(props) {
  let { data ,onPress} = props;
  return (
    <View style={{ alignItems:'flex-end' ,marginHorizontal:25}}>
      {console.log(data)}
      <FlatList
        columnWrapperStyle={{ flexWrap: "wrap" }}
        data={data}
        numColumns={3}
        renderItem={({ item, i }) => {
          console.log(`ITEM: ${JSON.stringify(item)}`);
          return (
            <ListItem
              Component={TouchableScale}
              key={item.rxKey}
              friction={90} //
              tension={100} // These props are passed to the parent component (here TouchableScale)
              activeScale={0.8} //
              containerStyle={[rxGlobal.globalStyles.shadowedContainer, rxGlobal.globalStyles.listItemHeaderContainer, { width: 150, aspectRatio: 2 ,}]}
              underlayColor='FFFF'
              key={item.rxKey}
              style={{marginVertical:10}}
              linearGradientProps={rxGlobal.globalColors.gradients.listItem}
              title={`${item.Title}`}
              titleStyle={{ ...rxGlobal.globalStyles.listItemTitle, textAlign: "center", fontSize: 20 }}
              subtitle={`کد گروه:  ${item.ProductGroupCode}`}
              subtitleStyle={{ ...rxGlobal.globalStyles.listItemTitle, color: rxGlobal.globalColors.listItemSubtitleText, textAlign: "center" }}
              onPress={() => {
                onPress(item);
              }}
            />
          );
        }}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}
