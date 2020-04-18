import React, {Component,useState} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import Logo from '../components/Logo';


export default class Login extends Component<{}> {
    constructor({navigatioin}) {
        super(navigatioin);
        this.gotoSignUp = this.gotoSignUp.bind(this);
        this.checkLoginInfo = this.checkLoginInfo.bind(this);
    }

    checkLoginInfo() {
        if (this.username === 'a')
            this.props.navigation.navigate('SignUp');
    }

    gotoSignUp() {
        this.props.navigation.navigate('SignUp')
    }

    render() {
        return <View style={styles.container}>
            <Logo/>
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    textAlign="right"
                    placeholder="نام کاربری"
                    keyboardType='email-address'
                    onSubmitEditing={() => this.password.focus()}
                    onChangeText={text => this.username = text}
                    ref={(input) => this.username = input}
                />
                <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    textAlign="right"
                    secureTextEntry={true}
                    placeholder="گذرواژه"
                    ref={(input) => this.password = input}
                />
                <Text
                    style={styles.wrongLoginInfo}>نام کاربری و یا کلمه عبور اشتباه است</Text>
                <TouchableOpacity style={styles.button} onPress={this.checkLoginInfo}>
                    <Text
                        style={styles.buttonText}>ورود به حساب</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.signUpTextCont}>
                <Text style={styles.signUpText}>هنوز حساب کاریری ندارید؟ </Text>
                <TouchableOpacity onPress={this.gotoSignUp}><Text
                    style={styles.signUpButton}>ایجاد حساب
                    کاربری</Text></TouchableOpacity>
            </View>
        </View>;
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
        color: '#fff',
        textAlign: 'center',
    },
    wrongLoginInfo: {
        fontSize: 20,
        fontWeight: '500',
        width:300,
        color: '#fff',
        textAlign: 'right',
    }
});
