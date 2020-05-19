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
} from "native-base";
import { Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { globalStyles, globalColors, globalSizes } from "../styles/global";
import * as persianLib from "../lib/persianLib";

export default function RetailChallenge({navigation,route}) {
    const {title} = route.params;
  const [data, setData] = useState([]);
  const [freshToken, setFreshToken] = useState(
    "89142b48-8dd0-f6a0-bc15-dff1d8e01d8b"
  );

  const pullData = () => {
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
      .catch((error) => console.log("error", error));
  };

  const renderPageHeader = (title) => {
    //todo: replace false with isInstantSearchOpen
    if (false) {
      return (
        <Header searchBar rounded>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => setIsInstantSearchModalOpen(false)}
            >
              <Icon name={"arrow-back"} />
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
            <Icon name={"ios-search"} />
          </Item>
          <Right style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => {
                setIsInstantSearchModalOpen(false);
                setIsAdvancedSearchModalOpen(true);
              }}
            >
              <MaterialCommunityIcons
                name="table-search"
                size={globalSizes.icons.medium}
                color="white"
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
          <Icon
            reverse
            name={expanded ? "chevron-up" : "chevron-down"}
            type="font-awesome"
            size={8}
            color={
              expanded ? globalColors.iconCollapse : globalColors.iconExpand
            }
          />
          <Text style={styles.itemHeaderFieldTitle}>تاریخ بازدید:</Text>
          <Text style={styles.itemHeaderFieldData}>
            {/* todo: use real date */}
            {persianLib.toShortDate(new Date())}
          </Text>
          <Text style={styles.itemHeaderFieldTitle}>تاریخ ثبت:</Text>
          <Text style={styles.itemHeaderFieldData}>
            {/* todo: use real date */}
            {persianLib.toShortDate(new Date())}
          </Text>
          <Feather
            name="chevrons-left"
            onPress={()=>navigation.navigate('Home')}
            size={globalSizes.icons.large}
            color={globalColors.palette.dimBlue}
            style={{ flex: 1 ,marginHorizontal:5}}
          />
        </View>
      );
    };
    let renderContent = (item) => {
      return (
        <Text
          style={{
            backgroundColor: "#fff",
            paddingVertical: 10,
            paddingHorizontal: 20,
            alignContent: "stretch",
          }}
        >
          {item.Summary}
        </Text>
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

  let dev = () => {
    persianLib.toLongDate(new Date(1588534200000));
  };
  return (
    <Container>
      <Content>
        {renderPageHeader(title)}
        <Button onPress={pullData}>
          <Text>Pull data</Text>
        </Button>
        <Button
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingHorizontal: 20,
          }}
          onPress={dev}
        >
          <Feather name="activity" color="white" size={18} />
          <Text>Test</Text>
        </Button>
        <FlatList
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderItem}
        />
      </Content>
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
    alignItems: "center",
    height: 50,
    backgroundColor: "#f4f3ee",
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
    fontSize: 18,
    fontWeight: "600",
  },
  detailsContainer: {
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: globalColors.palette.paleGray,
    marginHorizontal: 10,
    marginTop: 0,
    padding: 15,
    borderRadius: 5,
  },
  detailsText: {
    fontSize: 18,
    textAlign: "right",
    paddingHorizontal: 35,
    color: globalColors.palette.coal,
  },
  leftAction: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 10,
  },
});
