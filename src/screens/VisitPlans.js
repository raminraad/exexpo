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
  Separator
} from "native-base";
import { Icon, Divider, ListItem } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons'; 
import * as rxGlobal from "../lib/rxGlobal";
import * as calendarLib from "../lib/calendarLib";
import { Menu, MenuTrigger, MenuOptions, MenuOption } from "react-native-popup-menu";
import DefaultHeader from "../components/DefaultHeader";
import * as dp from "../lib/sqliteDp";
import { openDatabase } from "expo-sqlite";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import { LinearGradient } from "expo-linear-gradient";
import * as storageLib from "../lib/storageLib";
import * as toastLib from "../lib/toastLib";
import NetInfo from "@react-native-community/netinfo";


export default function VisitPlans({ navigation, route }) {
  const [rawData, setRawData] = useState([]);
  const [isOnInstantFilter, setIsOnInstantFilter] = useState(false);
  const [isOnAdvancedFilter, setisOnAdvancedFilter] = useState(false);
  const [instantFilterText, setInstantFilterText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ctor();
  }, []);

  const { title } = route.params;

  const ctor = async () => {

    

    try {
      setIsLoading(true);
      if (global.dev.useFakeData) {
        let result = require("../dev/visitPlanData.json");
        if (result && result.d.DataTables.UserVisitPlan.length) {
          console.log(`👍 dev data loaded. count: {result.d.DataTables.UserVisitPlan.length}`);
          await setRawData(result.d.DataTables.UserVisitPlan);
          console.log(JSON.stringify(rawData));
        }
      } else await load();
    } catch (err) {
      
    } finally {setIsLoading(false);}
  };

  const load = async () => {
    const db = openDatabase("db");
    let pr = new Promise((resolve, reject) => {
      let query = `select * from UserVisitPlan limit 1`;
      db.transaction((tx) => {
        tx.executeSql(
          query,
          [],
          (_, { rows: { _array } }) => {
            console.log(`👍 ${query} => length: ${_array.length} => ${JSON.stringify([..._array])}`);
            for (let i = 0; i < _array.length; i++) _array[i].rxKey = i + 1;
            setRawData(_array);
            resolve();
          },
          (transaction, error) => {
            console.log(`❌ ${query} => ${error}`);
            reject();
          }
        );
      });
    });

    return pr;
  };

  const syncData = async () => {
    setIsLoading(true);
    await dp.syncVisitPlanData();
    await load();
    setIsLoading(false);
    toastLib.error(rxGlobal.globalLiterals.alerts.syncDone);
  };

  const confirmAndSyncData =async () => {

    if (await NetInfo.fetch().then((state) => state.isConnected)) {
      Alert.alert(
        "",
        rxGlobal.globalLiterals.Confirmations.syncData,
        [
          {
            text: rxGlobal.globalLiterals.buttonTexts.yes,
            onPress: syncData,
          },
          {
            text: rxGlobal.globalLiterals.buttonTexts.no,
          },
        ],
        { cancelable: true }
      );
    }
    else{
      toastLib.error(rxGlobal.globalLiterals.actionAndStateErrors.noInternetError);
    }
  };

  const onListItemNavigateForward = (item)=>{
    navigation.navigate("VisitPlanCustomers", {
      title: `مشتریان هدف در تاریخ ${calendarLib.toShortPersian(item.OperationDate)}`,
      initialItem: item,
    })
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
            containerStyle={[rxGlobal.globalStyles.shadowedContainer,rxGlobal.globalStyles.listItemHeaderContainer]}
              Component={TouchableScale}
              key={item.rxKey}
              friction={90} //
              tension={100} // These props are passed to the parent component (here TouchableScale)
              activeScale={0.95} //
              linearGradientProps={rxGlobal.globalColors.gradients.listItem}
              title={`⚡ ${item.Summary}`}
              titleStyle={rxGlobal.globalStyles.listItemTitle}
              subtitle={`تاریخ پویش:  ${calendarLib.toLongPersian(item.OperationDate)}`}
              subtitleStyle={{...rxGlobal.globalStyles.listItemTitle,color:rxGlobal.globalColors.listItemSubtitleText,marginRight:22}}
              leftElement={<TouchableOpacity style={{alignSelf:'stretch',flex:0.1,justifyContent:'center'}} onPress={()=>onListItemNavigateForward(item)}>
                <Entypo 
                  name='chevron-thin-left' 
                  size={rxGlobal.globalSizes.icons.small} 
                  color={rxGlobal.globalColors.listItemTitleText}/>
              </TouchableOpacity>}
            />
          
        ))}
      </Content>
      {renderFooter()}
    </Container>
  );
}
