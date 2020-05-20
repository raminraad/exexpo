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

export default function VisitPlans(props) {

  const [presentationalData, setPresentationalData] = useState([]);
  const [isOnInstantFilter, setIsOnInstantFilter] = useState(false);
  const [isOnAdvancedFilter, setisOnAdvancedFilter] = useState(false);
  const [instantFilterText, setInstantFilterText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { title } = props.route.params;

  const keyExtractor = (item, index) => item.Id.toString();
  const renderItem = ({ item, index }) => {
    let renderItemHeader = (item, expanded) => {
      return (
        <View style={globalStyles.listItemHeaderContainer}>
          <Feather
            name={expanded ? "chevrons-down" : "chevrons-left"}
            size={24}
            color={
              expanded
                ? globalColors.listItemCollapseIcon
                : globalColors.listItemExpandIcon
            }
          />
          <View style={globalStyles.listItemHeaderInnerText}>
            <Text style={globalStyles.listItemHeaderFieldTitle}>
              تاریخ بازدید:
            </Text>
            <Text style={globalStyles.listItemHeaderFieldData}>
              {persianLib.toShortDate(new Date(item.OperationDate))}
            </Text>
            <Text style={globalStyles.listItemHeaderFieldTitle}>
              تاریخ ثبت:
            </Text>
            <Text style={globalStyles.listItemHeaderFieldData}>
              {persianLib.toShortDate(new Date(item.DateX))}
            </Text>
          </View>
          <Feather
            name="corner-down-left"
            // FIXME: navigate to details page
            onPress={() => props.navigation.navigate("Home")}
            size={globalSizes.icons.medium}
            color={globalColors.listItemNavigateIcon}
          />
        </View>
      );
    };
    let renderContent = (item) => {
      return (
        <View style={globalStyles.listItemContentContainer}>
          <Text style={globalStyles.listItemContentFieldTitle}>توضیح:</Text>
          <Text style={globalStyles.listItemContentFieldData}>
            {item.Summary}
          </Text>
        </View>
      );
    };

    let SwipeLeftAction = () => {
      return (
        <View style={globalStyles.listItemSwipeLeftContainer}>
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
      <DefaultHeader
        title={title}
        isOnInstantFilter={isOnInstantFilter}
        setIsOnInstantFilter={setIsOnInstantFilter}
        setInstantFilterText={setInstantFilterText}
        setisOnAdvancedFilter={setisOnAdvancedFilter}
        navigation={props.navigation}
      />
      <Content padder>
        <FlatList
          keyExtractor={keyExtractor}
          //TODO: get data from a method that performs instant and advanced filter
          data={presentationalData}
          renderItem={renderItem}
        />
      </Content>

      <Footer>
        <FooterTab style={{ justifyContent: "center", alignItems: "center" }}>
          {isLoading ? (
            <Spinner color="white" />
          ) : (
            <Button >
              <Feather
                name="refresh-ccw"
                size={globalSizes.icons.large}
                color={globalColors.palette.cream}
              />
            </Button>
          )}
        </FooterTab>
        <FooterTab>
          <Button onPress={() => setIsOnInstantFilter(true)}>
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