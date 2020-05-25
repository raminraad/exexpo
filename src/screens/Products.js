import React, { useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import {
  Container,
  Card,
  CardItem,
  Body,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Button,
  Accordion,
  View,
} from "native-base";
import { Icon } from "react-native-elements";

import Swipeable from "react-native-gesture-handler/Swipeable";
import { globalStyles, globalColors, globalSizes } from "../styles/global";

export default function Products() {
  const [data, setData] = useState([]);
  const [freshToken, setFreshToken] = useState(
    "66334ec9-1296-45d1-dd34-716b453bfa32"
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
          setData(result.d.DataTables.ProductGroup);
          console.log(
            `fetched ${result.d.DataTables.ProductGroup.length} rows and set ${data.length} rows to data`
          );
        } else alert(result.d.Response.Message);
      })
      .catch((error) => console.log("error", error));
  };
  const renderHeader = (item, expanded) => {
    return (
      <View
        style={{
          flexDirection: "row-reverse",
          alignItems:'center',
          height: 50,
          borderRadius: 2,
          borderWidth: 1,
          borderBottomWidth: 0,
          borderColor: "#AAA",
          backgroundColor: "#f4f3ee",
        }}
        >
        <Icon
                reverse
                name={expanded ? "chevron-up" : "chevron-down"}
                type="font-awesome"
                size={8}
                color={
                  expanded
                    ? globalColors.iconCollapse
                    : globalColors.iconExpand
                }
              />
        <Text
          style={{
            textAlignVertical: "center",
            marginRight: 10,
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          {item.Title}
        </Text>
      </View>
    );
  };
  const renderContent = (item) => {
    return (
      <Text
        style={{
          backgroundColor: "#fff",
          paddingVertical: 10,
          paddingHorizontal: 20,
          alignContent: "stretch",
          borderWidth: 1,
          borderTopWidth: 0,
          borderColor: "#AAA",
        }}
      >
        رنگ محصولات کاملا طبیعی و با سطح صاف و صیقلی جهت استفاده آسان مشتری بوده
        و از مرغوب ترین چوب های صنوبر ایرانی و روسی تهیه شده است. همچنین تولید
        محصول مطابق با استاندارد تعیین شده بازخورد تلفیق صحیح واحدهای تولید، فنی
        و کنترل کیفیت می باشد. محصولات تولید شده بر اساس شکل ظاهری، میزان کیفیت
        و ابعاد به چهار گریدA+ ، A، AB و C تقسیم بندی می شوند.
      </Text>
    );
  };

  const keyExtractor = (item, index) => item.Id.toString();
  const renderItem = ({ item }) => {
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
          renderHeader={renderHeader}
        />
      </Swipeable>
    );
  };

  return (
    <Container>
      <Content>
        <Button onPress={pullData}>
          <Text>Pull data</Text>
        </Button>
        <Text>فهرست محصولات</Text>
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
