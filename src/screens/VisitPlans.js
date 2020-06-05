import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import {
  Container,
  Card,
  CardItem,
  Body,
  Header,
  Content,
  Left,
  List,
  ListItem,
  Right,
  Text,
  Title,
  Button,
  Accordion,
  View,
  Footer,
  FooterTab,
  Item,
  Input,
  Spinner,
  Separator,
} from "native-base";
import { Icon, Divider } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { globalStyles, globalColors, globalSizes, menuOptionsCustomStyles } from "../lib/rxGlobal";
import * as persianLib from "../lib/persianLib";
import { Menu, MenuTrigger, MenuOptions, MenuOption } from "react-native-popup-menu";
import DefaultHeader from "../components/DefaultHeader";
import * as dp from "../lib/sqliteDp";
import * as visitPlanDp from "../lib/visitPlanSqliteDb";
import { openDatabase } from "expo-sqlite";

export default function VisitPlans({ navigation, route }) {
  const [rawData, setRawData] = useState([]);
  const [presentationalData, setPresentationalData] = useState([]);
  const [isOnInstantFilter, setIsOnInstantFilter] = useState(false);
  const [isOnAdvancedFilter, setisOnAdvancedFilter] = useState(false);
  const [instantFilterText, setInstantFilterText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const authToken=global.authToken;

  useEffect(() => {
    //xxx: uncomment ctor
    ctor();
  }, []);

  const { title } = route.params;

  const ctor = async () => {
    if (global.xxx) {
      let result = require("../dev/visitPlanData.json");
      if (result && result.d.DataTables.UserVisitPlan.length) {
        console.log(`☺☺ dev data loaded. count: {result.d.DataTables.UserVisitPlan.length}`);
        await setRawData(result.d);
        await setPresentationalData(result.d.DataTables.UserVisitPlan);
      }
    } else await pullData();
  };

  const commitData = async (DataTables) => {
    console.log("☺☺ commit started..");
    const db = openDatabase("db");

    let queries = [];
    for (const item of DataTables.ProductGroup) {
      let parameters = [item.Id, item.ParentId, item.ProductGroupCode, item.Title, item.LastModifiedDate, item.SyncStatus];
      let query = `insert into ProductGroup (Id,ParentId,ProductGroupCode,Title,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?)`;
      queries.push({ sql: `${query};`, args: parameters });
    }

    for (const item of DataTables.Product) {
      let parameters = [item.Id, item.ProductGroupId, item.ProductCode, item.Taste, item.LastModifiedDate, item.SyncStatus];
      let query = `insert into Product (Id,ProductGroupId,ProductCode,Taste,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?)`;
      queries.push({ sql: `${query};`, args: parameters });
    }

    for (const item of DataTables.ProductSub) {
      let parameters = [
        item.Id,
        item.ProductId,
        item.BarCode,
        item.IranCode,
        item.Color,
        item.Language,
        item.PriceType,
        item.PriceValue,
        item.MeasurmentType,
        item.MeasurmentScale,
        item.LastModifiedDate,
        item.SyncStatus,
      ];
      let query = `insert into ProductSub (Id,ProductId,BarCode,IranCode,Color,Language,PriceType,PriceValue,MeasurmentType,MeasurmentScale,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?,?,?,?,?,?,?)`;

      queries.push({ sql: `${query};`, args: parameters });
    }

    for (const item of DataTables.UserVisitPlan) {
      let parameters = [item.Id, item.Summary, item.OperationDate, item.DateX, item.LastModifiedDate, item.SyncStatus];
      let query = `insert into UserVisitPlan (Id,Summary,OperationDate,DateX,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?)`;
      queries.push({ sql: `${query};`, args: parameters });
    }

    for (const item of DataTables.VisitPlanCustomers) {
      let parameters = [
        item.Id,
        item.VisitPlanId,
        item.CustomerId,
        item.Code,
        item.Title,
        item.Owner,
        item.Long,
        item.Lat,
        item.Type,
        item.Address,
        item.Phone,
        item.Cell,
        item.Vol,
        item.ResultAttachedFileTitle,
        item.ResultSummary,
        item.ResultStatus,
        item.ResultVisitedDate,
        item.LastModifiedDate,
        item.SyncStatus,
      ];

      let query = `insert into VisitPlanCustomers (Id,VisitPlanId,CustomerId,Code,Title,Owner,Long,Lat,Type,Address,Phone,Cell,Vol,ResultAttachedFileTitle,ResultSummary,ResultStatus,ResultVisitedDate,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
      queries.push({ sql: `${query};`, args: parameters });
    }

    for (const item of DataTables.VisitPlanResults) {
      let parameters = [
        item.Id,
        item.VisitPlanCustomerId,
        item.ProductSubId,
        item.SellPrice,
        item.Weight,
        item.HasInventory,
        item.ShelfInventoryCount,
        item.ShelfVisibleCount,
        item.WarehouseInventoryCount,
        item.VerbalPurchaseCount,
        item.FactorPurchaseCount,
        item.LastModifiedDate,
        item.SyncStatus,
      ];
      let query = `insert into VisitPlanResults (Id,VisitPlanCustomerId,ProductSubId,SellPrice,Weight,HasInventory,ShelfInventoryCount,ShelfVisibleCount,WarehouseInventoryCount,VerbalPurchaseCount,FactorPurchaseCount,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
      queries.push({ sql: `${query};`, args: parameters });
    }
    db.exec(queries, false, () => console.log(`☺☺ insert queries executed successfully..`));

    console.log("☺☺ last line of commit executed");
  };
  const pullData = () => {
    console.log("☺☺ pull data started");
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    var raw = { token: `${authToken}` };
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(raw),
      redirect: "follow",
    };
    console.log(`☺☺ request sent with token: ${authToken}`);
    fetch("http://audit.mazmaz.net/Api/WebApi.asmx/SyncServerData", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.d.Response.Token) {
          setRawData(result.d);
          return result;
        } else throw new Error(result.d.Response.Message);
      })
      .then((result) => {
        setPresentationalData(result.d.DataTables.UserVisitPlan);
        return result;
      })
      .then((result) => {
        let renewPromise = new Promise((resolve, reject) => {
          dp.renewTables(resolve, reject, result);
        });
        return renewPromise.then(result);
      })
      .then((result) => {
        commitData(result.d.DataTables);
      })
      .then((result) => {
        console.log(`☺☺ last "then" executed`);
      })
      .catch((error) => alert(error))
      .finally(() => setIsLoading(false));
  };

  const keyExtractor = (item, index) => item.Id.toString();
  const renderItem = ({ item, index }) => {
    let renderItemHeader = (item, expanded) => {
      return (
        <View style={globalStyles.listItemHeaderContainer}>
          <Feather
            name={expanded ? "chevrons-down" : "chevrons-left"}
            size={24}
            style={globalStyles.listItemHeaderCollapseIcon}
            color={expanded ? globalColors.listItemCollapseIcon : globalColors.listItemExpandIcon}
          />
          <View style={globalStyles.listItemHeaderInnerTextContainer}>
            <View style={{ ...globalStyles.listItemHeaderFieldContainer }}>
              <Text style={globalStyles.listItemHeaderFieldTitle}>برنامه پویش</Text>
              <Text style={globalStyles.listItemHeaderFieldData}>{persianLib.toShortDate(new Date(item.OperationDate))}</Text>
            </View>
          </View>
          <View style={globalStyles.shadowedContainer}>
            <FontAwesome5.Button
              name='user'
              backgroundColor={globalColors.listItemNavigateIconUndone}
              onPress={() =>
                navigation.push("VisitPlanCustomers", {
                  title: `مشتریان هدف در تاریخ ${persianLib.toShortDate(new Date(item.OperationDate))}`,
                  initialItem: item,
                  // customersRawData: rawData.DataTables.VisitPlanCustomers.filter((plan) => plan.VisitPlanId == item.Id),
                  // visitPlanResultsRawData : rawData.DataTables.VisitPlanResults,
                })
              }>
              مشتریان
            </FontAwesome5.Button>
          </View>
        </View>
      );
    };
    let renderItemContent = (item) => {
      return (
        <View style={globalStyles.listItemContentContainer}>
          <View style={globalStyles.listItemContentRow}>
            <MaterialIcons name='description' size={globalSizes.icons.small} backgroundColor='red' color='grey' />
            <Text style={globalStyles.listItemContentFieldData}>{item.Summary ? item.Summary : "وارد نشده"}</Text>
          </View>
        </View>
      );
    };

    let SwipeLeftAction = () => {
      return (
        <View style={globalStyles.listItemSwipeLeftContainer}>
          <FontAwesome5
            name='trash-alt'
            // todo: implement update functionality
            onPress={() => console.warn("delete")}
            size={globalSizes.icons.medium}
            color={globalColors.btnDelete}
          />
          <Separator backgroundColor={globalColors.listItemSwipeLeftContainer} />
          <FontAwesome5
            name='edit'
            // todo: implement update functionality
            onPress={() => console.warn("edit")}
            size={globalSizes.icons.medium}
            color={globalColors.btnUpdate}
          />
          <Separator backgroundColor={globalColors.listItemSwipeLeftContainer} />
        </View>
      );
    };
    return (
      <Swipeable renderLeftActions={SwipeLeftAction}>
        <Accordion dataArray={[item]} renderContent={renderItemContent} renderHeader={renderItemHeader} />
      </Swipeable>
    );
  };
  const renderHeader = () => (
    <DefaultHeader
      title={title}
      isOnInstantFilter={isOnInstantFilter}
      setIsOnInstantFilter={setIsOnInstantFilter}
      setInstantFilterText={setInstantFilterText}
      setisOnAdvancedFilter={setisOnAdvancedFilter}
      navigation={navigation}
    />
  );
  const renderFooter = () => (
    <Footer>
      <FooterTab style={{ justifyContent: "center", alignItems: "center" }}>
        {isLoading ? (
          <Spinner color='white' />
        ) : (
          <Button onPress={pullData}>
            <Feather name='refresh-ccw' size={globalSizes.icons.large} color={globalColors.palette.cream} />
          </Button>
        )}
      </FooterTab>
      <FooterTab>
        <Button onPress={() => setIsOnInstantFilter(true)}>
          <Feather name='search' size={globalSizes.icons.large} color={globalColors.palette.cream} />
        </Button>
      </FooterTab>
      <FooterTab style={{ alignSelf: "center", justifyContent: "center" }}>
        <Menu>
          <MenuTrigger
            // todo: set items and remove disabled
            disabled={true}
            children={<Feather color={globalColors.palette.cream} name={"star"} size={globalSizes.icons.large} />}
          />
          <MenuOptions customStyles={menuOptionsCustomStyles}></MenuOptions>
        </Menu>
      </FooterTab>
    </Footer>
  );
  return (
    <Container>
      {renderHeader()}
      <FlatList
        keyExtractor={keyExtractor}
        //TODO: get data from a method that performs instant and advanced filter
        data={presentationalData}
        renderItem={renderItem}
      />
      {renderFooter()}
    </Container>
  );
}
