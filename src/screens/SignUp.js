import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import Logo from '../components/Logo';

export default class SignUp extends Component<{}> {
    constructor() {
        super();
        this.gotoLogin = this.gotoLogin.bind(this);
    }

    gotoLogin() {
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View style={styles.container}>
                <Logo/>
                <View style={styles.container}><TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    textA lign="right"
                    placeholder="نام کاربری"
                    keyboardType='email-address'
                    onSubmitEditing={() => this.password.focus()}
                />
                    <TextInput
                        style={styles.inputBox}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        textAlign="right"
                        secureTextEntry={true}
                        placeholder="گذرواژه"
                        ref={(input) => this.password = input}
                    />
                    <TouchableOpacity style={styles.button}>
                        <Text
                            style={styles.buttonText}>ایجاد حساب</Text>
                    </TouchableOpacity></View>

                <View style={styles.signUpTextCont}>
                    <Text style={styles.signUpText}>
                        قبلاً حساب کاربری ایجاد کرده اید؟{' '}
                    </Text>
                    <TouchableOpacity onPress={this.gotoLogin}><Text
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
    inputBox: {
        width: 300,
        height: 50,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: 'rgba(255,255,255,1)',
        marginVertical: 10,
    },
    button: {
        width: 300,
        height: 50,
        marginVertical: 10,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        paddingVertical: 13,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center',
    }
});
