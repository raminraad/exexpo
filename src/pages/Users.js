import React from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import DrawerHeader from "../components/DrawerHeader";
import UserList from "../components/UserList";
import {Icon} from "react-native-elements";
import IconMaterial from 'react-native-vector-icons/MaterialIcons';


function Users({navigation}) {
    return (
        <View style={{display: 'flex', justifyContent: 'flex-start', flex: 1}}>
            <DrawerHeader navigation={navigation} title='کاربران'/>
            <UserList/>
            <View style={styles.addIconContainer}>
                <IconMaterial
                    onPress={() => alert('Add')}
                    color={'#40c778'}
                    name={"add-circle"}
                    size={111}/>
            </View>
        </View>
    );
}

export default Users;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#455a64',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addIconContainer: {
        flex: 1,
        width: 111,
        justifyContent: 'flex-end',
    },
    listContainer: {},
});
