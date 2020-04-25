import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import DrawerHeader from "../components/DrawerHeader";


function Home({navigation}) {
    return (
        <View>
            <DrawerHeader style={styles.container} navigation={navigation}/>
            <Text>This is my Home</Text>
        </View>
    );
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
