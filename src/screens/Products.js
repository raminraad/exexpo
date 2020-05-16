import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
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
  View,
} from "native-base";

export default function Products() {
  const [data, setData] = useState("");
  const [freshToken, setFreshToken] = useState(
    "707332fe-b50f-4983-7120-ed2052b619e7"
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

    fetch(
      "http://audit.mazmaz.net/Api/WebApi.asmx/SyncServerData",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.d.Response.Token) {
          setFreshToken(result.d.Response.Token);
          setData(result.d.DataTables.ProductGroup);
        } else alert(result.d.Response.Message);
      })
      .catch((error) => console.log("error", error));
  };
  const keyExtractor = (item, index) => item.key.toString();

  const renderItem = (item) => (
    <ListItem style={styles.itemContainer}>
      <Text >{item.Title}</Text>
  </ListItem>
  );
  return (
    <Container>
      <Header />
      <Content>
        <Button onPress={pullData}>
          <Text>Pull data</Text>
        </Button>
        <Text>فهرست محصولات</Text>
        <List itemDivider dataArray={data} renderRow={renderItem} />
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row-reverse",
  },
  itemText: {
    fontSize: 20,
  },
});
