import React from 'react'
import { StyleSheet } from 'react-native'
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
  } from "../styles/global";

const DefaultHeader = ({title,isInstantSearchOpen,navigation}) => {
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
}

export default DefaultHeader

const styles = StyleSheet.create({})
