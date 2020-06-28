import React from "react";
import { View, Text, FlatList, BackHandler } from "react-native";
import { ListItem } from "react-native-elements";
import * as rxGlobal from "../lib/rxGlobal";
import TouchableScale from "react-native-touchable-scale";
import { Entypo,FontAwesome5 } from "@expo/vector-icons";

export default function ProudctGroupShowcase(props) {
  let { data ,onConfirm} = props;
  let itemWidth = data.length>30 ? 150 : 225;
  let itemAspect = data.length>30 ? 1.6180 : 2.33;
  let numColumns = data.length>30 ? 3 : 2;

  return (
    <View style={{ alignItems:'flex-end' ,marginHorizontal:25}}>
      {console.log(`RENDERING PRODUCT-GROUP`)}
      <FlatList
        data={data}
        numColumns={numColumns}
        renderItem={({ item, index }) => {
          return (
            <ListItem
              Component={TouchableScale}
              rightAvatar={<FontAwesome5 name="layer-group" size={32} color={rxGlobal.globalColors.breadcrumpListAvatar1} />}
              friction={90} //
              tension={100} // These props are passed to the parent component (here TouchableScale)
              activeScale={0.8} //
              containerStyle={[rxGlobal.globalStyles.shadowedContainer, rxGlobal.globalStyles.listItemHeaderContainer, { width: itemWidth, aspectRatio: itemAspect ,}]}
              underlayColor='FFFF'
              key={item.Id}
              style={{marginVertical:10}}
              linearGradientProps={rxGlobal.globalColors.gradients.listItem}
              title={`${item.Title}`}
              titleStyle={{ ...rxGlobal.globalStyles.listItemTitle, textAlign: "right",textAlignVertical:'center', fontSize: 18,flex:1}}
              subtitle={`کد گروه ${item.ProductGroupCode}`}
              subtitleStyle={{color: rxGlobal.globalColors.listItemSubtitleText, textAlign: "right",textAlignVertical:'bottom' ,fontSize:13}}
              onPress={() => {
                onConfirm({id:item.Id,title:item.Title});
              }}
            />
          );
        }}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}
