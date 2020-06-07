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
} from "native-base";
import { Icon, Divider, ListItem } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import Swipeable from "react-native-gesture-handler/Swipeable";
import { globalStyles, globalColors, globalSizes, menuOptionsCustomStyles, globalLiterals } from "../lib/rxGlobal";
import * as persianLib from "../lib/persianLib";
import { Menu, MenuTrigger, MenuOptions, MenuOption } from "react-native-popup-menu";
import DefaultHeader from "../components/DefaultHeader";
import * as dp from "../lib/sqliteDp";
import * as visitPlanDp from "../lib/visitPlanSqliteDb";
import { openDatabase } from "expo-sqlite";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import { LinearGradient } from "expo-linear-gradient";

export default function VisitPlans({ navigation, route }) {
  const [rawData, setRawData] = useState([]);
  const [presentationalData, setPresentationalData] = useState([]);
  const [isOnInstantFilter, setIsOnInstantFilter] = useState(false);
  const [isOnAdvancedFilter, setisOnAdvancedFilter] = useState(false);
  const [instantFilterText, setInstantFilterText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const authToken = global.authToken;

  useEffect(() => {
    //xxx: uncomment ctor
    ctor();
  }, []);

  const { title } = route.params;

  const ctor = async () => {
    setIsLoading(true);
    if (global.xxx) {
      let result = require("../dev/visitPlanData.json");
      if (result && result.d.DataTables.UserVisitPlan.length) {
        console.log(`☺☺ dev data loaded. count: {result.d.DataTables.UserVisitPlan.length}`);
        await setRawData(result.d);
        await setPresentationalData(result.d.DataTables.UserVisitPlan);
      }
    } else await reload();
    setIsLoading(false);
  };

  const reload = async () => {
    const db = openDatabase("db");
    let pr = new Promise((resolve, reject) => {
      let query = `select * from UserVisitPlan limit 1`;
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
          (transaction, error) => {
            alert(`☻☻ ${query} => ${error}`);
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
    await reload();
    setIsLoading(false);
    Alert.alert(
      "",
      globalLiterals.alerts.syncDone,
      [
        {
          text: globalLiterals.ButtonTexts.ok,
        },
      ],
      { cancelable: true }
    );
  };

  const confirmAndSyncData = () => {
    Alert.alert(
      "",
      globalLiterals.Confirmations.syncData,
      [
        {
          text: globalLiterals.ButtonTexts.yes,
          onPress: syncData,
        },
        {
          text: globalLiterals.ButtonTexts.no,
        },
      ],
      { cancelable: true }
    );
  };

  const onListItemNavigateForward = (item)=>{
    navigation.push("VisitPlanCustomers", {
      title: `مشتریان هدف در تاریخ ${persianLib.toShortDate(new Date(item.OperationDate))}`,
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
            <Feather name='refresh-ccw' size={globalSizes.icons.large} color={globalColors.palette.cream} />
          </Button>
        )}
      </FooterTab>
      <FooterTab>
        {/* todo: implement search and set button visible */}
        {/* <Button onPress={() => setIsOnInstantFilter(true)}>
          <Feather name='search' size={globalSizes.icons.large} color={globalColors.palette.cream} />
        </Button> */}
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
    <Container backgroundColor={globalColors.screenContainer}>
      <Content>
        {renderHeader()}
        {/* <FlatList
          keyExtractor={keyExtractor}
          //TODO: get data from a method that performs instant and advanced filter
          data={presentationalData}
          renderItem={renderItem}
        /> */}

        {presentationalData.map((item, i) => (
          
            <ListItem
            containerStyle={[globalStyles.shadowedContainer,globalStyles.listItemHeaderContainer]}
              Component={TouchableScale}
              key={item.rxKey}
              friction={90} //
              tension={100} // These props are passed to the parent component (here TouchableScale)
              activeScale={0.95} //
              linearGradientProps={globalColors.gradients.listItem}
              title={`⚡ ${item.Summary}`}
              titleStyle={globalStyles.listItemTitle}
              subtitle={`تاریخ پویش ${persianLib.toShortDate(new Date(item.OperationDate))}`}
              subtitleStyle={{...globalStyles.listItemTitle,color:globalColors.listItemSubtitleText,marginRight:22}}
              leftElement={<TouchableOpacity style={{alignSelf:'stretch',flex:0.1,justifyContent:'center'}} onPress={()=>onListItemNavigateForward(item)}>
                <Entypo 
                  name='chevron-thin-left' 
                  size={globalSizes.icons.small} 
                  color={globalColors.listItemTitleText}/>
              </TouchableOpacity>}
            />
          
        ))}
      </Content>
      {renderFooter()}
    </Container>
  );
}
