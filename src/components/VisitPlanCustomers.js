import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, FlatList, Modal, Keyboard, TouchableOpacity, TouchableWithoutFeedback, Alert } from "react-native";
import { Container, Content, Text, Button, Accordion, View, Footer, FooterTab, Spinner } from "native-base";
import { Icon, Divider, ListItem } from "react-native-elements";
import { Ionicons, Feather, AntDesign, FontAwesome5, Entypo } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { globalStyles, globalColors, globalSizes, globalLiterals, menuOptionsCustomStyles } from "../lib/rxGlobal";
import * as calendarLib from "../lib/calendarLib";
import { Menu, MenuTrigger, MenuOptions, MenuOption } from "react-native-popup-menu";
import DefaultHeader from "./DefaultHeader";
import VisitPlanResultForm from "./VisitPlanResultForm";
import * as dp from "../lib/sqliteProvider";
import { openDatabase } from "expo-sqlite";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import { LinearGradient } from "expo-linear-gradient";
import * as enums from "../lib/enums";
import * as wp from "../lib/webProvider";
import VisitPlanResultContext from "../contexts/VisitPlanResultContext";
import { dbError } from "../lib/errors";

export default function VisitPlanCustomers(props) {
  const yoyo = props.route.params.yoyo;
  const [presentationalData, setPresentationalData] = useState([]);
  const [isOnInstantFilter, setIsOnInstantFilter] = useState(false);
  const [isOnAdvancedFilter, setisOnAdvancedFilter] = useState(false);
  const [isVisitModalVisible, SetIsVisitModalVisible] = useState(false);
  const [instantFilterText, setInstantFilterText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  let { initialItem } = props.route.params;
  const visitPlanResultContext = useContext(VisitPlanResultContext);

  const syncData = async () => {
    setIsLoading(true);
    await wp.syncClientData();
    setPresentationalData(await dp.selectVisitPlanCustomers(initialItem.Id));
    setIsLoading(false);
    Alert.alert(
      "",
      globalLiterals.alerts.syncClientDataDone,
      [
        {
          text: globalLiterals.buttonTexts.ok,
        },
      ],
      { cancelable: true }
    );
  };

  const confirmAndSyncData = () => {
    Alert.alert(
      "",
      globalLiterals.Confirmations.syncClientData,
      [
        {
          text: globalLiterals.buttonTexts.yes,
          onPress: syncData,
        },
        {
          text: globalLiterals.buttonTexts.no,
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (yoyo) await handleYoyo(yoyo);
      setPresentationalData(await dp.selectVisitPlanCustomers(initialItem.Id));
      SetIsVisitModalVisible(false);
      setIsLoading(false);
    })();
  }, [props]);

  const { title } = props.route.params;

  const handleYoyo = async (yoyo) => {
    try {
      console.log(await dp.updateVisitPlanCustomerAndDetails(yoyo));
    } catch (error) {
      alert(globalLiterals.actionAndStateErrors.saveError);
    }

    // let rawClone = [...rawData];
    // rawClone[rawClone.findIndex((r) => r.rxKey === yoyo.rxKey)] = yoyo;
    // setRawData(rawClone);
    // setPresentationalData(rawClone);
  };

  const keyExtractor = (item, index) => item.Id.toString();

  const onListItemNavigateForward = async (item) => {
    let productGroups = await dp.selectTable("ProductGroup");
    let ctx = { visitPlanCustomer: item, visitPlanResults: await dp.selectJoinedVisitPlanResultProducts(item.Id) };
    ctx.visitPlanResults.forEach((vpr) => {
      vpr.productTitle = vpr.Taste;
      vpr.productGroupTitles = [];
      let parentGroup = productGroups.find((g) => g.Id === vpr.ProductGroupId);

      do {
        vpr.productGroupTitles.push(parentGroup.Title);
        parentGroup = productGroups.find((g) => g.Id === parentGroup.ParentId);
      } while (parentGroup?.ParentId !== null);
      vpr.productGroupTitles.reverse();
    });
    visitPlanResultContext.setValue(ctx);

    console.log(`💬 [VisitPlanCustomers.onListItemNavigateForward] context value => ${JSON.stringify(visitPlanResultContext.value)}`);
    props.navigation.navigate("VisitResultTab", { screen: "VisitPlanResultForm" });
  };

  const renderHeader = () => (
    <DefaultHeader
      title={title}
      isOnInstantFilter={isOnInstantFilter}
      setIsOnInstantFilter={setIsOnInstantFilter}
      setInstantFilterText={setInstantFilterText}
      setisOnAdvancedFilter={setisOnAdvancedFilter}
      navigation={props.navigation}
    />
  );
  const renderItemHeader = (item, expanded) => {
    return (
      <ListItem
        chevron={
          <Feather
            name={expanded ? "chevrons-down" : "chevrons-left"}
            size={24}
            style={globalStyles.listItemHeaderCollapseIcon}
            color={expanded ? globalColors.listItemCollapseIcon : globalColors.listItemExpandIcon}
          />
        }
        containerStyle={[globalStyles.shadowedContainer, globalStyles.listItemHeaderContainer]}
        checkmark={item.ResultStatus !== 2}
        key={item.rxKey}
        linearGradientProps={globalColors.gradients.listItem}
        title={item.Title}
        titleStyle={globalStyles.listItemTitle}
        subtitleStyle={{ ...globalStyles.listItemTitle, color: globalColors.listItemSubtitleText }}
        subtitle={
          expanded ? null : (
            <Text style={{ ...globalStyles.listItemContentFieldData, color: globalColors.listItemSubtitleText, fontSize: 12 }}>
              {item.Address ? item.Address : "وارد نشده"}
            </Text>
          )
        }
        leftElement={
          <TouchableOpacity style={{ alignSelf: "stretch", flex: 1, width: 48, justifyContent: "center" }} onPress={() => onListItemNavigateForward(item)}>
            <Entypo name='chevron-thin-left' size={globalSizes.icons.small} color={globalColors.listItemTitleText} />
          </TouchableOpacity>
        }
      />
    );
  };

  const renderItemContent = (item) => {
    return (
      <View style={[globalStyles.listItemContentContainer]}>
        <View style={globalStyles.listItemContentRow}>
          <Feather name='hash' size={globalSizes.icons.small} color={globalColors.listItemSubtitleIcon} />
          <Text style={globalStyles.listItemContentFieldData}>{item?.Code ?? "وارد نشده"}</Text>
        </View>

        <View style={globalStyles.listItemContentRow}>
          <Feather name='user' size={globalSizes.icons.small} color={globalColors.listItemSubtitleIcon} />
          <Text style={globalStyles.listItemContentFieldData}>{item.Owner ? item.Owner : "وارد نشده"}</Text>
        </View>

        <View style={globalStyles.listItemContentRow}>
          <Feather name='map-pin' size={globalSizes.icons.small} color={globalColors.listItemSubtitleIcon} />
          <Text style={globalStyles.listItemContentFieldData}>{item.Address ? item.Address : "وارد نشده"}</Text>
        </View>

        <View style={globalStyles.listItemContentRow}>
          <Feather name='phone' size={globalSizes.icons.small} color={globalColors.listItemSubtitleIcon} />
          <Text style={globalStyles.listItemContentFieldData}>{item.Phone ? item.Phone : "وارد نشده"}</Text>
        </View>

        <View style={globalStyles.listItemContentRow}>
          <Feather name='smartphone' size={globalSizes.icons.small} color={globalColors.listItemSubtitleIcon} />
          <Text style={globalStyles.listItemContentFieldData}>{item.Cell ? item.Cell : "وارد نشده"}</Text>
        </View>
      </View>
    );
  };

  return (
    <Container backgroundColor={globalColors.screenContainer}>
      {renderHeader()}
      <Content>
        {/* TODO: get data from a method that performs instant and advanced filter */}

        {isLoading ? null : <Accordion expanded dataArray={presentationalData} renderContent={renderItemContent} renderHeader={renderItemHeader} />}
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
