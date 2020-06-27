import React, { Component, useRef, useEffect, useState, useCallback } from "react";
import { Container, Header, Item, Input, Icon, Button, Text, Content, Grid, Spinner } from "native-base";
import { Entypo, FontAwesome5, Feather } from "@expo/vector-icons";
import * as rxGlobal from "../lib/rxGlobal";
import { View, BackHandler, StyleSheet } from "react-native";
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
    console.log(`START METHOD: pushToGroupstack`);
    setIsLoading(true);

    let presentShowcaseType = groupstack.current.length ? groupstack.current[groupstack.current.length - 1].showcaseType : showcaseTypes.productGroup;

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
    console.log(`🏁 [AddProductFromDb.popFromGroupstack]`);
    console.log(`💬 [AddProductFromDb.popFromGroupstack] popping ${count} item(s) from stack with length of :[${groupstack.current.length}]`);
    
    setIsLoading(true);
    // if (count===0) groupstack.current.clear();
    for (let i = 0; i < count; i++) groupstack.current.pop();
    console.log(`💬 [AddProductFromDb.popFromGroupstack] popped ${count} item(s) from stack. current length of stack: [${groupstack.current.length}]`);
    let top = groupstack.current[groupstack.current.length - 1];
    if (top.showcaseType === showcaseTypes.productGroup) setShowcase(await dp.selectTable("ProductGroup", `where ParentId = ${top.id}`));
    else if (top.showcaseType === showcaseTypes.product) setShowcase(await dp.selectTable("Product", `where ProductGroupId = ${top.id}`));

    setIsLoading(false);
  };

  const renderShowcase = () => {
    console.log(`START METHOD: renderShowcase`);

    let presentShowcaseType = groupstack.current.length ? groupstack.current[groupstack.current.length - 1].showcaseType : showcaseTypes.productGroup;
    if (presentShowcaseType === showcaseTypes.productGroup) return <ProductGroupShowcase data={showcase} onPress={pushToGroupstack} />;
    else if (presentShowcaseType === showcaseTypes.product) return <ProductShowcase data={showcase} onPress={pushToGroupstack} />;
    else return <ProductSubShowcase data={showcase} onPress={pushToGroupstack} />;
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
        <View style={{ alignItems: "flex-end", padding: 10,marginRight:7, justifyContent: "flex-end" }}>
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
            keyExtractor={(item,index)=>index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  if (index) popFromGroupstack(index);
                }}>
                <Text style={item.showcaseType === showcaseTypes.productSub ? styles.breadCrumpLevel2 : styles.breadCrumpLevel1}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {isLoading ? <Spinner color={rxGlobal.globalColors.spinner} size={72} style={{ flex: 1 }} /> : renderShowcase()}
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  breadCrumpLevel1: { color: rxGlobal.globalColors.breadcrumpLevel1 },
  breadCrumpLevel2: { color: rxGlobal.globalColors.breadcrumpLevel2 ,fontWeight:'bold'},
});
