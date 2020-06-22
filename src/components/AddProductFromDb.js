import React, { Component, useRef, useEffect, useState, useCallback } from "react";
import { Container, Header, Item, Input, Icon, Button, Text, Content, Grid } from "native-base";
import { Entypo, FontAwesome5, Feather } from "@expo/vector-icons";
import * as rxGlobal from "../lib/rxGlobal";
import { View, BackHandler, Alert, I18nManager } from "react-native";
import * as dp from "../lib/sqliteProvider";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { ListItem } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import ProductShowcase from "./ProductShowcase";
import { useFocusEffect } from "@react-navigation/native";

export default function SearchBarExample(props) {
  const groupstack = useRef([]);
  // const [groupstack, setGroupstack] = useState([null]);
  const [showcase, setShowcase] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (groupstack.current.length > 1) {
          popFromGroupstack();
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  useEffect(() => {
    loadRootGroups();
  }, []);

  const loadRootGroups = async () => {
    let rootItem = (await dp.selectTable("ProductGroup", `where ParentId is null`))[0];
    pushToGroupstack(rootItem);
  };

  const pushToGroupstack = async (item) => {
    console.log(`before push: ${JSON.stringify(groupstack.current)}`)
    groupstack.current.push(item);
    console.log(`after push: ${JSON.stringify(groupstack.current)}`)
    await onGroupstackChanged();
  };
  const popFromGroupstack = async () => {
    console.log(`before pop: ${JSON.stringify(groupstack.current)}`)
    groupstack.current.pop();
    console.log(`after pop: ${JSON.stringify(groupstack.current)}`)
    await onGroupstackChanged();
  };

  const onGroupstackChanged = async () => {
    let currentGroupId = groupstack.current[groupstack.current.length - 1].Id;
    let subgroups = await dp.selectTable("ProductGroup", `where ParentId = ${currentGroupId}`);
    // current group has subgroups
    if (subgroups.length) {
      setShowcase(subgroups);
    }
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
        <View style={{ backgroundColor: "tomato", height: 50 }}>
          <FlatList style={{flexDirection:'row-reverse'}} contentContainerStyle={{alignItems:'center'}} horizontal={true} ItemSeparatorComponent={()=><Text> --- </Text>} data={([...groupstack.current]).reverse()} renderItem={({ item }) => <Text>{item.Title}</Text>} />
        </View>
        <ProductShowcase data={showcase} onPress={pushToGroupstack} />
      </Content>
    </Container>
  );
}
