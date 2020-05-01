import { ListItem } from 'react-native-elements'
import React, {Component} from 'react';
import {Image, Text,View,StyleSheet,FlatList} from "react-native";

    const list = [
        {
            name: 'فرهاد پیرنیا',
            subtitle: 'مدیر مارکتینگ'
        },
        {
            name: 'آتوسا نیک فال',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: 'ویزیتور'
        },
    ];
class MemberList extends Component {

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => (
        <ListItem
            title={item.name}
            subtitle={item.subtitle}
            leftAvatar={{
                source: item.avatar_url && { uri: item.avatar_url },
                title: item.name[0]
            }}
            bottomDivider
            chevron
        />
    );

    render () {
        return (
            <FlatList
                keyExtractor={this.keyExtractor}
                data={list}
                renderItem={this.renderItem}
            />
        )
    }
}



export default MemberList;


const styles = StyleSheet.create({
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    ratingImage: {
        height: 19.21,
        width: 100
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey'
    }
});
