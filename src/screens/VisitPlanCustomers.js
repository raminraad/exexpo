import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Modal, Keyboard, TouchableWithoutFeedback, Alert } from "react-native";
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
import { Icon, Divider ,ListItem} from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons'; 
import Swipeable from "react-native-gesture-handler/Swipeable";
import { globalStyles, globalColors, globalSizes, globalLiterals, menuOptionsCustomStyles } from "../lib/rxGlobal";
import * as persianLib from "../lib/persianLib";
import { Menu, MenuTrigger, MenuOptions, MenuOption } from "react-native-popup-menu";
import DefaultHeader from "../components/DefaultHeader";
import VisitPlanResultForm from "../components/VisitPlanResultForm";
import * as dp from "../lib/sqliteDp";
import { openDatabase } from "expo-sqlite";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import { LinearGradient } from "expo-linear-gradient";

export default function VisitPlanCustomers(props) {
  const db = openDatabase("db");
  const yoyo = props.route.params.yoyo;
  const [presentationalData, setPresentationalData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [isOnInstantFilter, setIsOnInstantFilter] = useState(false);
  const [isOnAdvancedFilter, setisOnAdvancedFilter] = useState(false);
  const [isVisitModalVisible, SetIsVisitModalVisible] = useState(false);
  const [instantFilterText, setInstantFilterText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const reload = async () => {
    console.log("reload started");
    let pr = new Promise((resolve, reject) => {
      let query = `select * from VisitPlanCustomers where VisitPlanId = ${props.route.params.initialItem.Id}`;
      db.transaction((tx) => {
        tx.executeSql(
          query,
          [],
          (_, { rows: { _array } }) => {
            console.log(`☺☺ ${query} => length: ${_array.length} => ${JSON.stringify([..._array])}`);
            for (let i = 0; i < _array.length; i++) _array[i].rxKey = i + 1;
            console.log("set raw data");
            setRawData(_array);
            console.log("set presentation data");
            setPresentationalData(_array);
            resolve("reload done");
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

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (yoyo) await handleYoyo(yoyo);
      console.log(await reload());
      SetIsVisitModalVisible(false);
      setIsLoading(false);
    })();
  }, [props]);

  const { title } = props.route.params;

  const handleYoyo = async (yoyo) => {
    try {
      console.log("handle yoyo : 1");
      console.log(await dp.commitVisitPlanResult(yoyo));
      console.log("handle yoyo : 2");
      console.log("handle yoyo : 3");
    } catch (error) {
      alert(globalLiterals.actionErrors.saveError);
    }

    // let rawClone = [...rawData];
    // rawClone[rawClone.findIndex((r) => r.rxKey === yoyo.rxKey)] = yoyo;
    // setRawData(rawClone);
    // setPresentationalData(rawClone);
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
            <View style={{ ...globalStyles.listItemHeaderFieldContainer, flex: 2 }}>
              <Text style={globalStyles.listItemHeaderFieldTitle}>عنوان:</Text>
              <Text style={[globalStyles.listItemHeaderFieldData, { flex: 1 }]}>{item.Title}</Text>
            </View>
          </View>
          <View style={globalStyles.shadowedContainer}>
            <FontAwesome5.Button
              name='long-arrow-alt-left'
              backgroundColor={item.ResultStatus === 2 || !item.ResultStatus ? globalColors.listItemNavigateIconUndone : globalColors.listItemNavigateIconDone}
              onPress={() => {
                item.rxSync = 2;
                props.navigation.push("VisitPlanResultForm", {
                  title: `فروشگاه ${item.Title}`,
                  initialItem: item,
                });
              }}>
              پویش
            </FontAwesome5.Button>
          </View>
        </View>
      );
    };
    let renderItemContent = (item) => {
      return (
        <View style={globalStyles.listItemContentContainer}>
          <View style={globalStyles.listItemContentRow}>
            <Feather name='hash' size={globalSizes.icons.small} color='grey' />
            <Text style={globalStyles.listItemContentFieldData}>{item?.Code ?? "وارد نشده"}</Text>
          </View>

          <View style={globalStyles.listItemContentRow}>
            <Feather name='user' size={globalSizes.icons.small} color='grey' />
            <Text style={globalStyles.listItemContentFieldData}>{item.Owner ? item.Owner : "وارد نشده"}</Text>
          </View>

          <View style={globalStyles.listItemContentRow}>
            <Feather name='map-pin' size={globalSizes.icons.small} color='grey' />
            <Text style={globalStyles.listItemContentFieldData}>{item.Address ? item.Address : "وارد نشده"}</Text>
          </View>

          <View style={globalStyles.listItemContentRow}>
            <Feather name='phone' size={globalSizes.icons.small} color='grey' />
            <Text style={globalStyles.listItemContentFieldData}>{item.Phone ? item.Phone : "وارد نشده"}</Text>
          </View>

          <View style={globalStyles.listItemContentRow}>
            <Feather name='smartphone' size={globalSizes.icons.small} color='grey' />
            <Text style={globalStyles.listItemContentFieldData}>{item.Cell ? item.Cell : "وارد نشده"}</Text>
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

  return (
    <Container>
      <DefaultHeader
        title={title}
        isOnInstantFilter={isOnInstantFilter}
        setIsOnInstantFilter={setIsOnInstantFilter}
        setInstantFilterText={setInstantFilterText}
        setisOnAdvancedFilter={setisOnAdvancedFilter}
        navigation={props.navigation}
      />
      <Content>
      {/* TODO: get data from a method that performs instant and advanced filter */}
      {isLoading
        ? null
        : presentationalData.map((item, i) => (
            <View
              style={{
                borderWidth: StyleSheet.hairlineWidth,
                margin: StyleSheet.hairlineWidth,
              }}>
              <ListItem
                onPress={() => {
                  item.rxSync = 2;
                  props.navigation.push("VisitPlanResultForm", {
                    title: `فروشگاه ${item.Title}`,
                    initialItem: item,
                  });
                }}
                Component={TouchableScale}
                checkmark={item.ResultStatus !== 2 }
                key={item.rxKey}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95} //
                linearGradientProps={{
                  colors: ["#05668d", "#98c1d9"],
                  start: { x: 0.5, y: 0 },
                  end: { x: 0, y: 1 },
                }}
                title={item.Title}
                titleStyle={{ color: "white", fontWeight: "bold" }}
                subtitle={`تاریخ پویش ${persianLib.toShortDate(new Date(item.Owner))}`}
                leftElement={<Entypo name='chevron-thin-left' size={globalSizes.icons.small} color={globalColors.palette.cream} />}
              />
            </View>
          ))}
          </Content>
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
    </Container>
  );
}
