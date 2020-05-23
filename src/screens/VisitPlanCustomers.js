import React, { useState, useEffect } from "react";
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
import { AntDesign } from '@expo/vector-icons'; 
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

export default function VisitPlanCustomers(props) {
  const [presentationalData, setPresentationalData] = useState([]);
  const [isOnInstantFilter, setIsOnInstantFilter] = useState(false);
  const [isOnAdvancedFilter, setisOnAdvancedFilter] = useState(false);
  const [instantFilterText, setInstantFilterText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setPresentationalData(props.route.params.rawData);
    setIsLoading(false);
    return () => setPresentationalData([]);
  }, [props, isLoading]);

  const { title } = props.route.params;

  const keyExtractor = (item, index) => item.Id.toString();
  const renderItem = ({ item, index }) => {
    let renderItemHeader = (item, expanded) => {
      return (
        <View style={globalStyles.listItemHeaderContainer}>
          <Feather
            name={expanded ? "chevrons-down" : "chevrons-left"}
            size={24}
            style={globalStyles.listItemHeaderCollapseIcon}
            color={
              expanded
                ? globalColors.listItemCollapseIcon
                : globalColors.listItemExpandIcon
            }
          />
          <View style={globalStyles.listItemHeaderInnerTextContainer}>
            <View style={{ ...globalStyles.listItemHeaderFieldContainer }}>
              <Text style={globalStyles.listItemHeaderFieldTitle}>شناسه:</Text>
              <Text style={globalStyles.listItemHeaderFieldData}>
                {item.Code}
              </Text>
            </View>

            <View style={{...globalStyles.listItemHeaderFieldContainer,flex:2}}>
              <Text style={globalStyles.listItemHeaderFieldTitle}>عنوان:</Text>
              <Text style={[globalStyles.listItemHeaderFieldData, { flex: 1 }]}>
                {item.Title}
              </Text>
            </View>
          </View>
          <Button transparent style={globalStyles.listItemHeaderNavigateButton}>
            <AntDesign
              name="edit"
              onPress={() =>
                navigation.navigate("VisitPlanCustomers", {
                  title: `مشتریان هدف در تاریخ ${persianLib.toShortDate(
                    new Date(item.OperationDate)
                  )}`,
                })
              }
              size={globalSizes.icons.medium}
              color={globalColors.listItemNavigateIcon}
            />
          </Button>
        </View>
      );
    };
    let renderItemContent = (item) => {
      return (
        <View style={globalStyles.listItemContentContainer}>
          <View style={globalStyles.listItemContentRow}>
            <Feather name="user" size={globalSizes.icons.small} color="grey" />
            <Text style={globalStyles.listItemContentFieldData}>
              {item.Owner ? item.Owner : "وارد نشده"}
            </Text>
          </View>

          <View style={globalStyles.listItemContentRow}>
            <Feather name="map-pin" size={globalSizes.icons.small} color="grey" />
            <Text style={globalStyles.listItemContentFieldData}>
              {item.Address ? item.Address : "وارد نشده"}
            </Text>
          </View>

          <View style={globalStyles.listItemContentRow}>
            <Feather name="phone" size={globalSizes.icons.small} color="grey" />
            <Text style={globalStyles.listItemContentFieldData}>
              {item.Phone ? item.Phone : "وارد نشده"}
            </Text>
          </View>

          <View style={globalStyles.listItemContentRow}>
            <Feather name="smartphone" size={globalSizes.icons.small} color="grey" />
            <Text style={globalStyles.listItemContentFieldData}>
              {item.Cell ? item.Cell : "وارد نشده"}
            </Text>
          </View>
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
          renderContent={renderItemContent}
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
        {isLoading ? (
          <Spinner style={{ height: "100%" }} color="grey" size={50} />
        ) : (
          <FlatList
            keyExtractor={keyExtractor}
            //TODO: get data from a method that performs instant and advanced filter
            data={presentationalData}
            renderItem={renderItem}
          />
        )}
      </Content>

      <Footer>
        <FooterTab style={{ justifyContent: "center", alignItems: "center" }}>
          {isLoading ? (
            <Spinner color="white" />
          ) : (
            <Button>
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
