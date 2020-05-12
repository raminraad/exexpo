import React, { Component, useState } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import IconFeather from "react-native-vector-icons/Feather";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Divider } from "react-native-paper";
import UserItem from "../components/UserItem";
import UserAdd from "../components/UserAdd";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles, colors, sizeOfIcons } from "../styles/global";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Icon,
  Body,
  Title,
  Item,
  Input,
} from "native-base";

const userList = [
  {
    key: 1,
    jobTitle: "مدیر فروش",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/krystalfister/128.jpg",
    fName: "ارغوان",
    lName: "صدرعاملی",
    description: "دارای سابقه کاری در زمینه فروش مواد غذایی و قطعات کامپیوتر",
  },
  {
    key: 2,
    jobTitle: "رئیس انتظامات",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/joshuasortino/128.jpg",
    fName: "عباس",
    lName: "فکوری",
    description: "مشغول بکار بصورت آزمایشی",
  },
  {
    key: 3,
    jobTitle: "کارشناس فنی",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/flexrs/128.jpg",
    fName: "نادر",
    lName: "فریادشیران",
    description: "فوق لیسانس صنایع از دانشگاه صنعتی شریف",
  },
  {
    key: 4,
    jobTitle: "مدیر تحقیق و توسعه",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/funwatercat/128.jpg",
    fName: "کاظم",
    lName: "اولیایی",
    description: "با سابقه 15 ساله در زمینه تولید مواد شوینده و بهداشتی",
  },
  {
    key: 5,
    jobTitle: "پشتیبانی فروش",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/g1sh/128.jpg",
    fName: "رضا ",
    lName: "افتخاری",
  },
  {
    key: 6,
    jobTitle: "رئیس حسابداری",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/jefffis/128.jpg",
    fName: "امیررضا",
    lName: "آشتیانی",
  },
  {
    key: 7,
    jobTitle: "معاون توسعه مدیریت و منابع",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/HenryHoffman/128.jpg",
    fName: "امیر",
    lName: "زهیرنیا",
  },
  {
    key: 8,
    jobTitle: "دبیر هیات عالی نظارت",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/SlaapMe/128.jpg",
    fName: "فاضل",
    lName: "شریفی نیا",
  },
  {
    key: 9,
    jobTitle: "عضو هيأت‌عامل",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/RussellBishop/128.jpg",
    fName: "شهرام ",
    lName: "فراهانی",
  },
  {
    key: 10,
    jobTitle: "قائم مقام و عضو هيأت‌عامل",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/SULiik/128.jpg",
    fName: "علی ",
    lName: "بختیاری",
  },
  {
    key: 11,
    jobTitle: "مدیر ارشد حسابرسی",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/jennyshen/128.jpg",
    fName: "فروغ",
    lName: "هویدا",
  },
  {
    key: 12,
    jobTitle: "مدیر ارشد مجله حسابرس",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/michzen/128.jpg",
    fName: "محمد",
    lName: "مصباح",
  },
  {
    key: 13,
    jobTitle: "معاون فنی",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/9lessons/128.jpg",
    fName: "محمد",
    lName: "فرخنده زاد",
  },
  {
    key: 14,
    jobTitle: "معاون مالی",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/AM_Kn2/128.jpg",
    fName: "پرهام",
    lName: "نزاکت",
  },
  {
    key: 15,
    jobTitle: "معاون برنامه ریزی",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/IsaryAmairani/128.jpg",
    fName: "رزا",
    lName: "هادی نیا",
  },
];

