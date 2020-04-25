import React, {Component} from 'react';
import {Text, Image, StyleSheet, View} from 'react-native';

export default class Logo extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.tinyLogo} source={require('../images/logo-oval-red-en.png')}/>
                <Text style={styles.logoText}>
                    اتوماسیون جامع مزمز
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
        alignItems: 'center',
    },
    logoText: {
        marginVertical: 8,
        fontWeight: 'bold',
        fontSize: 26,
        color: 'rgba(255,255,255,0.7)',
    }
});
