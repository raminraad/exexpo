import React from 'react';
import {View, StyleSheet, TouchableHighlight} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

// import{ AuthContext } from '../components/context';

export function DrawerContent(props) {

    const [isDarkTheme, setIsDarkTheme] = React.useState(false);

    // const { signOut } = React.useContext(AuthContext);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    return (
        <View style={{flex: 1, backgroundColor: '#4f6d7a'}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 15,
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}>
                            <View style={{marginLeft: 15, flexDirection: 'column'}}>
                                <Title style={styles.title}>رامین راد</Title>
                                <Caption style={styles.caption}>@raminraad</Caption>
                                <Caption style={styles.caption}>کارشناس بازاریابی</Caption>
                            </View>
                            <Avatar.Image
                                source={require('../images/xxx_avatar.png')}
                                size={120}
                            />
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>94</Paragraph>
                                <Caption style={styles.caption}>بازدید شده</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>174</Paragraph>
                                <Caption style={styles.caption}>کل زیرمجموعه</Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' style={styles.drawerItemHighlight}
                                            onPress={() => {
                                                props.navigation.navigate('Home')
                                            }}>
                            <View
                                style={styles.preference}>
                                <Text style={styles.drawerItemLabel}>صفحه اصلی</Text>
                                <IconCommunity style={styles.drawerItemIcon}
                                               name="home"
                                               size={20}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)'
                                            style={styles.drawerItemHighlight}
                                            onPress={() => {
                                                props.navigation.navigate('Home')
                                            }}>
                            <View
                                style={styles.preference}>
                                <Text style={styles.drawerItemLabel}>کاربری و دسترسی</Text>
                                <IconCommunity style={styles.drawerItemIcon}
                                               name="shield-account"
                                               size={20}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)'
                                            style={styles.drawerItemHighlight}
                                            onPress={() => {
                                                props.navigation.navigate('Home')
                                            }}>
                            <View
                                style={styles.preference}>
                                <Text style={styles.drawerItemLabel}>کاربران</Text>
                                <IconCommunity style={styles.drawerItemIcon}
                                               name="account"
                                               size={20}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)'
                                            style={styles.drawerItemHighlight}
                                            onPress={() => {
                                                props.navigation.navigate('Home')
                                            }}>
                            <View
                                style={styles.preference}>
                                <Text style={styles.drawerItemLabel}>عمومی</Text>
                                <IconMaterial style={styles.drawerItemIcon}
                                              name="public"
                                              size={20}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)'
                                            style={styles.drawerItemHighlight}
                                            onPress={() => {
                                                // props.navigation.navigate('SettingScreen')
                                                alert('Setting')

                                            }}>
                            <View
                                style={styles.preference}>
                                <Text style={styles.drawerItemLabel}>تنظیمات</Text>
                                <IconMaterial style={styles.drawerItemIcon}
                                              name="settings"
                                              size={20}/>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)'
                                            style={styles.drawerItemHighlight}
                                            onPress={() => {
                                                // props.navigation.navigate('SettingScreen')
                                                alert('You\'ve been logged out');
                                            }}>
                            <View
                                style={styles.preference}>
                                <Text style={styles.drawerItemLabel}>خروج</Text>
                                <IconCommunity style={styles.drawerItemIcon}
                                               name="logout"
                                               size={20}/>
                            </View>
                        </TouchableHighlight>

                    </Drawer.Section>

                    <Drawer.Section style={{borderTopWidth: 0.5}}>
                        <Text style={styles.sectionHeader}>وضعیت کنونی سیستم</Text>
                        <View style={styles.preference}>
                            <Text style={styles.statusLabel}>1399/02/03 14:28:11</Text>
                            <Text style={styles.statusLabel}>ورود قبلی</Text>
                        </View>
                        <View style={styles.preference}>
                            <Text style={styles.statusLabel}>17</Text>
                            <Text style={styles.statusLabel}>آنلاین در پرتال</Text>
                        </View>
                        <View style={styles.preference}>
                            <Text style={styles.statusLabel}>4</Text>
                            <Text style={styles.statusLabel}>ورود امروز کاربران</Text>
                        </View>
                        <View style={styles.preference}>
                            <Text style={styles.statusLabel}>428</Text>
                            <Text style={styles.statusLabel}>ورود ماه اخیر کاربران</Text>
                        </View>
                        <View style={styles.preference}>
                            <Text style={styles.statusLabel}>2</Text>
                            <Text style={styles.statusLabel}>اعلانات کاربر</Text>
                        </View>
                        <View style={styles.preference}>
                            <Text style={styles.statusLabel}>5</Text>
                            <Text style={styles.statusLabel}>در انتظار تأیید</Text>
                        </View>

                    </Drawer.Section>

                </View>
            </DrawerContentScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        display: 'flex',
    },
    userInfoSection: {
        padding: 20,
    },
    title: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 22,
        fontWeight: 'bold',
    },
    caption: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        borderTopWidth: 0.7,
        marginTop: 15,
        alignItems: 'flex-end',
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
        paddingHorizontal: 16
    },
    statusLabel: {
        color: 'rgba(255,255,255,0.9)',
    },
    drawerItemLabel: {
        color: 'rgba(255,255,255,0.9)',
        marginRight: 15
    },
    drawerItemIcon: {
        color: 'rgba(255,255,255,0.7)',
    },
    sectionHeader: {
        color: 'rgba(255,255,255,0.4)',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22,
        marginVertical: 10,
    },
    drawerItemHighlight: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'stretch',
    }

});
