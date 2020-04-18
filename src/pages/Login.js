import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, TouchableOpacity} from 'react-native';
import Logo from '../components/Logo';
import Form from '../components/Form';

export default class Login extends Component<{}> {

    signup() {
        // Actions.signup();
    }


    render() {
        return (
            <View style={styles.container}>
                <Logo/>
                <Form type={'Login'}/>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>هنوز حساب کاریری ندارید؟ </Text>
                    <TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}>ایجاد حساب
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
    signupTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row-reverse',
    },
    signupText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16,
    },
    signupButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
    },
});
