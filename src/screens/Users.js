import React, { Component, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Header } from "react-native-elements";
import IconFeather from 'react-native-vector-icons/Feather';
import { Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';
import { Divider } from "react-native-paper";
import UserItem from '../components/UserItem';
import UserAdd from "../components/UserAdd";
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles, colors, sizeOfIcons } from '../styles/global';



const userList = [
    {
        key: 1,
        jobTitle: 'مدیر فروش',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/krystalfister/128.jpg',
        fName: 'ارغوان',
        lName: 'صدرعاملی',
        description: 'دارای سابقه کاری در زمینه فروش مواد غذایی و قطعات کامپیوتر'
    },
    {
        key: 2,
        jobTitle: 'رئیس انتظامات',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/joshuasortino/128.jpg',
        fName: 'عباس',
        lName: 'فکوری',
        description: 'مشغول بکار بصورت آزمایشی'
    },
    {
        key: 3,
        jobTitle: 'کارشناس فنی',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/flexrs/128.jpg',
        fName: 'نادر',
        lName: 'فریادشیران',
        description: 'فوق لیسانس صنایع از دانشگاه صنعتی شریف'
    },
    {
        key: 4,
        jobTitle: 'مدیر تحقیق و توسعه',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/funwatercat/128.jpg',
        fName: 'کاظم',
        lName: 'اولیایی',
        description: 'با سابقه 15 ساله در زمینه تولید مواد شوینده و بهداشتی'
    },
    {
        key: 5,
        jobTitle: 'پشتیبانی فروش',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/g1sh/128.jpg',
        fName: 'رضا ',
        lName: 'افتخاری',
    },
    {
        key: 6,
        jobTitle: 'رئیس حسابداری',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/jefffis/128.jpg',
        fName: 'امیررضا',
        lName: 'آشتیانی',
    },
    {
        key: 7,
        jobTitle: 'معاون توسعه مدیریت و منابع',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/HenryHoffman/128.jpg',
        fName: 'امیر',
        lName: 'زهیرنیا',
    },
    {
        key: 8,
        jobTitle: 'دبیر هیات عالی نظارت',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/SlaapMe/128.jpg',
        fName: 'فاضل',
        lName: 'شریفی نیا',
    },
    {
        key: 9,
        jobTitle: 'عضو هيأت‌عامل',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/RussellBishop/128.jpg',
        fName: 'شهرام ',
        lName: 'فراهانی',
    },
    {
        key: 10,
        jobTitle: 'قائم مقام و عضو هيأت‌عامل',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/SULiik/128.jpg',
        fName: 'علی ',
        lName: 'بختیاری',
    },
    {
        key: 11,
        jobTitle: 'مدیر ارشد حسابرسی',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/jennyshen/128.jpg',
        fName: 'فروغ',
        lName: 'هویدا',
    },
    {
        key: 12,
        jobTitle: 'مدیر ارشد مجله حسابرس',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/michzen/128.jpg',
        fName: 'محمد',
        lName: 'مصباح',
    },
    {
        key: 13,
        jobTitle: 'معاون فنی',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/9lessons/128.jpg',
        fName: 'محمد',
        lName: 'فرخنده زاد',
    },
    {
        key: 14,
        jobTitle: 'معاون مالی',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/AM_Kn2/128.jpg',
        fName: 'پرهام',
        lName: 'نزاکت',
    },
    {
        key: 15,
        jobTitle: 'معاون برنامه ریزی',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/IsaryAmairani/128.jpg',
        fName: 'رزا',
        lName: 'هادی نیا',
    },
];

class ModuleHeader extends React.Component<{ navigation: any }> {
    render() {
        let { navigation } = this.props;
        return (
            <Header
                backgroundColor='#E7E7EE'
                //todo: replace paddingVertical with centering vertically
                placement="center"
                rightComponent={<IconFeather
                    color={'#006494'}
                    onPress={() => this.props.navigation.toggleDrawer()}
                    name={"menu"}
                    size={sizeOfIcons.medium} />}

                centerComponent={{ text: this.props.title, style: { fontSize: 24, color: '#006494' } }}
                containerStyle={styles.headerContainerStyle}
                leftComponent={
                    <IconFeather
                        onPress={() => navigation.goBack()}
                        color={'#006494'}
                        name={"chevron-left"}
                        size={sizeOfIcons.medium} />
                }
            />
        );
    }
}

function ModuleFooter(props) {
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
                                name={"star"}
                                size={sizeOfIcons.large} />
                        } />
                        <MenuOptions customStyles={optionsStyles}>
                            <MenuOption onSelect={() => alert(`Item1`)} text='گزینه 1' />
                            <Divider />
                            <MenuOption onSelect={() => alert(`Item2`)} text='گزینه 2' />
                            <Divider />
                            <MenuOption onSelect={() => alert(`Item3`)} text='گزینه 3' />
                            <Divider />
                            <MenuOption onSelect={() => alert(`Item4`)} disabled={true} text='گزینه 4' />
                        </MenuOptions>
                    </Menu>
                </View>


            }
            centerComponent={<IconFeather
                onPress={props.onPressSearch}
                color={'rgba(0,0,0,0.6)'}
                name={"search"}
                size={sizeOfIcons.large} />}

            leftComponent={<IconFeather
                onPress={props.onPressAdd}
                color={'rgba(0,0,0,0.6)'}
                name={"plus-circle"}
                size={sizeOfIcons.large} />}


        />
    );
}

function Users(props) {

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [items, setItems] = useState(userList)
    const addItem = (item) => {
        item.key = Math.random().toString();
        setItems((currentItems) => {
            return [item, ...currentItems]
        });
        setAddModalOpen(false);
    }
    const deleteItem = (itemKey) => {
        const index = items.findIndex(i => i.key === itemKey);
            items.splice(index, 1);
        setItems([...items]);
    }

    const search = (item) => {
        //todo: separate main list and view list
        setItems(userList);
        setItems((currentItems) => {
            return currentItems.filter(c =>
                (!item.fName || String(c.fName).includes(item.fName)) &&
                (!item.lName || String(c.lName).includes(item.lName)) &&
                (!item.jobTitle || String(c.jobTitle).includes(item.jobTitle)) &&
                (!item.description || String(c.description).includes(item.description))
            )
        });
        setSearchModalOpen(false);
    }
    const keyExtractor = (item, index) => item.key.toString();

    const renderItem = ({ item }) => (
        <UserItem item={item} onDelete={deleteItem} />
    );
    return (
        <View style={{ display: 'flex', justifyContent: 'flex-start', flex: 1 }}>
            <Modal visible={addModalOpen} animationType='slide'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContent}>
                        <UserAdd onSubmit={addItem} onCancel={() => setAddModalOpen(false)} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <Modal visible={searchModalOpen} animationType='slide'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContent}>
                        <UserAdd onSubmit={search} onCancel={() => setSearchModalOpen(false)} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <ModuleHeader navigation={props.navigation} title='کاربران' />
            <FlatList
                keyExtractor={keyExtractor}
                data={items}
                renderItem={renderItem} />
            <ModuleFooter onPressAdd={() => setAddModalOpen(true)} onPressSearch={() => setSearchModalOpen(true)} />
        </View>
    );
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
        borderTopWidth: 3,
        paddingHorizontal: 90,
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
    modalContent: {
        flex: 1,
    },
})
