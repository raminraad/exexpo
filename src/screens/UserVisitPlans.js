import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Alert, TouchableOpacity } from "react-native";
import {
  Container,
  Card,
  CardItem,
  Body,
  Header,
  Content,
  Left,
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
  Toast,
} from "native-base";
import { Icon, Divider, ListItem } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as rxGlobal from "../lib/rxGlobal";
import * as calendarLib from "../lib/calendarLib";
import { Menu, MenuTrigger, MenuOptions, MenuOption } from "react-native-popup-menu";
import DefaultHeader from "../components/DefaultHeader";
import * as dp from "../lib/sqliteProvider";
import * as wp from "../lib/webProvider";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import { LinearGradient } from "expo-linear-gradient";
import * as toastLib from "../lib/toastLib";
import NetInfo from "@react-native-community/netinfo";
import * as enums from "../lib/enums";
import { StackActions } from "@react-navigation/native";
import { webError, appError } from "../lib/errors";

export default function UserVisitPlan(props) {
  const [rawData, setRawData] = useState([]);
  const [isOnInstantFilter, setIsOnInstantFilter] = useState(false);
  const [isOnAdvancedFilter, setisOnAdvancedFilter] = useState(false);
  const [instantFilterText, setInstantFilterText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { navigation } = props;
  const { route } = props;
  const { title } = route.params;

  useEffect(() => {
    ctor();
  }, []);

  const ctor = async () => {
    console.log(`🏁 [UserVisitPlans.ctor]`);
    try {
      setIsLoading(true);
      if (global.dev.useFakeData) {
        let result = require("../dev/visitPlanData.json");
        if (result && result.d.DataTables.UserVisitPlan.length) {
          console.log(`👍 dev data loaded. count: ${result.d.DataTables.UserVisitPlan.length}`);
          await setRawData(result.d.DataTables.UserVisitPlan);
          console.log(JSON.stringify(rawData));
        }
      } else if (await dp.tableExists("UserVisitPlan")) {
        await syncClient();
      } else {
        await dp.dropTables();
        await dp.createTables();
        await syncServer();
      }
    } catch (err) {
      switch (err.code) {
        case enums.authErrors.tokenExpired:
          navigation.dispatch(StackActions.replace("Login"));
          toastLib.error(err.message);
          break;
        default:
          toastLib.error(err.message);
          break;
      }
      console.log(`❌ [UserVisitPlans.ctor] ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const syncClient = async () => {
    try {
      toastLib.message(rxGlobal.globalLiterals.progress.synchingClientData, 6000);
      if (await wp.checkNet()) {
        console.log(`🏁 [UserVisitPlans.syncClient]`);
        toastLib.message(rxGlobal.globalLiterals.progress.creatingPostData);
        let dbData = await dp.selectTablesNotSynched();
        console.log(`💬 [UserVisitPlans.syncClient] dbData: ${JSON.stringify(dbData)}`);

        toastLib.message(rxGlobal.globalLiterals.progress.synchingClientData);
        let serverDataToSync = await wp.syncClientData(dbData);
        toastLib.message(rxGlobal.globalLiterals.progress.synchingDbData);

        await dp.syncData(serverDataToSync.DataTables);
        toastLib.message(rxGlobal.globalLiterals.progress.preparingPresentationData);
        setRawData(await dp.selectTable("UserVisitPlan"));
        toastLib.success(rxGlobal.globalLiterals.alerts.syncClientDataDone);
        console.log(`👍 [UserVisitPlans.syncClient] rawData: ${JSON.stringify(rawData)}`);

        toastLib.success(rxGlobal.globalLiterals.alerts.syncClientDataDone);
      } else {
        throw new webError(enums.webErrors.noInternetError, rxGlobal.globalLiterals.actionAndStateErrors.noInternetError);
      }
    } catch (err) {
      console.log(`❌ [UserVisitPlans.syncClient] ${JSON.stringify(err)}`);
      throw err;
    }
  };

  const syncServer = async () => {
    try {
      toastLib.message(rxGlobal.globalLiterals.progress.synchingServerData, 6000);
      if (wp.checkNet()) {
        console.log(`🏁 [UserVisitPlans.syncServer]`);
        let serverData = await wp.syncServerData();
        if (serverData?.DataTables && (await dp.insertData(serverData.DataTables))) {
          setRawData(await dp.selectTable("UserVisitPlan"));
          toastLib.success(rxGlobal.globalLiterals.alerts.syncServerDataDone);
          console.log(`👍 [UserVisitPlans.syncServer] rawData: ${global.dev.verbose ? JSON.stringify(rawData) : "--verbose"}`);
        } else {
          throw new appError(enums.appErrors.syncServerFailed, rxGlobal.globalLiterals.actionAndStateErrors.syncServerFailed);
        }
      } else {
        throw new webError(enums.webErrors.noInternetError, rxGlobal.globalLiterals.actionAndStateErrors.noInternetError);
      }
    } catch (err) {
      console.log(`❌ [UserVisitPlans.syncServer] ${err}`);
      throw err;
    }
  };

  const confirmAndSyncData = async () => {
    Alert.alert(
      "",
      rxGlobal.globalLiterals.Confirmations.syncClientData,
      [
        {
          text: rxGlobal.globalLiterals.buttonTexts.yes,
          onPress: syncClient,
        },
        {
          text: rxGlobal.globalLiterals.buttonTexts.no,
        },
      ],
      { cancelable: true }
    );
  };

  const onListItemNavigateForward = (item) => {
    navigation.navigate("VisitPlanCustomers", {
      title: `مشتریان هدف در تاریخ ${calendarLib.toShortPersian(item.OperationDate)}`,
      initialItem: item,
    });
  };

  const renderHeader = () => (
    <DefaultHeader
      title={title}
      isOnInstantFilter={isOnInstantFilter}
      setIsOnInstantFilter={setIsOnInstantFilter}
      setInstantFilterText={setInstantFilterText}
      setisOnAdvancedFilter={setisOnAdvancedFilter}
      navigation={navigation}
      leftElementIsVisible={false}
    />
  );
  const renderFooter = () => (
    <Footer>
      <FooterTab style={{ justifyContent: "center", alignItems: "center" }}>
        {isLoading ? (
          <Spinner color='white' />
        ) : (
          <Button onPress={confirmAndSyncData}>
            <Feather name='refresh-ccw' size={rxGlobal.globalSizes.icons.large} color={rxGlobal.globalColors.palette.cream} />
          </Button>
        )}
      </FooterTab>
      <FooterTab>
        {/* todo: implement search and set button visible */}
        {/* <Button onPress={() => setIsOnInstantFilter(true)}>
          <Feather name='search' size={rxGlobal.globalSizes.icons.large} color={rxGlobal.globalColors.palette.cream} />
        </Button> */}
      </FooterTab>
      <FooterTab style={{ alignSelf: "center", justifyContent: "center" }}>
        <Menu>
          <MenuTrigger
            // todo: set items and remove disabled
            disabled={true}
            children={<Feather color={rxGlobal.globalColors.palette.cream} name={"star"} size={rxGlobal.globalSizes.icons.large} />}
          />
          <MenuOptions customStyles={rxGlobal.menuOptionsCustomStyles}></MenuOptions>
        </Menu>
      </FooterTab>
    </Footer>
  );
  return (
    <Container backgroundColor={rxGlobal.globalColors.screenContainer}>
      <Content>
        {renderHeader()}
        {/* <FlatList
          keyExtractor={keyExtractor}
          //TODO: get data from a method that performs instant and advanced filter
          data={presentationalData}
          renderItem={renderItem}
        /> */}

        {rawData.map((item, i) => (
          <ListItem
            containerStyle={[rxGlobal.globalStyles.shadowedContainer, rxGlobal.globalStyles.listItemHeaderContainer]}
            Component={TouchableScale}
            key={item.rxKey}
            friction={90} //
            tension={100} // These props are passed to the parent component (here TouchableScale)
            activeScale={0.95} //
            linearGradientProps={rxGlobal.globalColors.gradients.listItem}
            title={`⚡ ${item.Summary}`}
            titleStyle={rxGlobal.globalStyles.listItemTitle}
            subtitle={`تاریخ پویش:  ${calendarLib.toLongPersian(item.OperationDate)}`}
            subtitleStyle={{ ...rxGlobal.globalStyles.listItemTitle, color: rxGlobal.globalColors.listItemSubtitleText, marginRight: 22 }}
            leftElement={
              <TouchableOpacity style={{ alignSelf: "stretch", flex: 0.1, justifyContent: "center" }} onPress={() => onListItemNavigateForward(item)}>
                <Entypo name='chevron-thin-left' size={rxGlobal.globalSizes.icons.small} color={rxGlobal.globalColors.listItemTitleText} />
              </TouchableOpacity>
            }
          />
        ))}
      </Content>
      {renderFooter()}
    </Container>
  );
}
