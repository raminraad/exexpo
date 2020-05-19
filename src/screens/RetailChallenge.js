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

export default function RetailChallenge({ navigation, route }) {
  const [data, setData] = useState([]);
  const [freshToken, setFreshToken] = useState(
    "89142b48-8dd0-f6a0-bc15-dff1d8e01d8b"
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

  const renderPageHeader = (title) => {
    if (isInstantSearchOpen) {
      return (
        <Header searchBar rounded>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => setIsInstantSearchModalOpen(false)}
            >
              <Feather
                name={"arrow-left"}
                color={globalColors.headerIcon}
                size={globalSizes.headerIcon}
              />
            </Button>
          </Left>
          <Item style={{ flex: 10 }}>
            <Input
              placeholder="جستجو"
              autoCorrect={false}
              autoFocus={true}
              maxLength={140}
              onChangeText={(text) => performInstantSearch(text)}
            />
            <Feather
              name={"search"}
              color={globalColors.searchBarIcon}
              size={globalSizes.searchBarIcon}
              style={{ marginRight: 5 }}
            />
          </Item>
          <Right style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => {
                setIsInstantSearchModalOpen(false);
                setIsAdvancedSearchModalOpen(true);
              }}
            >
              <Feather
                name={"filter"}
                color={globalColors.headerIcon}
                size={globalSizes.headerIcon}
              />
            </Button>
          </Right>
        </Header>
      );
    } else {
      return (
        <Header>
          <Left>
            <Button transparent>
              <Ionicons
                name="ios-arrow-back"
                size={globalSizes.icons.medium}
                color={globalColors.palette.cream}
                onPress={() => navigation.goBack()}
              />
            </Button>
          </Left>
          <Body
            style={{
              flexDirection: "row-reverse",
              justifyContent: "center",
              paddingRight: 100,
            }}
          >
            {/* todo: remove upper Body style after finding out why the fucking title in not being centered! */}
            <Title>{title}</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon
                name="menu"
                color={globalColors.palette.cream}
                onPress={() => navigation.toggleDrawer()}
              />
            </Button>
          </Right>
        </Header>
      );
    }
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
                {/* TODO: use real date */}
                {persianLib.toShortDate(new Date())}
              </Text>
              <Text style={styles.itemHeaderFieldTitle}>تاریخ ثبت:</Text>
              <Text style={styles.itemHeaderFieldData}>
                {/* XXX: use real date */}
                {persianLib.toShortDate(new Date())}
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
          <Text>{item.Summary}</Text>
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
      {renderPageHeader(title)}
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
    backgroundColor: "#f4f3ee",
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
    paddingVertical: 10,
    paddingHorizontal: 60,
  },
  leftAction: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 10,
  },
});
