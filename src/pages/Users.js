import React from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import DrawerHeader from "../components/DrawerHeader";
import UserList from "../components/UserList";
import {Header, Icon} from "react-native-elements";
import IconMaterial from 'react-native-vector-icons/MaterialIcons';


class CrudHeader extends React.Component<{ navigation: any }> {
    render() {
        let {navigation} = this.props;
        return (
            <Header
                backgroundColor='#457b9d'
                linearGradientProps={{
                    colors: ['#003049', '#457b9d'],
                    start: {x: 0, y: 0.5},
                    end: {x: 1, y: 0.5},
                }}
                //todo: replace paddingVertical with centering vertically
                containerStyle={{paddingVertical: 20, alignContent: 'center', justifyContent: 'center'}}
                placement="center"
                rightComponent={<Icon
                    onPress={() => alert('more')}
                    reverse
                    style={{textAlignVertical: "center"}}
                    name='ios-more'
                    type='ionicon'
                    color='#517fa4'
                />}
                centerComponent={<Icon
                    onPress={() => alert('search')}
                    reverse
                    style={{textAlignVertical: "center"}}
                    name='ios-search'
                    type='ionicon'
                    color='#517fa4'
                />}
                leftComponent={<Icon
                    onPress={() => navigation.navigate('Home')}
                    reverse
                    style={{textAlignVertical: "center"}}
                    name='ios-arrow-back'
                    type='ionicon'
                    color='#517fa4'
                />}
            />
        );
    }
}

function Users({navigation}) {
    return (
        <View style={{display: 'flex', justifyContent: 'flex-start', flex: 1}}>
            <CrudHeader navigation={navigation} title='کاربران'/>
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
