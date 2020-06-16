import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  SectionList,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { globalStyles, globalSizes, globalColors } from "../lib/rxGlobal";
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

export default class Menu extends Component {
  menuData = [
    {
      title: "کاربران و دسترسی سیستم",
      data: [
        {
          pages: [
            {
              key: 1,
              title: "کاربران و مدیران",
              color: globalColors.homeIconBackground1,
              members: 8,
              icon: "users",
              page: "Users",
            },
            {
              key: 2,
              title: "محصولات",
              color: globalColors.homeIconBackground1,
              members: 12,
              icon: "package",
              page: "Products",
            },
            {
              key: 3,
              title: "مشتریان",
              color: globalColors.homeIconBackground1,
              members: 6,
              icon: "shopping-cart",
              page:'Order'
            },
            
          ],
        },
      ],
    },
    {
      title: "اپلیکیشن ها و ماژول ها",
      data: [
        {
          pages: [
            {
              key: 4,
              title: "پویش فروش خرده",
              color: globalColors.homeIconBackground2,
              members: 56,
              icon: "credit-card",
              page:'UserVisitPlans'
            },
            {
              key: 5,
              title: "آموزش",
              color: globalColors.homeIconBackground2,
              icon: "pen-tool",
              members: 7,
            },
            {
              key: 6,
              title: "بازار بین المللی",
              color: globalColors.homeIconBackground2,
              icon: "globe",
              members: 23,
            },
            {
              key: 7,
              title: "هدایا",
              color: globalColors.homeIconBackground2,
              icon: "gift",
              members: 17,
            },
            {
              key: 8,
              title: "گزارش مالی",
              color: globalColors.homeIconBackground2,
              icon: "dollar-sign",
              members: 23,
            },
            {
              key: 9,
              title: "جدول زمانی",
              color: globalColors.homeIconBackground2,
              icon: "calendar",
              members: 23,
            },
            {
              key: 10,
              title: "برنامه ریزی",
              color: globalColors.homeIconBackground2,
              members: 45,
              icon: "trello",
            },
            {
              key: 11,
              title: "شبکه توزیع",
              color: globalColors.homeIconBackground2,
              members: 13,
              icon: "truck",
            },
          ],
        },
      ],
    },
    {
      title: "وضعیت کنونی سیستم",
      data: [
        {
          pages: [
            {
              key: 12,
              title: "بازاریابی",
              color: globalColors.homeIconBackground3,
              members: 13,
              icon: "shopping-bag",
              page:'Order'
            },
            {
              key: 13,
              title: "مسیرهای توزیع",
              color: globalColors.homeIconBackground3,
              members: 13,
              icon: "shuffle",
            },
            {
              key: 14,
              title: "بازاریابی تلفنی",
              color: globalColors.homeIconBackground3,
              members: 13,
              icon: "phone-call",
            },
            {
              key: 15,
              title: "فرمول ها",
              color: globalColors.homeIconBackground3,
              members: 13,
              icon: "underline",
            },
            {
              key: 16,
              title: "تخفیف ها",
              color: globalColors.homeIconBackground3,
              members: 18,
              icon: "percent",
            },
          ],
        },
      ],
    },
  ];

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left></Left>
          <Body
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Title>مــــــاژولهـــــــا</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon
                name="menu"
                onPress={() => this.props.navigation.toggleDrawer()}
              />
            </Button>
          </Right>
        </Header>
        <SectionList
          sections={this.menuData}
          renderSectionFooter={({ section }) => (
            <View
              style={{
                borderBottomColor: "rgba(200,200,200,0.3)",
                borderBottomWidth: 0,
                marginTop: 50,
              }}
            />
          )}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          renderItem={({ item }) => {
            return (
              <FlatList
                style={styles.list}
                contentContainerStyle={styles.listContainer}
                data={item.pages}
                keyExtractor={(item) => {
                  return item.key.toString();
                }}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        if (item.page)
                          this.props.navigation.navigate(item.page,{title:item.title});
                        else alert("ماژول در حال ساخت میباشد");
                      }}
                    >
                      <View style={styles.iconContainer}>
                        <View
                          style={[
                            globalStyles.CircleShapeView,
                            styles.iconCircle,
                            { backgroundColor: item.color },
                          ]}
                        >
                          <Feather
                            name={item.icon}
                            size={globalSizes.icons.medium}
                            color={globalColors.homeIcon}
                          />
                        </View>
                        <Text style={styles.iconText}>{item.title}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            );
          }}
          keyExtractor={(item) => {
            return item.id;
          }}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.homeBackground,
  },
  list: {
    paddingHorizontal: 30,
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  sectionHeader: {
    paddingHorizontal: 10,
    textAlignVertical: "center",
    height: 70,
    fontSize: 20,
    fontWeight: "bold",
    color: globalColors.homeSectionHeader,
    backgroundColor: globalColors.homeBackground,
  },

  iconContainer: {
    alignItems: "center",
    marginHorizontal: 6,
  },
  iconText: {
    textAlign: "center",
    marginTop: 2,
    fontSize: 14,
    color: globalColors.homeIconText,
  },
  iconCircle: {
    width: 64,
    height: 64,
    marginTop: 20,
    marginHorizontal: 15,
  },
});
