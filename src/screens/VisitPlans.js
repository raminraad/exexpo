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
} from "native-base";
import { Icon, Divider } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { globalStyles, globalColors, globalSizes, menuOptionsCustomStyles } from "../styles/global";
import * as persianLib from "../lib/persianLib";
import { Menu, MenuTrigger, MenuOptions, MenuOption } from "react-native-popup-menu";
import DefaultHeader from "../components/DefaultHeader";
import * as dp from "../lib/sqliteDp";
import * as visitPlanDp from "../lib/visitPlanSqliteDb";
import { openDatabase } from "expo-sqlite";


export default function VisitPlans({ navigation, route }) {
  const [rawData, setRawData] = useState([]);
  const [presentationalData, setPresentationalData] = useState([]);
  const [freshToken, setFreshToken] = useState(global.authToken);
  const [isOnInstantFilter, setIsOnInstantFilter] = useState(false);
  const [isOnAdvancedFilter, setisOnAdvancedFilter] = useState(false);
  const [instantFilterText, setInstantFilterText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // dp.renewTables();

    
    
    // const db = openDatabase("db");
    // db.transaction((tx) => {
    //   tx.executeSql(
    //     "select * from ProductGroup",
    //     [],
    //     (_, { rows: { _array } }) => {
          
    //       console.log(_array);

    //     },
    //     (transaction, error) => console.log(error)
    //   );
    // });



    //xxx: remove this
    // if (global.xxx) {
    //   let result = require("../dev/visitPlanData.json");
    //   if (result && result.d.DataTables.UserVisitPlan.length) {
    //     console.log(`dev data loaded. count: {result.d.DataTables.UserVisitPlan.length}`);
    //     setRawData(result.d);
    //     setPresentationalData(result.d.DataTables.UserVisitPlan);
    //   }
    // } 
    // else pullData();




    dp.getJoinedProducts();
    /////////////////////
  }, []);

  const { title } = route.params;
  const pullData = () => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    var raw = { token: `${freshToken}` };
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(raw),
      redirect: "follow",
    };
    console.log(`Request sent with token: ${freshToken}`);
    fetch("http://audit.mazmaz.net/Api/WebApi.asmx/SyncServerData", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.d.Response.Token) {
          setRawData(result.d);
          console.log(`fetched ${result.d.DataTables.UserVisitPlan.length} rows.`);

          

          for (const item of result.d.DataTables.ProductGroup)
              dp.insertProductGroup(item.Id, item.ParentId, item.ProductGroupCode, item.Title, item.LastModifiedDate, item.SyncStatus);

          for (const item of result.d.DataTables.Product)
            dp.insertProduct(item.Id, item.ProductGroupId, item.ProductCode, item.Taste, item.LastModifiedDate, item.SyncStatus);

          for (const item of result.d.DataTables.ProductSub)
            dp.insertProductSub(
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
              item.SyncStatus
            );

          for (const item of result.d.DataTables.UserVisitPlan)
            dp.insertUserVisitPlan(item.Id, item.Summary, item.OperationDate, item.DateX, item.LastModifiedDate, item.SyncStatus);

          for (const item of result.d.DataTables.VisitPlanCustomers)
            dp.insertVisitPlanCustomers(
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
              item.SyncStatus
            );

          for (const item of result.d.DataTables.VisitPlanResults)
            dp.insertVisitPlanResults(
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
              item.SyncStatus
            );

          return result.d.DataTables.UserVisitPlan;
        } else {
          alert(result.d.Response.Message);
          return null;
        }
      })
      .then((result) => {
        if (result) setPresentationalData(result);
      })
      .catch((error) => console.log("error", error))
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
              <Text style={globalStyles.listItemHeaderFieldTitle}>تاریخ بازدید:</Text>
              <Text style={globalStyles.listItemHeaderFieldData}>{persianLib.toShortDate(new Date(item.OperationDate))}</Text>
            </View>
            <View style={{ ...globalStyles.listItemHeaderFieldContainer }}>
              <Text style={globalStyles.listItemHeaderFieldTitle}>تاریخ ثبت:</Text>
              <Text style={globalStyles.listItemHeaderFieldData}>{persianLib.toShortDate(new Date(item.DateX))}</Text>
            </View>
          </View>
          <Button
            transparent
            style={globalStyles.listItemHeaderNavigateButton}
            onPress={() =>
              navigation.push("VisitPlanCustomers", {
                title: `مشتریان هدف در تاریخ ${persianLib.toShortDate(new Date(item.OperationDate))}`,
                rawData: rawData.DataTables.VisitPlanCustomers.filter((plan) => plan.VisitPlanId == item.Id),
                visitPlanId: item.Id,
              })
            }>
            <Feather name='user' size={globalSizes.icons.medium} color={globalColors.listItemNavigateIcon} />
          </Button>
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
          <Icon reverse name='trash' type='font-awesome' size={globalSizes.icons.small} color={globalColors.btnDelete} />
          <Icon reverse name='edit' type='font-awesome' size={globalSizes.icons.small} color={globalColors.btnUpdate} />
        </View>
      );
    };
    return (
      <Swipeable renderLeftActions={SwipeLeftAction}>
        <Accordion dataArray={[item]} renderContent={renderItemContent} renderHeader={renderItemHeader} />
      </Swipeable>
    );
  };

  return (
    <Container>
      <DefaultHeader
        title={title}
        isOnInstantFilter={isOnInstantFilter}
        setIsOnInstantFilter={setIsOnInstantFilter}
        setInstantFilterText={setInstantFilterText}
        setisOnAdvancedFilter={setisOnAdvancedFilter}
        navigation={navigation}
      />
      <Content padder>
        <FlatList
          keyExtractor={keyExtractor}
          //TODO: get data from a method that performs instant and advanced filter
          data={presentationalData}
          renderItem={renderItem}
        />
      </Content>

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
    </Container>
  );
}
