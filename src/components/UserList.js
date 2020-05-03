import {ListItem} from 'react-native-elements'
import React, {Component} from 'react';
import {FlatList, ScrollView, Text} from "react-native";
/*import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);*/

const list = [
    {
        JobTitle: 'مدیر عامل',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/irae/128.jpg',
        fullname: 'پرویز صدرعاملی'
    },
    {
        username: 'رئیس انتظامات',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/flashmurphy/128.jpg',
        fullname: 'عباس کردنوری'
    },
    {
        username: 'کارشناس فنی',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/flexrs/128.jpg',
        fullname: 'نادر فریادشیران'
    },
    {
        username: 'مدیر تحقیق و توسعه',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/funwatercat/128.jpg',
        fullname: 'کاظم اولیایی'
    },
    {
        username: 'پشتیبانی فروش',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/g1sh/128.jpg',
        fullname: 'رضا افتخاری'
    },
    {
        username: 'رئیس حسابداری',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/jefffis/128.jpg',
        fullname: 'ایران امیررضا واعظی آشتیانی'
    },
    {
        username: 'معاون توسعه مدیریت و منابع',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/HenryHoffman/128.jpg',
        fullname: 'امیر حسن زرنانی'
    },
    {
        username: 'دبیر هیات عالی نظارت',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/SlaapMe/128.jpg',
        fullname: 'فاضل شکری'
    },
    {
        username: 'عضو هيأت‌عامل',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/RussellBishop/128.jpg',
        fullname: 'سید علیرضا رضوی'
    },
    {
        username: 'قائم مقام و عضو هيأت‌عامل',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/SULiik/128.jpg',
        fullname: 'علی اکبر صبور یراقی'
    },
    {
        username: 'مدیر ارشد حسابرسی',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/jennyshen/128.jpg',
        fullname: 'فروغ گلساز شیرازی'
    },
    {
        username: 'مدیر ارشد مجله حسابرس',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/michzen/128.jpg',
        fullname: 'محمد مهدی امیری'
    },
    {
        username: 'معاون فنی',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/9lessons/128.jpg',
        fullname: 'محمد رضا پورمند'
    },
    {
        username: 'معاون مالی',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/AM_Kn2/128.jpg',
        fullname: 'محمد مهدی سلطان دلال'
    },
    {
        username: 'معاون برنامه ریزی',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/IsaryAmairani/128.jpg',
        fullname: 'معصومه دورقی'
    },
];

class UserList extends Component {
    keyExtractor = (item, index) => index.toString();

    renderItem = ({item}) => (
        <ListItem subtitle={item.username}
                  title={item.fullname}
                  rightAvatar={{source: {uri: item.avatar_url}, size: 64}}
                  topDivider
            // chevron
        />
    );

    render() {
        return (
            <FlatList
                keyExtractor={this.keyExtractor}
                data={list}
                renderItem={this.renderItem}
            />
        )
    }
}

export default UserList;
