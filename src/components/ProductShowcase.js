import React from "react";
import { View, Text, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import * as rxGlobal from "../lib/rxGlobal";

export default function Productdata(props) {
    let {data} = props;
  return (
    <View style={{ flexWrap: "wrap-reverse" }}>
      {console.log(data)}
      <FlatList
        columnWrapperStyle={{ flexWrap: "wrap" }}
        scrollEventThrottle={1900}
        data={data}
        numColumns={3}
        renderItem={(item) => (
          <ListItem
            containerStyle={[rxGlobal.globalStyles.shadowedContainer, rxGlobal.globalStyles.listItemHeaderContainer, { width: 150, aspectRatio: 1 }]}
            key={item.rxKey}
            linearGradientProps={rxGlobal.globalColors.gradients.listItem}
            title={`${item.Title}`}
            titleStyle={{ ...rxGlobal.globalStyles.listItemTitle, textAlign: "center", fontSize: 20 }}
            subtitle={`کد گروه:  ${item.ProductGroupCode}`}
            subtitleStyle={{ ...rxGlobal.globalStyles.listItemTitle, color: rxGlobal.globalColors.listItemSubtitleText, textAlign: "center" }}
            onPress={async () => {
              groupStack.current.push(item.Id);
              await onGroupStackChanged();
            }}
          />
        )}
        keyExtractor={(item, index) => index}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
