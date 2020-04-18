import React, {Component} from 'react';
import {Text, Image, StyleSheet, View} from 'react-native';

export default class Logo extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.tinyLogo} source={require('../images/Logo.png')} />
        <Text style={styles.logoText}>
          اتوماسیــــــون جامـــــــع مـــزمـــز
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 354,
    height: 164,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoText: {
    marginVertical: 8,
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
  },
});
