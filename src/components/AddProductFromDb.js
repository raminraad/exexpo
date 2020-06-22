import React, { Component, useRef, useEffect, useState } from "react";
import { Container, Header, Item, Input, Icon, Button, Text, Content, Grid } from "native-base";
import { Entypo, FontAwesome5, Feather } from "@expo/vector-icons";
import * as rxGlobal from "../lib/rxGlobal";
import { View } from "react-native";
import * as dp from "../lib/sqliteProvider";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { ListItem } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import ProductShowcase from "./ProductShowcase";

export default function SearchBarExample() {
  const groupstack = useRef([null]);
  // const [groupstack, setGroupstack] = useState([null]);
  const [showcase, setShowcase] = useState([]);

  useEffect(() => {
    onGroupstackChanged();
    return () => {};
  }, []);

const pushToGroupstack=async (item)=>{
  let temp = [...groupstack.current];
  console.log(groupstack.current);
  console.log(temp);
  temp.push(item);
  groupstack.current = temp;
  await onGroupstackChanged();
};
const popFromGroupstack=async (item)=>{
  let temp = {...groupstack.current};
  temp.pop();
  groupstack.current = temp;
  await onGroupstackChanged();
};

  const onGroupstackChanged = async () => {
    let groupId = groupstack.current[groupstack.current.length - 1];
    console.log(`groupId:${groupId}`);
    console.log(`groupStack:${groupstack.current}`);
    if (groupId) setShowcase(await dp.selectTable("ProductGroup", `where ParentId = ${groupId}`));
    else setShowcase(await dp.selectTable("ProductGroup", `where ParentId is ${groupId}`));
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
          {/* todo:implement breadcrump here*/}
          <Text>{showcase.length}</Text>
          {console.log(JSON.stringify(showcase))}
        </View>
        <ProductShowcase data={showcase} onPress={pushToGroupstack}/>
      </Content>
    </Container>
  );
}
