import React, { useState } from "react";
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
import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  globalStyles,
  globalColors,
  globalSizes,
  menuOptionsCustomStyles,
} from "../styles/global";
import * as persianLib from "../lib/persianLib";
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";
import DefaultHeader from "../components/DefaultHeader";

export default function VisitPlans({ navigation, route }) {
  const [data, setData] = useState([]);
  const [freshToken, setFreshToken] = useState(
    "bd144820-aeb1-7b3c-a2a5-0f730f30aa5f"
  );
  const [isInstantSearchOpen, setIsInstantSearchModalOpen] = useState(false);
  const [isAdvancedSearchOpen, setIsAdvancedSearchModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    fetch(
      "http://audit.mazmaz.net/Api/WebApi.asmx/SyncServerData",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.d.Response.Token) {
          setFreshToken(result.d.Response.Token);
          setData(result.d.DataTables.UserVisitPlan);
          console.log(
            `fetched ${result.d.DataTables.UserVisitPlan.length} rows and set ${data.length} rows to data`
          );
        } else alert(result.d.Response.Message);
      })
      .catch((error) => console.log("error", error))
      .finally(() => setIsLoading(false));
  };
  const performInstantSearch = (text) => {
    //todo: implement instant search
  };

  const keyExtractor = (item, index) => item.Id.toString();
  const renderItem = ({ item, index }) => {
    let renderItemHeader = (item, expanded) => {
      return (
        <View style={styles.itemHeaderContainer}>
          <Feather name={expanded ? "chevrons-down" : "chevrons-left"} size={24} color={
              expanded ? globalColors.listItemCollapseIcon : globalColors.listItemExpandIcon
            } />
          <View style={styles.itemHeaderInnerText}>
              
              <Text style={styles.itemHeaderFieldTitle}>تاریخ بازدید:</Text>
              <Text style={styles.itemHeaderFieldData}>
                {persianLib.toShortDate(new Date(item.OperationDate))}
              </Text>
              <Text style={styles.itemHeaderFieldTitle}>تاریخ ثبت:</Text>
              <Text style={styles.itemHeaderFieldData}>
                {/* FIXME: as AAD to fix DateX field and change item.OperationDate to item.DateX */}
                {persianLib.toShortDate(new Date(item.OperationDate))}
              </Text>
          </View>
          <Feather
            name="corner-down-left"
            // FIXME: navigate to details page
            onPress={() => navigation.navigate("Home")}
            size={globalSizes.icons.medium}
            color={globalColors.listItemNavigateIcon}
          />
        </View>
      );
    };
    let renderContent = (item) => {
      return (
        <View style={styles.itemContentContainer}>
              <Text style={styles.itemContentFieldTitle}>توضیح:</Text>
          <Text style={styles.itemContentFieldData}>
            {item.Summary}
            </Text>
        </View>
      );
    };

    let SwipeLeftAction = () => {
      return (
        <View style={styles.leftAction}>
          <Icon
            reverse
            name="trash"
            type="font-awesome"
            size={globalSizes.icons.small}
            color={globalColors.btnDelete}
          />
          <Icon
            reverse
            name="edit"
            type="font-awesome"
            size={globalSizes.icons.small}
            color={globalColors.btnUpdate}
          />
        </View>
      );
    };
    return (
      <Swipeable renderLeftActions={SwipeLeftAction}>
        <Accordion
          dataArray={[item]}
          renderContent={renderContent}
          renderHeader={renderItemHeader}
        />
      </Swipeable>
    );
  };

  return (
    <Container>
      <DefaultHeader title={title} isInstantSearchOpen={isInstantSearchOpen} navigation={navigation} prop/>
      <Content>
        {/* <Button
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingHorizontal: 20,
          }}
          onPress={() => {
            persianLib.toLongDate(new Date(1588534200000));
          }}
        >
          <Feather name="activity" color="white" size={18} />
          <Text>DEBUG</Text>
        </Button> */}
        <FlatList
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderItem}
        />
      </Content>

      <Footer>
        <FooterTab style={{ justifyContent: "center", alignItems: "center" }}>
          {isLoading ? (
            <Spinner color="white" />
          ) : (
            <Button onPress={pullData}>
              <Feather
                name="refresh-ccw"
                size={globalSizes.icons.large}
                color={globalColors.palette.cream}
              />
            </Button>
          )}
        </FooterTab>
        <FooterTab>
          <Button onPress={() => setIsInstantSearchModalOpen(true)}>
            <Feather
              name="search"
              size={globalSizes.icons.large}
              color={globalColors.palette.cream}
            />
          </Button>
        </FooterTab>
        <FooterTab style={{ alignSelf: "center", justifyContent: "center" }}>
          <Menu>
            <MenuTrigger
              // todo: set items and remove disabled
              disabled={true}
              children={
                <Feather
                  color={globalColors.palette.cream}
                  name={"star"}
                  size={globalSizes.icons.large}
                />
              }
            />
            <MenuOptions customStyles={menuOptionsCustomStyles}></MenuOptions>
          </Menu>
        </FooterTab>
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 15,
    borderColor: "rgba(3,3,3,0.5)",
    borderWidth: 0.5,
  },
  itemHeaderContainer: {
    flexDirection: "row-reverse",
    justifyContent:'space-between',
    alignItems: "center",
    height: 50,
    paddingHorizontal:5,
    backgroundColor: globalColors.listItemHeaderContainer,
  },
  itemHeaderInnerText:{
      flex:1,
      flexDirection:'row-reverse'

  },
  itemHeaderFieldTitle: {
    textAlignVertical: "center",
    marginRight: 25,
    fontSize: 14,
    color: "grey",
  },
  itemHeaderFieldData: {
    textAlignVertical: "center",
    marginRight: 5,
    fontSize: 14,
    fontWeight: "600",
  },
  itemContentContainer: {
    flexDirection:'row-reverse',
    paddingVertical: 10,
    paddingHorizontal: 60,
    backgroundColor: globalColors.listItemContentContainer,
  },
  itemContentFieldTitle: {
    textAlignVertical: "center",
    fontSize: 14,
    color: "grey",
  },
  itemContentFieldData: {
    textAlignVertical: "center",
    marginRight: 5,
    fontSize: 14,
    fontWeight: "600",
  },
  leftAction: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 10,
  },
});
