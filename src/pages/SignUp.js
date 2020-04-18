import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Logo from '../components/Logo';
import Form from '../components/Form';

export default class SignUp extends Component<{}> {

    render() {
        return (
            <View style={styles.container}>
                <Logo/>
                <Form type={'SignUp'}/>
                <View style={styles.signUpTextCont}>
                    <Text style={styles.signUpText}>
                        قبلاً حساب کاربری ایجاد کرده اید؟{' '}
                    </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}><Text
                        style={styles.signUpButton}>ورود به
                        حساب</Text></TouchableOpacity>
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
