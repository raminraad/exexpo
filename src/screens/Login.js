import React, { Component, useState , useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import Logo from "../components/Logo";
import { StackActions } from "@react-navigation/native";

export default function Login({ navigation }) {
  const [message, setMessage] = useState("");
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);
  let userInfo = {
    password: "",
    username: "",
  };

  const submit = () => {
    //todo: replace with web service call
    // if (this.state.username.toLowerCase() === 'raad' && this.state.password === '11')
    if (true) {
      gotoHome();
      setMessage("");
    } else setMessage("Wrong pass");
  };

  const gotoSignUp = () => {
    navigation.navigate("SignUp");
  };

  const gotoHome = () => {
    //clear the stack and set the Home screen as only screen
    navigation.dispatch(StackActions.replace("Home"));
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 2, justifyContent: "flex-end" }}>
        <Logo />
      </View>
      <View style={{ flex: 3, justifyContent: "center" }}>
        <TextInput
          name="username"
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          textAlign="right"
          placeholder="نام کاربری"
          keyboardType="email-address"
          onSubmitEditing={() => passwordRef.current.focus()}
          onChangeText={(val) => userInfo.username=val}
          ref={usernameRef}
        />
        <TextInput
          name="password"
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          textAlign="right"
          secureTextEntry={true}
          placeholder="گذرواژه"
          onSubmitEditing={submit}
          onChangeText={(val) => userInfo.password=val}
          ref={passwordRef}
        />
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>ورود به حساب</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signUpTextCont}>
        <Text style={styles.signUpText}>هنوز حساب کاریری ندارید؟ </Text>
        <TouchableOpacity onPress={gotoSignUp}>
          <Text style={styles.signUpButton}>ایجاد حساب کاربری</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#116496",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  signUpTextCont: {
    alignItems: "flex-end",
    paddingBottom: 16,
    flexDirection: "row-reverse",
  },
  signUpText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 16,
  },
  signUpButton: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
  inputBox: {
    width: 300,
    height: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "rgba(255,255,255,1)",
    marginVertical: 10,
  },
  button: {
    width: 300,
    height: 50,
    marginVertical: 10,
    backgroundColor: "#1c313a",
    borderRadius: 25,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
  },
  message: {
    fontSize: 20,
    fontWeight: "500",
    width: 300,
    color: "#fff",
    textAlign: "center",
  },
});
