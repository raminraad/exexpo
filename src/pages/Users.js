import React, {Component} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from "react-native";
import DrawerHeader from "../components/DrawerHeader";
import {Header, Icon, ListItem} from "react-native-elements";
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import {Menu, MenuOptions, MenuOption, MenuTrigger,} from 'react-native-popup-menu';
import {Divider} from "react-native-paper";

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
                rightComponent={
                    <View>
                        <Menu>
                            <MenuTrigger children={
                                <Icon
                                    reverse
                                    style={{textAlignVertical: "center"}}
                                    name='ios-more'
                                    type='ionicon'
                                    color='#517fa4'/>
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
                    </View>


                }
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

const list = [
    {
        jobTitle: 'مدیر فروش',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/krystalfister/128.jpg',
        fullname: 'ارغوان صدرعاملی'
    },
    {
        jobTitle: 'رئیس انتظامات',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/joshuasortino/128.jpg',
        fullname: 'عباس کردنوری'
    },
    {
        jobTitle: 'کارشناس فنی',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/flexrs/128.jpg',
        fullname: 'نادر فریادشیران'
    },
    {
        jobTitle: 'مدیر تحقیق و توسعه',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/funwatercat/128.jpg',
        fullname: 'کاظم اولیایی'
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

class UserList extends Component {
    keyExtractor = (item, index) => index.toString();

    renderItem = ({item}) => (
        <ListItem subtitle={item.jobTitle}
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

function Users({navigation}) {
    return (
        <View style={{display: 'flex', justifyContent: 'flex-start', flex: 1}}>
            <UserList/>
            <CrudHeader navigation={navigation} title='کاربران'/>
            <View style={styles.addIconContainer}>
                <IconMaterial
                    onPress={() => alert('Add')}
                    color={'#40c778'}
                    name={"add-circle"}
                    size={98}/>
            </View>
        </View>
    );
}

export default Users;

const optionsStyles = {
    optionsContainer: {
        padding: 5,
        borderRadius: 5
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
