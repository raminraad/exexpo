import React from "react";
import { View, Text, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import * as rxGlobal from "../lib/rxGlobal";
import TouchableScale from "react-native-touchable-scale";

export default function Productdata(props) {
  let { data } = props;
  let { onPress } = props;
  return (
    <View style={{ alignItems:'center' }}>
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
              containerStyle={[rxGlobal.globalStyles.shadowedContainer, rxGlobal.globalStyles.listItemHeaderContainer, { width: 150, aspectRatio: 1 ,}]}
              underlayColor='FFFF'
              key={item.rxKey}
              style={{marginVertical:10}}
              linearGradientProps={rxGlobal.globalColors.gradients.listItem}
              title={`${item.Title}`}
              titleStyle={{ ...rxGlobal.globalStyles.listItemTitle, textAlign: "center", fontSize: 20 }}
              subtitle={`کد گروه:  ${item.ProductGroupCode}`}
              subtitleStyle={{ ...rxGlobal.globalStyles.listItemTitle, color: rxGlobal.globalColors.listItemSubtitleText, textAlign: "center" }}
              onPress={() => {
                onPress(item.Id);
              }}
            />
          );
        }}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}
