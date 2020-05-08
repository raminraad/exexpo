import React, {Component} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from "react-native";
import {Header} from "react-native-elements";
import IconFeather from 'react-native-vector-icons/Feather';
import {Menu, MenuOptions, MenuOption, MenuTrigger,} from 'react-native-popup-menu';
import {Divider} from "react-native-paper";
import UserItem from '../components/UserItem';
import UserAddModal from "../components/UserAddModal";

const iconSize = 32;
const list = [
    {
        jobTitle: 'مدیر فروش',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/krystalfister/128.jpg',
        fullname: 'ارغوان صدرعاملی',
        description: 'دارای سابقه کاری در زمینه فروش مواد غذایی و قطعات کامپیوتر'
    },
    {
        jobTitle: 'رئیس انتظامات',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/joshuasortino/128.jpg',
        fullname: 'عباس کردنوری',
        description: 'مشغول بکار بصورت آزمایشی'
    },
    {
        jobTitle: 'کارشناس فنی',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/flexrs/128.jpg',
        fullname: 'نادر فریادشیران',
        description: 'فوق لیسانس صنایع از دانشگاه صنعتی شریف'
    },
    {
        jobTitle: 'مدیر تحقیق و توسعه',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/funwatercat/128.jpg',
        fullname: 'کاظم اولیایی',
        description: 'با سابقه 15 ساله در زمینه تولید مواد شوینده و بهداشتی'
    },
    {
        jobTitle: 'پشتیبانی فروش',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/g1sh/128.jpg',
        fullname: 'رضا افتخاری'
    },
    {
        jobTitle: 'رئیس حسابداری',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/jefffis/128.jpg',
        fullname: 'ایران امیررضا واعظی آشتیانی'
    },
    {
        jobTitle: 'معاون توسعه مدیریت و منابع',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/HenryHoffman/128.jpg',
        fullname: 'امیر حسن زرنانی'
    },
    {
        jobTitle: 'دبیر هیات عالی نظارت',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/SlaapMe/128.jpg',
        fullname: 'فاضل شکری'
    },
    {
        jobTitle: 'عضو هيأت‌عامل',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/RussellBishop/128.jpg',
        fullname: 'سید علیرضا رضوی'
    },
    {
        jobTitle: 'قائم مقام و عضو هيأت‌عامل',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/SULiik/128.jpg',
        fullname: 'علی اکبر صبور یراقی'
    },
    {
        jobTitle: 'مدیر ارشد حسابرسی',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/jennyshen/128.jpg',
        fullname: 'فروغ گلساز شیرازی'
    },
    {
        jobTitle: 'مدیر ارشد مجله حسابرس',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/michzen/128.jpg',
        fullname: 'محمد مهدی امیری'
    },
    {
        jobTitle: 'معاون فنی',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/9lessons/128.jpg',
        fullname: 'محمد رضا پورمند'
    },
    {
        jobTitle: 'معاون مالی',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/AM_Kn2/128.jpg',
        fullname: 'محمد مهدی سلطان دلال'
    },
    {
        jobTitle: 'معاون برنامه ریزی',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/IsaryAmairani/128.jpg',
        fullname: 'معصومه دورقی'
    },
];

class ModuleHeader extends React.Component<{ navigation: any }> {
    render() {
        let {navigation} = this.props;
        return (
            <Header
                backgroundColor='#E7E7EE'
                //todo: replace paddingVertical with centering vertically
                placement="center"
                rightComponent={<IconFeather
                    color={'#006494'}
                    onPress={() => this.props.navigation.toggleDrawer()}
                    name={"menu"}
                    size={iconSize}/>}

                centerComponent={{text: this.props.title, style: {fontSize: 24, color: '#006494'}}}
                containerStyle={styles.headerContainerStyle}
                leftComponent={
                    <IconFeather
                        onPress={() => this.props.navigation.goBack()}
                        color={'#006494'}
                        name={"chevron-left"}
                        size={iconSize}/>
                }
            />
        );
    }
}

class ModuleFooter extends React.Component<{ navigation: any }> {
    constructor() {
        super();
        this.onPressAdd=this.onPressAdd.bind(this);
    }
    onPressAdd(){
        this.refs.addModal.showModal()
    }
    render() {
        let {navigation} = this.props;
        return (
            <Header
                backgroundColor='#E7E7EE'
                // linearGradientProps={{
                //     colors: ['#118ab2', '#118ab2'],
                //     start: {x: 0, y: 0.5},
                //     end: {x: 1, y: 0.5},
                // }}
                //todo: replace paddingVertical with centering vertically
                containerStyle={styles.footerContainerStyle}
                placement="center"
                rightComponent={
                    <View>
                        <Menu>
                            <MenuTrigger children={
                                <IconFeather
                                    color={'rgba(0,0,0,0.6)'}
                                    name={"more-vertical"}
                                    size={iconSize}/>
                            }/>
                            <MenuOptions customStyles={optionsStyles}>
                                <MenuOption onSelect={() => alert(`Item1`)} text='گزینه 1'/>
                                <Divider/>
                                <MenuOption onSelect={() => alert(`Item2`)} text='گزینه 2'/>
                                <Divider/>
                                <MenuOption onSelect={() => alert(`Item3`)} text='گزینه 3'/>
                                <Divider/>
                                <MenuOption onSelect={() => alert(`Item4`)} disabled={true} text='گزینه 4'/>
                            </MenuOptions>
                        </Menu>
                        <UserAddModal ref={'addModal'} parentFaltList={this}/>
                    </View>


                }
                centerComponent={<IconFeather
                    onPress={() => alert('جستجو')}
                    color={'rgba(0,0,0,0.6)'}
                    name={"search"}
                    size={iconSize}/>}

                leftComponent={<IconFeather
                    onPress={() => this.onPressAdd()}
                    color={'rgba(0,0,0,0.6)'}
                    name={"plus-circle"}
                    size={iconSize}/>}


            />
        );
    }
}

class UserList extends Component {
    keyExtractor = (item, index) => index.toString();

    renderItem = ({item}) => (
            <UserItem item={item}/>
    );

    render() {
        return (
                <FlatList
                keyExtractor={this.keyExtractor}
                data={list}
                renderItem={this.renderItem}/>
        )
    }
}

class Users extends Component<{ navigation: any }> {
    render() {
        let {navigation} = this.props;
        return (
            <View style={{display: 'flex', justifyContent: 'flex-start', flex: 1}}>
                <ModuleHeader navigation={navigation} title='کاربران'/>
                <UserList/>
                <ModuleFooter navigation={navigation}/>
            </View>
        );
    }
}

export default Users;

const optionsStyles = {
    optionsContainer: {
        padding: 5,
        borderRadius: 5,
    },
    optionsWrapper: {},
    optionWrapper: {
        height: 50,
        justifyContent: 'center',

    },
    optionTouchable: {
        underlayColor: 'gold',
        activeOpacity: 70,
    },
    optionText: {
        fontSize: 16
    },
};

const styles = StyleSheet.create({
    footerContainerStyle:
        {
            paddingVertical: 20,
            alignContent: 'center',
            justifyContent: 'center',
            borderTopWidth: 3,
            borderTopColor: 'rgba(0,0,0,0.2)'
        },
    headerContainerStyle:
        {
            paddingVertical: 20,
            alignContent: 'center',
            justifyContent: 'center',
            borderBottomWidth: 3,
            borderBottomColor: 'rgba(0,0,0,0.2)'
        },
})
