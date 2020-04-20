import React, {Component} from 'react';
import {StyleSheet, Text, View} from "react-native";


class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>This is my Home</Text>
            </View>
        );
    }
}

export default Home;


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#455a64',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
