import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Modal, Keyboard, TouchableWithoutFeedback } from "react-native";
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
  Separator,
} from "native-base";
import { Icon, Divider } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { globalStyles, globalColors, globalSizes, menuOptionsCustomStyles } from "../lib/rxGlobal";
import * as persianLib from "../lib/persianLib";
import { Menu, MenuTrigger, MenuOptions, MenuOption } from "react-native-popup-menu";
import DefaultHeader from "../components/DefaultHeader";
import VisitPlanResultForm from "../components/VisitPlanResultForm";
import * as dp from "../lib/sqliteDp";
import { openDatabase } from "expo-sqlite";

export default function VisitPlanCustomers(props) {
  const db = openDatabase("db");
  const [presentationalData, setPresentationalData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [isOnInstantFilter, setIsOnInstantFilter] = useState(false);
  const [isOnAdvancedFilter, setisOnAdvancedFilter] = useState(false);
  const [isOnAdd, setIsOnAdd] = useState(false);
  const [instantFilterText, setInstantFilterText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    console.log(JSON.stringify(props));
    let query = `select * from VisitPlanCustomers where VisitPlanId = ${props.route.params.item.Id}`;
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (_, { rows: { _array } }) => {
          console.log(`☺☺ ${query} => length: ${_array.length} => ${JSON.stringify([..._array])}`);
          setRawData(_array);
          setPresentationalData(_array);
        },
        (transaction, error) => console.log(`☻☻ ${query} =>=> ${error}`)
      );
    });

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
              backgroundColor={globalColors.listItemNavigateIcon}
              onPress={() =>{
                props.navigation.push("VisitPlanResultForm", {
                  title: `فروشگاه ${item.Title}`,
                  initialItem: item,
                })
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
  const addItem = (item) => {
    //fixme: implement this
    setPresentationalData((currentItems) => {
      return [item, ...currentItems];
    });
    setAddModalOpen(false);
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

      <Modal visible={isOnAdd} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={globalStyles.addModalContent}>
            <VisitPlanResultForm onSubmit={addItem} onCancel={() => setIsOnAdd(false)} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {isLoading ? (
        <Spinner style={{ height: "100%" }} color='grey' size={50} />
      ) : (
        <FlatList
          keyExtractor={keyExtractor}
          //TODO: get data from a method that performs instant and advanced filter
          data={presentationalData}
          renderItem={renderItem}
        />
      )}

      <Footer>
        <FooterTab style={{ justifyContent: "center", alignItems: "center" }}>
          {isLoading ? (
            <Spinner color='white' />
          ) : (
            <Button>
              <Feather name='refresh-ccw' size={globalSizes.icons.large} color={globalColors.palette.cream} />
            </Button>
          )}
        </FooterTab>
        <FooterTab>
          <Button onPress={() => setIsOnInstantFilter(true)}>
            <Feather name='search' size={globalSizes.icons.large} color={globalColors.palette.cream} />
          </Button>
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
