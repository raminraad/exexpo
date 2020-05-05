import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import Logo from '../components/Logo';
import {StackActions} from "@react-navigation/native";


export default class Login extends Component<{}> {
    constructor({navigatioin}) {
        super(navigatioin);
        this.gotoSignUp = this.gotoSignUp.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {
            username: '',
            password: '',
            message: ''
        };
        this.msgWrongLoginInfo = 'نام کاربری و یا کلمه عبور اشتباه است';
    }

    submitHandler() {
        //todo: replace with web service call
        // if (this.state.username.toLowerCase() === 'raad' && this.state.password === '11')
        if (true) {
            this.gotoHome();
            this.setState({message: ''});
        } else
            this.setState({message: this.msgWrongLoginInfo});
    }

    gotoSignUp() {
        this.props.navigation.navigate('SignUp')
    }

    gotoHome() {
        //clear the stack and set the Home screen as only screen
        this.props.navigation.dispatch(
            StackActions.replace('Home')
        );
    }


    render() {
        return <View style={styles.container}>
            <View style={{flex: 2, justifyContent: 'flex-end'}}>
                <Logo/>
            </View>
            <View style={{flex: 3, justifyContent: 'center'}}>
                <TextInput
                    name='username'
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    textAlign="right"
                    placeholder="نام کاربری"
                    keyboardType='email-address'
                    onSubmitEditing={() => this.password.focus()}
                    onChangeText={(val) => this.setState({username: val})}
                    ref={(input) => this.username = input}
                />
                <TextInput
                    name='password'
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    textAlign="right"
                    secureTextEntry={true}
                    placeholder="گذرواژه"
                    onSubmitEditing={() => this.submitHandler()}
                    onChangeText={(val) => this.setState({password: val})}
                    ref={(input) => this.password = input}
                />
                <Text
                    style={styles.message}>{this.state.message}</Text>
                <TouchableOpacity style={styles.button} onPress={this.submitHandler}>
                    <Text
                        style={styles.buttonText}>ورود به حساب</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.signUpTextCont}>
                <Text style={styles.signUpText}>هنوز حساب کاریری ندارید؟ </Text>
                <TouchableOpacity onPress={this.gotoSignUp}>
                    <Text style={styles.signUpButton}>ایجاد حساب
                        کاربری</Text></TouchableOpacity>
            </View>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#116496',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    signUpTextCont: {
        alignItems: 'flex-end',
        paddingBottom: 16,
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
    message: {
        fontSize: 20,
        fontWeight: '500',
        width: 300,
        color: '#fff',
        textAlign: 'center',
    }
});
