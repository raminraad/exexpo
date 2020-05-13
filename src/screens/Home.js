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
import DrawerHeader from "../components/DrawerHeader";
import { Icon, Container } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { globalStyles, globalSizes, globalColors } from "../styles/global";
import { Divider } from "react-native-elements";

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
              color: "rgba(9,150,196,0.75)",
              members: 8,
              icon: "users",
              image: require("../icons/xxx/name.png"),
              page: "Users",
            },
            {
              key: 2,
              title: "بازاریابی",
              color: "rgba(9,150,196,0.75)",
              members: 12,
              icon: "shopping-bag",
              image: require("../icons/xxx/attract-customers.png"),
              page: "Order",
            },
            {
              key: 3,
              title: "مشتریان",
              color: "rgba(9,150,196,0.75)",
              members: 6,
              icon: "shopping-cart",
              image: require("../icons/xxx/groups.png"),
            },
            {
              key: 4,
              title: "دسترسی ها",
              color: "rgba(9,150,196,0.75)",
              icon: "lock",
              members: 56,
              image: require("../icons/xxx/globe-earth.png"),
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
              title: "آموزش",
              color: "rgba(9,150,196,0.75)",
              icon: "pen-tool",
              members: 7,
              image: require("../icons/xxx/classroom.png"),
            },
            {
              key: 5,
              title: "بازار بین المللی",
              color: "rgba(9,150,196,0.75)",
              icon: "globe",
              members: 23,
              image: require("../icons/xxx/globe-earth.png"),
            },
            {
              key: 6,
              title: "کلمات کلیدی",
              color: "rgba(9,150,196,0.75)",
              icon: "hash",
              members: 12,
              image: require("../icons/xxx/globe-earth.png"),
            },
            {
              key: 7,
              title: "هدایا",
              color: "rgba(9,150,196,0.75)",
              icon: "gift",
              members: 17,
              image: require("../icons/xxx/globe-earth.png"),
            },
            {
              key: 8,
              title: "گزارش مالی",
              color: "rgba(9,150,196,0.75)",
              icon: "dollar-sign",
              members: 23,
              image: require("../icons/xxx/globe-earth.png"),
            },
            {
              key: 9,
              title: "جدول زمانی",
              color: "rgba(9,150,196,0.75)",
              icon: "calendar",
              members: 23,
              image: require("../icons/xxx/globe-earth.png"),
            },
            {
              key: 10,
              title: "برنامه ریزی",
              color: "rgba(9,150,196,0.75)",
              members: 45,
              icon: "trello",
              image: require("../icons/xxx/to-do.png"),
            },
            {
              key: 11,
              title: "شبکه توزیع",
              color: "rgba(9,150,196,0.75)",
              members: 13,
              icon: "truck",
              image: require("../icons/xxx/nvstec.png"),
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
              title: "کالاها",
              color: "rgba(9,150,196,0.75)",
              members: 13,
              icon: "package",
              image: require("../icons/xxx/ingredients-for-cooking.png"),
            },
            {
              key: 13,
              title: "مسیرهای توزیع",
              color: "rgba(9,150,196,0.75)",
              members: 13,
              icon: "shuffle",
              image: require("../icons/xxx/where-to-quest.png"),
            },
            {
              key: 14,
              title: "بازاریابی تلفنی",
              color: "rgba(9,150,196,0.75)",
              members: 13,
              icon: "phone-call",
              image: require("../icons/xxx/man-on-phone.png"),
            },
            {
              key: 15,
              title: "فرمول ها",
              color: "rgba(9,150,196,0.75)",
              members: 13,
              icon: "underline",
              image: require("../icons/xxx/calculate.png"),
            },
            {
              key: 16,
              title: "تخفیف ها",
              color: "rgba(9,150,196,0.75)",
              members: 18,
              icon: "percent",
              image: require("../icons/xxx/calculate.png"),
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
      <View style={styles.container}>
        <DrawerHeader navigation={this.props.navigation} title={"ماژول ها"} />
        <SectionList
          sections={this.menuData}
          renderSectionFooter={({section})=>(<View
            style={{
              borderBottomColor: "rgba(200,200,200,0.3)",
              borderBottomWidth: 1,
              marginTop: 50,
            }}
          />)}
          renderSectionHeader={({ section }) => (
            <View>
              <Text style={styles.sectionHeader}>{section.title}</Text>
              
            </View>
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
                    <View style={styles.iconContainer}>
                      <TouchableOpacity>
                        <View
                          style={[
                            globalStyles.CircleShapeView,
                            {
                              width: 72,
                              height: 72,
                              backgroundColor: globalColors.homeIconBackground,
                              marginVertical: 20,
                              marginHorizontal: 25,
                            },
                          ]}
                        >
                          <Feather
                            name={item.icon}
                            size={globalSizes.icons.large}
                            color={globalColors.homeIcon}
                            onPress={() => {
                              if (item.page)
                                this.props.navigation.navigate(item.page);
                              else alert("ماژول در حال ساخت میباشد");
                            }}
                          />
                        </View>
                        <Text style={styles.iconText}>{item.title}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            );
          }}
          keyExtractor={(item) => {
            return item.id;
          }}
        />
      </View>
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
    fontSize: 24,
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
    fontSize: 18,
    color: globalColors.homeIconText,
    fontWeight: "bold",
  },
});
