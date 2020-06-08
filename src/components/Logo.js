import React, { Component } from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as rxGlobal from "../lib/rxGlobal";

export default class Logo extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Ionicons name='ios-barcode' size={158} color={rxGlobal.globalColors.palette.glassyWhite} />
        <Text style={styles.logoText}>پویش فروش خُرده</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontWeight: "bold",
    fontSize: 24,
    color: rxGlobal.globalColors.palette.glassyWhite,
  },
});