function Users(props) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [isAdvancedSearchOpen, setIsAdvancedSearchModalOpen] = useState(false);
  const [isInstantSearchOpen, setIsInstantSearchModalOpen] = useState(false);
  const [items, setItems] = useState(userList);
  const addItem = (item) => {
    item.key = Math.random().toString();
    setItems((currentItems) => {
      return [item, ...currentItems];
    });
    setAddModalOpen(false);
  };
  const deleteItem = (itemKey) => {
    const index = items.findIndex((i) => i.key === itemKey);
    items.splice(index, 1);
    setItems([...items]);
  };

  const performAdvancedSearch = (item) => {
    //todo: separate main list and view list
    setItems(userList);
    setItems((currentItems) => {
      return currentItems.filter(
        (c) =>
          (!item.fName || String(c.fName).includes(item.fName)) &&
          (!item.lName || String(c.lName).includes(item.lName)) &&
          (!item.jobTitle || String(c.jobTitle).includes(item.jobTitle)) &&
          (!item.description ||
            String(c.description).includes(item.description))
      );
    });
    setIsAdvancedSearchModalOpen(false);
  };
  const performInstantSearch = (keyword) => {
    //todo: separate main list and view list
    setItems(userList);
    setItems((currentItems) => {
      return currentItems.filter(
        (c) =>
        !keyword ||
        ( String(c.fName).includes(keyword)) ||
        ( String(c.lName).includes(keyword)) ||
        ( String(c.jobTitle).includes(keyword)) ||
        ( String(c.description).includes(keyword))
        );
      });
      // console.log(`${keyword} => ${userList.length} => ${items.length}`)
  };

  const keyExtractor = (item, index) => item.key.toString();

  const renderItem = ({ item }) => (
    <UserItem item={item} onDelete={deleteItem} />
  );
  const renderHeader = () => {
    if (isInstantSearchOpen) {
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
              onChangeText={(text)=>performInstantSearch(text)}
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
                size={sizeOfIcons.medium}
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
                size={sizeOfIcons.medium}
                color="white"
                onPress={() => props.navigation.goBack()}
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
            <Title>کـــــاربـــــران</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon
                name="menu"
                onPress={() => props.navigation.toggleDrawer()}
              />
            </Button>
          </Right>
        </Header>
      );
    }
  };
  return (
    <Container>
      <Modal visible={addModalOpen} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <UserAdd
              onSubmit={addItem}
              onCancel={() => setAddModalOpen(false)}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal visible={isAdvancedSearchOpen} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <UserAdd
              onSubmit={performAdvancedSearch}
              onCancel={() => setIsAdvancedSearchModalOpen(false)}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {renderHeader()}
      <FlatList
        keyExtractor={keyExtractor}
        data={items}
        renderItem={renderItem}
      />
      <Footer>
        <FooterTab>
          <Button onPress={() => setAddModalOpen(true)}>
            <IconFeather
              name="plus-circle"
              size={sizeOfIcons.large}
              color={colors.palette.cream}
            />
          </Button>
        </FooterTab>
        <FooterTab>
          <Button onPress={() => setIsInstantSearchModalOpen(true)}>
            <IconFeather
              name="search"
              size={sizeOfIcons.large}
              color={colors.palette.cream}
            />
          </Button>
        </FooterTab>
        <FooterTab style={{ alignSelf: "center", justifyContent: "center" }}>
          <Menu>
            <MenuTrigger
              children={
                <IconFeather
                  color={colors.palette.cream}
                  name={"star"}
                  size={sizeOfIcons.large}
                />
              }
            />
            <MenuOptions customStyles={optionsStyles}>
              <MenuOption onSelect={() => alert(`Item1`)} text="گزینه 1" />
              <Divider />
              <MenuOption onSelect={() => alert(`Item2`)} text="گزینه 2" />
              <Divider />
              <MenuOption onSelect={() => alert(`Item3`)} text="گزینه 3" />
              <Divider />
              <MenuOption
                onSelect={() => alert(`Item4`)}
                disabled={true}
                text="گزینه 4"
              />
            </MenuOptions>
          </Menu>
        </FooterTab>
      </Footer>
    </Container>
  );
}

export default Users;

const optionsStyles = {
  optionsContainer: {
    width: 300,
    padding: 5,
    borderRadius: 5,
  },
  optionsWrapper: {},
  optionWrapper: {
    height: 50,
    justifyContent: "center",
  },
  optionTouchable: {
    underlayColor: "gold",
    activeOpacity: 70,
  },
  optionText: {
    fontSize: 16,
  },
};

const styles = StyleSheet.create({
  footerContainerStyle: {
    paddingVertical: 20,
    borderTopWidth: 3,
    paddingHorizontal: 90,
    borderTopColor: "rgba(0,0,0,0.2)",
  },
  headerContainerStyle: {
    paddingVertical: 20,
    alignContent: "center",
    justifyContent: "center",
    borderBottomWidth: 3,
    borderBottomColor: "rgba(0,0,0,0.2)",
  },
  modalContent: {
    flex: 1,
  },
});
