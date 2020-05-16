import React, { Component } from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";

export default class Logo extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="center"
            style={styles.tinyLogo}
            source={require("../images/logo-oval-red-en.png")}
          />
        </View>
        <Text style={styles.logoText}>اتوماسیون جامع مزمز</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  imageContainer: { flex: 3 },
  tinyLogo: {
    flex: 1,
  },
  logoText: {
    flex: 3,
    fontWeight: "bold",
    fontSize: 20,
    color: "rgba(255,255,255,0.7)",
  },
});
