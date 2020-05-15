import React, { Component, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import Logo from "../components/Logo";
import { StackActions } from "@react-navigation/native";
import { globalColors } from "../styles/global";

export default function Login({ navigation }) {
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const passwordRef = useRef(null);
  const usernameRef = useRef(null);
  let userInfo = {
    password: "",
    username: "",
  };

  const submit = () => {
    setMessage("لطفاً صبر کنید..");
    setLoading(true);
    fetch("http://audit.mazmaz.net/Api/WebApi.asmx/Authenticate", {
      userName: "offline",
      passPhrase: "offline123",
      iMEI: "64564646465465454",
    })
      .then((response) => console.log(response.json()))
      .then((json) => setMessage("Success"))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));

    //todo: replace with web service call
    // if (this.state.username.toLowerCase() === 'raad' && this.state.password === '11')
    // if (true) {
    // gotoHome();
    // setMessage("");
    // } else setMessage("Wrong pass");
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
      <View style={{ flex: 2 }}>
        <Logo />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          name="username"
          style={styles.input}
          underlineColorAndroid="rgba(0,0,0,0)"
          textAlign="right"
          placeholder="نام کاربری"
          keyboardType="email-address"
          onSubmitEditing={() => passwordRef.current.focus()}
          onChangeText={(val) => (userInfo.username = val)}
          ref={usernameRef}
        />
        <TextInput
          name="password"
          style={styles.input}
          underlineColorAndroid="rgba(0,0,0,0)"
          textAlign="right"
          secureTextEntry={true}
          placeholder="گذرواژه"
          onSubmitEditing={submit}
          onChangeText={(val) => (userInfo.password = val)}
          ref={passwordRef}
        />

        <View style={styles.messageContainer}>
          <ActivityIndicator
            size={isLoading ? 24 : 0}
            style={{ marginHorizontal: 10 }}
          />
          <Text style={styles.message}>{message}</Text>
        </View>
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
  },
  signUpTextCont: {
    alignSelf: "center",
    paddingBottom: 8,
    marginTop: 8,
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
  inputContainer: { flex: 3, marginHorizontal: 60, justifyContent: "center" },
  input: {
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: globalColors.palette.cream,
    marginVertical: 10,
  },
  button: {
    height: 40,
    backgroundColor: globalColors.palette.dirtyNavy,
    borderRadius: 25,
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
    color: globalColors.palette.cream,
    textAlign: "center",
    textAlignVertical: "center",
  },
  messageContainer: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  message: {
    flexWrap: "wrap",
    fontSize: 16,
    fontWeight: "500",
    color: globalColors.palette.cream,
    textAlign: "right",
  },
});
