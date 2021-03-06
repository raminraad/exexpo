import React from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Card,
  CardItem,
  Body,
  Header,
  Content,
  Icon,
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
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  globalStyles,
  globalColors,
  globalSizes,
  menuOptionsCustomStyles,
} from "../lib/rxGlobal";

const DefaultHeader = (props) => {
  if (props.isOnInstantFilter) {
    return (
      <Header searchBar rounded>
        <Left style={styles.headerLeft}>
          <Button transparent onPress={() => props.setIsOnInstantFilter(false)} >
            <Feather
              name={"arrow-left"}
              color={globalColors.headerIcon}
              size={globalSizes.headerIcon}
            />
          </Button>
        </Left>
        <Item style={styles.headerBody}>
          <Input
            placeholder="جستجو"
            autoCorrect={false}
            autoFocus={true}
            maxLength={140}
            onChangeText={(text) => props.setInstantFilterText(text)}
          />
          <Feather
            name={"search"}
            color={globalColors.searchBarIcon}
            size={globalSizes.searchBarIcon}
            style={{ marginHorizontal: 5 }}
          />
        </Item>
        <Right style={styles.headerRight}>
          <Button
            transparent
            onPress={() => {
              props.setIsOnInstantFilter(false);
              props.setisOnAdvancedFilter(true);
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
        {props.leftElementIsVisible===undefined||props.leftElementIsVisible?
        <Left style={styles.headerLeft}>
          <Button transparent style={styles.headerButton}
          onPress={() => props.navigation.goBack()}>
            <Ionicons
              name="ios-return-left"
              size={globalSizes.icons.medium}
              color={globalColors.palette.cream}
            />
          </Button>
        </Left>:null}
        <Body style={styles.headerBody}>
          {/* todo: remove upper Body style after finding out why the fucking title in not being centered! */}
          <Title>{props.title}</Title>
        </Body>
        <Right style={styles.headerRight}>
          <Button transparent style={styles.headerButton}>
            <Icon
              name="menu"
              color={globalColors.palette.cream}
              onPress={() => props.navigation.toggleDrawer()}
            />
          </Button>
        </Right>
      </Header>
    );
  }
};

export default DefaultHeader;

const styles = StyleSheet.create({
  headerRight: {
    flex: 1,
  },
  headerBody: {
    flex: 10,
    flexDirection: "row-reverse",
    justifyContent: "center",
  },
  headerLeft: {
    flex: 1,
    flexDirection:'row',
  },
  headerButton: {
    flex: 1,
  },
});
