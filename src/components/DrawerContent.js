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
    }

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop: 15,justifyContent:'space-around',alignItems:'center'}}>
                            <View style={{marginLeft: 15, flexDirection: 'column'}}>
                                <Title style={styles.title}>رامین راد</Title>
                                <Caption style={styles.caption}>@raminraad</Caption>
                                <Caption style={styles.caption}>کارشناس بازاریابی</Caption>
                            </View>
                            <Avatar.Image
                                source={require('../images/xxx_avatar.png')}
                                size={100}
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
                        <DrawerItem
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
                    <Drawer.Section title="وضعیت کنونی                                                              ">
                        <View style={styles.preference}>
                            <Text>1399/02/03 14:28:11</Text>
                            <Text>ورود قبلی</Text>
                        </View>
                        <View style={styles.preference}>
                            <Text>17</Text>
                            <Text>آنلاین در پرتال</Text>
                        </View>
                        <View style={styles.preference}>
                            <Text>4</Text>
                            <Text>ورود امروز کاربران</Text>
                        </View>
                        <View style={styles.preference}>
                            <Text>428</Text>
                            <Text>ورود ماه اخیر کاربران</Text>
                        </View>
                        <View style={styles.preference}>
                            <Text>2</Text>
                            <Text>اعلانات کاربر</Text>
                        </View>
                        <View style={styles.preference}>
                            <Text>5</Text>
                            <Text>در انتظار تأیید</Text>
                        </View>

                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="خروج"
                    onPress={() => {
                        Alert('signOut()')
                    }}
                />
            </Drawer.Section>
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
        fontSize: 18,
        fontWeight: 'bold',
    },
    caption: {
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
        marginTop: 15,
        alignItems: 'flex-end'
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
