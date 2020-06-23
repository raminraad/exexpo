import React from "react";
import { View, Text, FlatList, BackHandler } from "react-native";
import { ListItem } from "react-native-elements";
import * as rxGlobal from "../lib/rxGlobal";
import TouchableScale from "react-native-touchable-scale";
import { Entypo,FontAwesome5 } from "@expo/vector-icons";

export default function ProductShowcase(props) {
  let { data ,onPress} = props;
  return (
    <View style={{ alignItems:'flex-end' ,marginHorizontal:25}}>
        {console.log(`RENDERING PRODUCT`)}
      <FlatList
        data={data}
        horizontal={true}
        renderItem={({ item, i }) => {
          return (
            <ListItem
              Component={TouchableScale}
              rightAvatar={<FontAwesome5 name="layer-group" size={24} color={rxGlobal.globalColors.palette.mercury} />}
              friction={90} //
              tension={100} // These props are passed to the parent component (here TouchableScale)
              activeScale={0.8} //
              containerStyle={[rxGlobal.globalStyles.shadowedContainer, rxGlobal.globalStyles.listItemHeaderContainer]}
              underlayColor='FFFF'
              key={item.Id}
              style={{marginVertical:10}}
              linearGradientProps={rxGlobal.globalColors.gradients.listItem}
              title={`${item.Taste}`}
              titleStyle={{ ...rxGlobal.globalStyles.listItemTitle, textAlign: "right", fontSize: 20 }}
              subtitle={`کد محصول ${item.ProductCode}`}
              subtitleStyle={{color: rxGlobal.globalColors.listItemSubtitleText, textAlign: "right" ,fontSize:13}}
              onPress={() => {
                onPress({id:item.Id,title:item.Taste});
              }}
            />
          );
        }}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}
