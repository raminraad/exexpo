import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Logo from '../components/Logo';
import Form from '../components/Form';

export default class Login extends Component<{}> {

    constructor({navigatioin}) {
        super(navigatioin);
    }

    render() {
        return (
            <View style={styles.container}>
                <Logo/>
                <Form type={'Login'}/>
                <View style={styles.signUpTextCont}>
                    <Text style={styles.signUpText}>هنوز حساب کاریری ندارید؟ </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}><Text
                        style={styles.signUpButton}>ایجاد حساب
                        کاربری</Text></TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#455a64',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUpTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row-reverse',
    },
    signUpText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16,
    },
    signUpButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
    },
});
