import React, { Component, useRef, useEffect, useState, useCallback } from "react";
import { Container, Header, Item, Input, Icon, Button, Text, Content, Grid, Spinner } from "native-base";
import { Entypo, FontAwesome5, Feather } from "@expo/vector-icons";
import * as rxGlobal from "../lib/rxGlobal";
import { View, BackHandler, Alert, I18nManager, TouchableHighlight } from "react-native";
import * as dp from "../lib/sqliteProvider";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { ListItem } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import ProductShowcase from "./ProductShowcase";
import ProductGroupShowcase from "./ProductGroupShowcase";
import ProductSubShowcase from "./ProductSubShowcase";
import { useFocusEffect } from "@react-navigation/native";

export default function SearchBarExample(props) {
  const groupstack = useRef([]);

  const [isLoading, setIsLoading] = useState(false);
  // const [groupstack, setGroupstack] = useState([null]);
  const [showcase, setShowcase] = useState([]);
  const showcaseTypes = Object.freeze({ productGroup: 1, product: 2, productSub: 3 });
  let presentShowcaseType = groupstack.current.length ? groupstack.current[groupstack.current.length - 1].showcaseType : showcaseTypes.productGroup;
  console.log(`GROUP STACK: ${JSON.stringify(groupstack.current)}`);
  console.log(`PRESENT SHOWCASE TYPE: ${presentShowcaseType}`);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (groupstack.current.length > 1) {
          popFromGroupstack(1);
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

    pushToGroupstack({ id: rootItem.Id, title: rootItem.Title });
  };

  const pushToGroupstack = async (item) => {
    setIsLoading(true);

    if (presentShowcaseType === showcaseTypes.productGroup) {
      let subgroups = await dp.selectTable("ProductGroup", `where ParentId = ${item.id}`);
      if (subgroups.length) {
        setShowcase(subgroups);
        groupstack.current.push({ ...item, showcaseType: showcaseTypes.productGroup });
        // return;
      } else {
        let products = await dp.selectTable("Product", `where ProductGroupId = ${item.id}`);
        // if (products.length)
        setShowcase(products);
        groupstack.current.push({ ...item, showcaseType: showcaseTypes.product });
        // return;
      }
    } else if (presentShowcaseType === showcaseTypes.product) {
      let productSubs = await dp.selectTable("ProductSub", `where ProductId = ${item.id}`);
      // if (subProducts.length)
      setShowcase(productSubs);
      groupstack.current.push({ ...item, showcaseType: showcaseTypes.productSub });
      // return;
    }
    setIsLoading(false);
  };

  const popFromGroupstack = async (count) => {
    setIsLoading(true);
    for (let i = 0; i < count; i++) groupstack.current.pop();

    // let details=(groupstack.current[groupstack.current.length-1]).details;
    let details = await dp.selectTable("ProductGroup", `where ParentId = ${groupstack.current[groupstack.current.length - 1].id}`);
    if (details.length) setShowcase(details);

    setIsLoading(false);
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
      <Content contentContainerStyle={{ flex: 1 }}>
        <View style={{ alignItems: "flex-end", padding: 10, justifyContent: "flex-end" }}>
          <FlatList
            contentContainerStyle={{ alignItems: "center" }}
            horizontal={true}
            ItemSeparatorComponent={() => (
              <FontAwesome5
                name='chevron-left'
                size={12}
                color={rxGlobal.globalColors.breadcrumpSeparator}
                style={{ alignSelf: "center", marginHorizontal: 10 }}
              />
            )}
            data={[...groupstack.current].reverse()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  if (index) popFromGroupstack(index);
                }}>
                <Text>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {isLoading ? (
          <Spinner color={rxGlobal.globalColors.spinner} size={72} style={{ flex: 1 }} />
        ) : presentShowcaseType === showcaseTypes.productGroup ? (
          <ProductGroupShowcase data={showcase} onPress={pushToGroupstack} />
        ) : presentShowcaseType === showcaseTypes.product ? (
          <ProductShowcase data={showcase} onPress={pushToGroupstack} />
        ) : (
          <ProductSubShowcase data={showcase} onPress={pushToGroupstack} />
        )}
      </Content>
    </Container>
  );
}
