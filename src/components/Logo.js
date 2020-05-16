import React, { Component } from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";

export default class Logo extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.tinyLogo}
          source={require("../images/logo-oval-red-en.png")}
        />

        <Text style={styles.logoText}>اتوماسیون جامع مزمز</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tinyLogo: {
    width: "40%",
    // Without height undefined it won't work
    height: undefined,
    // figure out your image aspect ratio
    aspectRatio: 30 / 20,
  },
  logoText: {
    fontWeight: "bold",
    fontSize: 24,
    color: "rgba(255,255,255,0.7)",
  },
});
