import React, {Component} from 'react';
import {Text, Image, StyleSheet, View} from 'react-native';
import { Divider } from 'react-native-paper';

export default class Logo extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>
                <Image resizeMode='contain' style={styles.tinyLogo} source={require('../images/logo-oval-red-en.png')}/>
                <Text style={styles.logoText}>
                    اتوماسیون جامع مزمز
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    },
    tinyLogo: {
        flex:5,
    },
    logoText: {
        flex:2,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'rgba(255,255,255,0.7)',
    }
});
