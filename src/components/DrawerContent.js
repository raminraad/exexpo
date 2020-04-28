import React from 'react';
import {View, StyleSheet} from 'react-native';
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

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
                        <DrawerItem
                            labelStyle={styles.drawerItemLabel}
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="صفحه اصلی"
                            onPress={() => {
                                props.navigation.navigate('Home')
                            }}
                        />
                        <DrawerItem
                            labelStyle={styles.drawerItemLabel}
                            icon={({color, size}) => (
                                <Icon
                                    name="account-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="کاربری و دسترسی"
                            onPress={() => {
                                props.navigation.navigate('Profile')
                            }}
                        />
                        <DrawerItem
                            labelStyle={styles.drawerItemLabel}
                            icon={({color, size}) => (
                                <Icon
                                    name="account"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="کاربران"
                            onPress={() => {
                                props.navigation.navigate('Members')
                            }}
                        /><DrawerItem
                        labelStyle={styles.drawerItemLabel}
                        icon={({color, size}) => (
                            <Icon
                                name="car-brake-parking"
                                color={color}
                                size={size}
                            />
                        )}
                        label="عمومی"
                        onPress={() => {
                            props.navigation.navigate('BookmarkScreen')
                        }}
                    />
                    </Drawer.Section>
                    <Drawer.Section style={{borderTopWidth: 0.5}}>
                        <Text style={styles.sectionHeader}>وضعیت کنونی سیستم</Text>
                        <View style={styles.preference}>
                            <Text style={styles.drawerItemLabel}>1399/02/03 14:28:11</Text>
                            <Text style={styles.drawerItemLabel}>ورود قبلی</Text>
                        </View>
                        <View style={styles.preference}>
                            <Text style={styles.drawerItemLabel}>17</Text>
                            <Text style={styles.drawerItemLabel}>آنلاین در پرتال</Text>
                        </View>
                        <View style={styles.preference}>
                            <Text style={styles.drawerItemLabel}>4</Text>
                            <Text style={styles.drawerItemLabel}>ورود امروز کاربران</Text>
                        </View>
                        <View style={styles.preference}>
                            <Text style={styles.drawerItemLabel}>428</Text>
                            <Text style={styles.drawerItemLabel}>ورود ماه اخیر کاربران</Text>
                        </View>
                        <View style={styles.preference}>
                            <Text style={styles.drawerItemLabel}>2</Text>
                            <Text style={styles.drawerItemLabel}>اعلانات کاربر</Text>
                        </View>
                        <View style={styles.preference}>
                            <Text style={styles.drawerItemLabel}>5</Text>
                            <Text style={styles.drawerItemLabel}>در انتظار تأیید</Text>
                        </View>

                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            labelStyle={styles.drawerItemLabel}
                            icon={({color, size}) => (
                                <Icon
                                    name="settings-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="تنظیمات"
                            onPress={() => {
                                props.navigation.navigate('SettingScreen')
                            }}
                        />
                        <DrawerItem
                            labelStyle={styles.drawerItemLabel}
                            icon={({color, size}) => (
                                <Icon
                                    name="logout"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="خروج"
                            onPress={() => {
                                props.navigation.navigate('SupportScreen')
                            }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
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
        alignItems: 'flex-end'
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    drawerItemLabel: {
        color: 'rgba(255,255,255,0.9)',
    },
    sectionHeader: {
        color: 'rgba(255,255,255,0.4)',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22,
        marginVertical: 10
    }

});
