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
import { globalColors } from "../lib/rxGlobal";
import * as dp from "../lib/sqliteDp";


export default function Login({ navigation }) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const passPhraseRef = useRef(null);
  const userNameRef = useRef(null);
  let userInfo = {
    passPhrase: "",
    userName: "",
    iMEI: "64564646465465454",
  };

  global.AcceptableDistanceForVisitor=200;
  // XXX: start
  // global.xxx = false;
  global.authToken='0cf88527-515e-5cb9-7d50-d79f3693c644';
  // navigation.dispatch(StackActions.replace("VisitPlans",{title:'dev.visitPlans'}));
  //xxx: end
  dp.syncVisitPlanData();
  

  const submit = () => {
    setMessage("در حال بررسی اطلاعات کاربری..");
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(userInfo),
      redirect: "follow",
    };

    fetch(
      "http://audit.mazmaz.net/Api/WebApi.asmx/Authenticate",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.d.Token) {
          global.authToken = result.d.Token;
          setMessage('تأیید کاربری، در حال بروزرسانی اطلاعات..');
          return dp.pullAndCommitVisitPlanData();
        } else setMessage(result.d.Message);
      }).then(gotoHome)
      .catch((error) => {
        console.log("error", error);
        setMessage(
          "به دلیل بروز خطا در ارتباط با سرور، لطفاً مجدداً تلاش فرمایید..."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
      
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
      <View style={{ justifyContent: "space-between", flex: 1 }}>
        <Logo style={styles.logoContainer} />
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.inputAndButton,styles.input]}
            underlineColorAndroid="rgba(0,0,0,0)"
            textAlign="right"
            placeholder="نام کاربری"
            keyboardType="email-address"
            onSubmitEditing={() => passPhraseRef.current.focus()}
            onChangeText={(val) => (userInfo.userName = val)}
            ref={userNameRef}
          />
          <TextInput
            style={[styles.inputAndButton,styles.input]}
            underlineColorAndroid="rgba(0,0,0,0)"
            textAlign="right"
            secureTextEntry={true}
            placeholder="گذرواژه"
            onSubmitEditing={submit}
            onChangeText={(val) => (userInfo.passPhrase = val)}
            ref={passPhraseRef}
          />
          <TouchableOpacity style={[styles.inputAndButton,styles.button]} onPress={submit}>
            <Text style={styles.buttonText}>ورود به حساب</Text>
          </TouchableOpacity>
          <View style={styles.messageContainer}>
            <ActivityIndicator
              size={isLoading ? 24 : 0}
              style={{ marginHorizontal: 10 }}
            />
            <Text style={styles.message}>{message}</Text>
          </View>
        </View>
      </View>
      <View style={styles.signUpTextContainer}>
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
    backgroundColor: globalColors.loginPageContainerBackground,
    flex: 1,
  },
  logoContainer: {
    flex: 1,
  },
  signUpTextContainer: {
    alignSelf: "center",
    paddingBottom: 8,
    marginTop: 8,
    flexDirection: "row-reverse",
  },
  signUpText: {
    color: "#FFFB",
    fontSize: 16,
  },
  signUpButton: {
    color: globalColors.palette.cream,
    fontSize: 16,
    fontWeight: "500",
  },
  inputContainer: {
    flex: 1,
  },
  inputAndButton:{
    height: 40,
    width:300,
    alignSelf:'center',
    borderRadius: 25,
    marginVertical: 10,
  },
  input: {
    backgroundColor: globalColors.loginPageInputBackground,
    paddingHorizontal: 16,
    fontSize: 16,
    color: globalColors.palette.cream,
  },
  button: {
    backgroundColor: globalColors.loginPageSubmitButtonBackground,
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
    marginVertical: 30,
  },
  message: {
    flexWrap: "wrap",
    fontSize: 16,
    fontWeight: "500",
    color: globalColors.palette.cream,
    textAlign: "right",
  },
});
