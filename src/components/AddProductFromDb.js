import React, { Component, useRef, useEffect, useState, useCallback, useContext } from "react";
import { Container, Header, Item, Input, Icon, Button, Text, Content, Grid, Spinner } from "native-base";
import { Entypo, FontAwesome5, Feather } from "@expo/vector-icons";
import { View, BackHandler, StyleSheet, Alert } from "react-native";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { ListItem } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import ProductShowcase from "./ProductShowcase";
import ProductGroupShowcase from "./ProductGroupShowcase";
import ProductSubShowcase from "./ProductSubShowcase";
import { useFocusEffect } from "@react-navigation/native";
import VisitPlanResultContext from "../contexts/VisitPlanResultContext";
import * as rxGlobal from "../lib/rxGlobal";
import * as dp from "../lib/sqliteProvider";
import * as toastLib from "../lib/toastLib";
import * as enums from "../lib/enums";

export default function SearchBarExample(props) {
  const groupstack = useRef([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isProductSubAddingOnProgress, setIsProductSubAddingOnProgress] = useState(false)
  // const [groupstack, setGroupstack] = useState([null]);
  const [showcase, setShowcase] = useState([]);
  const showcaseTypes = Object.freeze({ productGroup: 1, product: 2, productSub: 3 });
  const visitPlanResultContext = useContext(VisitPlanResultContext);

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
    if (presentShowcaseType === showcaseTypes.productGroup) return <ProductGroupShowcase data={showcase} onConfirm={pushToGroupstack} />;
    else if (presentShowcaseType === showcaseTypes.product) return <ProductShowcase data={showcase} onConfirm={pushToGroupstack} />;
    else return <ProductSubShowcase data={showcase} onConfirm={addProductSubToVisitPlanResultList} isAdding={isProductSubAddingOnProgress}/>;
  };

const copyProductSubToVisitResultItem =(productSub,Result)=>{
  Result.ProductSubId=productSub.Id;
Result.SellPrice=productSub.PriceValue;
Result.Weight=productSub.MeasurmentScale;
Result.ShelfVisibleCount=productSub.ShelfVisibleCount;
};

  const addProductSubToVisitPlanResultList = async (productSubItem) => {
    setIsProductSubAddingOnProgress(true);
    try {
      console.log(`🏁 [AddProductFromDb.addProductSubToVisitPlanResultList]`);
      console.log(`💬 [AddProductFromDb.addProductSubToVisitPlanResultList] clonning context value: ${JSON.stringify(visitPlanResultContext.value)}`);
      let clone = { ...visitPlanResultContext.value };
      console.log(`💬 [AddProductFromDb.addProductSubToVisitPlanResultList] clonned context value: ${JSON.stringify(clone)}`);
      let existingItemId = clone.visitPlanResults.findIndex((r) => r.ProductSubId === productSubItem.Id);
      console.log(`💬 [AddProductFromDb.addProductSubToVisitPlanResultList] searching for Id of ${productSubItem.Id} resulted to index of ${existingItemId}`);

      let productGroupTitles = [];
      for (let i = 0; i < groupstack.current.length - 1; i++) productGroupTitles.push(groupstack.current[i].title);
      let productTitle = groupstack.current[groupstack.current.length - 1].title;

      if (existingItemId !== -1) {
        console.log(`A`)
        let newResultItem = { ...clone.visitPlanResults[existingItemId] };
        console.log(`B : ${newResultItem}`)
        newResultItem.productGroupTitles = productGroupTitles;
        newResultItem.productTitle = productTitle;
        copyProductSubToVisitResultItem(productSubItem,newResultItem);

        if (clone.visitPlanResults[existingItemId].rxSync !== enums.syncStatuses.deleted) {
          Alert.alert(
            "",
            rxGlobal.globalLiterals.Confirmations.replaceTempVisitPlanResult,
            [
              {
                text: rxGlobal.globalLiterals.buttonTexts.yes,
                onPress: () => {
                  if (
                    clone.visitPlanResults[existingItemId].rxSync === enums.syncStatuses.synced ||
                    clone.visitPlanResults[existingItemId].rxSync === enums.syncStatuses.modified
                  )
                    newResultItem.rxSync = enums.syncStatuses.modified;
                  else if (clone.visitPlanResults[existingItemId].rxSync === enums.syncStatuses.created) newResultItem.rxSync = enums.syncStatuses.created;
                  console.log(`💬 [AddProductFromDb.addProductSubToVisitPlanResultList] item exists.. replacing item with: ${JSON.stringify(newResultItem)}`);
                  clone.visitPlanResults[existingItemId] = newResultItem;
                  visitPlanResultContext.setValue(clone);
                  toastLib.success(rxGlobal.globalLiterals.alerts.visitPlanResultItemAdded, 3500);
                },
              },
              {
                text: rxGlobal.globalLiterals.buttonTexts.no,
              },
            ],
            { cancelable: false }
          );
        } else {
          newResultItem.rxSync = enums.syncStatuses.modified;
          console.log(`💬 [AddProductFromDb.addProductSubToVisitPlanResultList] item exists with 'DELETED' rxSync.. replacing item with: ${JSON.stringify(newResultItem)}`);
          clone.visitPlanResults[existingItemId] = newResultItem;
          visitPlanResultContext.setValue(clone);
          toastLib.success(rxGlobal.globalLiterals.alerts.visitPlanResultItemAdded, 3500);
        }
      } else {
        let newResultItem = {
          Id: null,
          VisitPlanCustomerId:visitPlanResultContext.value.visitPlanCustomer.Id,
          rxKey:
            Math.max.apply(
              Math,
              clone.visitPlanResults.map(function (o) {
                return o.rxKey;
              })
            ) + 1,
          rxSync: enums.syncStatuses.created,
          SellPrice: productSubItem.PriceValue,
          PriceType: productSubItem.PriceType,
          Weight: productSubItem.MeasurmentScale,
          MeasurmentType: productSubItem.MeasurmentType,
          ShelfVisibleCount:productSubItem.ShelfVisibleCount,
          productGroupTitles: productGroupTitles,
          productTitle: productTitle,
        };
        console.log(`💬 [AddProductFromDb.addProductSubToVisitPlanResultList] item doesn't exist. pushing productSubItem: ${JSON.stringify(productSubItem)}`);
        console.log(`💬 [AddProductFromDb.addProductSubToVisitPlanResultList] converted productSub : ${JSON.stringify(productSubItem)}`);
        
        clone.visitPlanResults.push(newResultItem);
        visitPlanResultContext.setValue(clone);
        toastLib.success(rxGlobal.globalLiterals.alerts.visitPlanResultItemAdded, 3500);
      }
    } catch (err) {
      console.log(`❌ [AddProductFromDb.addProductSubToVisitPlanResultList] : ${err}`);
    }
    setIsProductSubAddingOnProgress(false);
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
        <View style={{ alignItems: "flex-end", padding: 10, marginRight: 7, justifyContent: "flex-end" }}>
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
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  if (index) popFromGroupstack(index);
                }}>
                <Text style={item.showcaseType === showcaseTypes.productSub ? rxGlobal.globalStyles.breadCrumpLevel2 : rxGlobal.globalStyles.breadCrumpLevel1}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {isLoading ? <Spinner color={rxGlobal.globalColors.spinner} size={72} style={{ flex: 1 }} /> : renderShowcase()}
      </Content>
    </Container>
  );
}
