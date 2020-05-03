import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import DrawerHeader from "../components/DrawerHeader";
import UserList from "../components/UserList";


function Users({navigation}) {
    return (
        <View>
            <DrawerHeader navigation={navigation} title='کاربران'/>
            <UserList style={styles.container}/>
        </View>
    );
}

export default Users;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#455a64',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
