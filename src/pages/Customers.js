import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import DrawerHeader from "../components/DrawerHeader";
import ModuleList from "../components/ModuleList";


function Home({navigation}) {
    return (
        <View>
            <DrawerHeader  navigation={navigation}/>
            <ModuleList style={styles.container}/>
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
