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
    } else await reload();
  };

  const reload =async () => {
    setIsLoading(true);
  const db = openDatabase("db");
    let pr = new Promise((resolve,reject)=>{
      let query = `select * from UserVisitPlan `;
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (_, { rows: { _array } }) => {
          console.log(`☺☺ ${query} => length: ${_array.length} => ${JSON.stringify([..._array])}`);
          for (let i = 0; i < _array.length; i++) _array[i].rxKey = i + 1;
          setPresentationalData(_array);
          resolve();
        },
        (transaction, error) => {alert(`☻☻ ${query} => ${error}`);reject();}
      );
    });
    });

    return pr.finally(()=>setIsLoading(false));
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
          <Button onPress={reload}>
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
