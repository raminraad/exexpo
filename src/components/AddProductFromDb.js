import React, { Component, useRef, useEffect, useState } from "react";
import { Container, Header, Item, Input, Icon, Button, Text, Content } from "native-base";
import { Entypo, FontAwesome5, Feather } from "@expo/vector-icons";
import * as rxGlobal from "../lib/rxGlobal";
import { View } from "react-native";
import * as dp from "../lib/sqliteProvider";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ListItem } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale

export default function SearchBarExample() {
  const groupStack = useRef([null]);
  const [showcase, setShowcase] = useState([]);

  useEffect(() => {
    onGroupStackChanged();
    return () => {};
  }, []);

  const onGroupStackChanged = async () => {
    console.log("1");
    setShowcase(await dp.selectTable("ProductGroup", `where ParentId is ${groupStack.current[groupStack.current.length - 1]}`));
    console.log("2");
  };

  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Feather name='x' size={rxGlobal.globalSizes.icons.small} style={{ marginLeft: 10 }} color={rxGlobal.globalColors.searchBarIcon} />
          <Input placeholder='جستجو' />
          <Feather name='search' size={rxGlobal.globalSizes.icons.small} style={{ marginRight: 10 }} color={rxGlobal.globalColors.searchBarIcon} />
        </Item>
      </Header>
      <Content>
        <View>
          {/* todo:implement breadcrump */}
          <Text>{showcase.length}</Text>
        </View>
        <View style={{flexWrap:'wrap-reverse'}}>
          {console.log("3")}

          {showcase.map((item, i) => (
            <ListItem
              containerStyle={[
                rxGlobal.globalStyles.shadowedContainer,
                rxGlobal.globalStyles.listItemHeaderContainer,
                { width: 150, aspectRatio: 1 },
              ]}
              Component={TouchableScale}
              key={item.rxKey}
              friction={90} //
              tension={100} // These props are passed to the parent component (here TouchableScale)
              activeScale={0.95} //
              linearGradientProps={rxGlobal.globalColors.gradients.listItem}
              title={`${item.Title}`}
              titleStyle={{...rxGlobal.globalStyles.listItemTitle,textAlign:'center',fontSize:20}}
              subtitle={`کد گروه:  ${item.ProductGroupCode}`}
              subtitleStyle={{ ...rxGlobal.globalStyles.listItemTitle, color: rxGlobal.globalColors.listItemSubtitleText,textAlign:'center' }}
              onPress={()=>onGroupStackChanged}
            />
          ))}
        </View>
      </Content>
    </Container>
  );
}
