import React, { Component, useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, BackHandler } from "react-native";
import Logo from "../components/Logo";
import { CheckBox } from "react-native-elements";
import { StackActions } from "@react-navigation/native";
import { globalColors, globalLiterals } from "../lib/rxGlobal";
import NetInfo from "@react-native-community/netinfo";
import * as storageProvider from "../lib/storageProvider";
import * as calendarLib from "../lib/calendarLib";
import { Formik } from "formik";
import { AntDesign } from "@expo/vector-icons";
import * as wp from "../lib/webProvider";

export default function Login({ navigation }) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRememberChecked, setIsRememberChecked] = useState(false);
  const passPhraseRef = useRef(null);
  const userNameRef = useRef(null);
  const [authInfo, setAuthInfo] = useState({});

  const getSetting = async () => {
    global.dynamicSetting = {
      allowedDistanceForVisitor: 200,
      isMandatoryInitialClientSync: false,
    };
  };

  const initAuthInfo = async () => {
    let storedString = await storageProvider.retrieve("userInfo");
    if (storedString) {
      let storedJson = JSON.parse(storedString);
      setAuthInfo(storedJson);
      setIsRememberChecked(storedJson.isRememberChecked);
    }
  };

  useEffect(() => {
    initAuthInfo();
  }, []);

  const goto = (screen) => {
    //clear the stack and set the Home screen as only screen
    navigation.dispatch(StackActions.replace(screen, { title: "پویش فروش خرده" }));
  };

  // XXX: start

  console.disableYellowBox = true;
  global.dev = { useFakeData: false, verbose: false };
  // goto("AppDrawer");

  //xxx: end

  const submit = async (newInputs) => {
    setIsLoading(true);
    setMessage(globalLiterals.progress.checkingLoginInfo);
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(newInputs),
      redirect: "follow",
    };
    if (await wp.checkNet()) {
      fetch("http://audit.mazmaz.net/Api/WebApi.asmx/Authenticate", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.d.Token) return result;
          else {
            newInputs.isRememberChecked = false;
            throw result.d.Message;
          }
        })
        .then((result) => {
          setMessage(globalLiterals.progress.syncingTimeInfo);
          global.userInfo = {
            ...newInputs,
            token: result.d.Token,
            tokenExpirationDateTime: result.d.ExpirationDate,
            loginDateTime: result.d.CurrentServerTime,
          };
        })
        .then(async () => {
          getSetting();
        })
        .then(() => goto("AppDrawer"))
        .catch((error) => {
          setMessage(error);
        })
        .finally(() => {
          storageProvider.store("userInfo", JSON.stringify(newInputs));
          setIsLoading(false);
        });
    } else {
      setMessage(globalLiterals.actionAndStateErrors.noInternetError);
      setIsLoading(false);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={
        authInfo.isRememberChecked
          ? authInfo
          : {
              userName: "",
              passPhrase: "",
              iMEI: "1",
              isRememberChecked: false,
            }
      }
      onSubmit={async (values, actions) => {
        values.isRememberChecked = isRememberChecked;
        submit(values);
      }}>
      {(props) => (
        <View style={styles.container}>
          <View style={{ justifyContent: "space-between", flex: 1 }}>
            <View style={styles.logoContainer}>
              <Logo />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.inputAndButton, styles.input]}
                underlineColorAndroid='rgba(0,0,0,0)'
                textAlign='right'
                placeholder='نام کاربری'
                keyboardType='email-address'
                onSubmitEditing={() => passPhraseRef.current.focus()}
                onChangeText={props.handleChange("userName")}
                value={props.values.userName}
                ref={userNameRef}
              />
              <TextInput
                style={[styles.inputAndButton, styles.input]}
                underlineColorAndroid='rgba(0,0,0,0)'
                textAlign='right'
                secureTextEntry={true}
                placeholder='گذرواژه'
                onSubmitEditing={submit}
                onChangeText={props.handleChange("passPhrase")}
                value={props.values.passPhrase}
                ref={passPhraseRef}
              />
              <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                <Text
                  style={{
                    ...styles.buttonText,
                    textAlign: "right",
                    flex: 5,
                    color: isRememberChecked ? globalColors.palette.silver : globalColors.palette.lead,
                  }}>
                  ذخیــــــــره اطلاعــــــــــات کاربـــــــــری
                </Text>
                <CheckBox
                  containerStyle={{ backgroundColor: globalColors.transparent, borderWidth: 0, flex: 2 }}
                  checked={isRememberChecked}
                  checkedColor={globalColors.palette.silver}
                  uncheckedColor={globalColors.palette.lead}
                  onPress={() => setIsRememberChecked(!isRememberChecked)}
                />
              </View>

              <TouchableOpacity style={[styles.inputAndButton, styles.button]} onPress={props.handleSubmit}>
                <Text style={styles.buttonText}>ورود به حساب</Text>
              </TouchableOpacity>
              <View style={styles.messageContainer}>
                {isLoading ? (
                  <ActivityIndicator size={24} style={{ marginHorizontal: 10 }} />
                ) : message ? (
                  <AntDesign name='warning' size={24} color='#fcbf49' style={{ marginHorizontal: 10 }} />
                ) : null}
                <Text style={styles.message}>{message}</Text>
              </View>
            </View>
          </View>
          {/* todo: fix and uncomment signUp page */}
          {/* <View style={styles.signUpTextContainer}>
                  <Text style={styles.signUpText}>هنوز حساب کاریری ندارید؟ </Text>
                  <TouchableOpacity onPress={()=>{goto('SignUp')}}>
                    <Text style={styles.signUpButton}>ایجاد حساب کاربری</Text>
                  </TouchableOpacity>
                </View> */}
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalColors.loginScreenContainerBackground,
    flex: 1,
  },
  signUpTextContainer: {
    alignSelf: "center",
    paddingBottom: 8,
    marginTop: 8,
    flexDirection: "row-reverse",
  },
  signUpText: {
    color: globalColors.palette.glassyWhite,
    fontSize: 16,
  },
  signUpButton: {
    color: globalColors.palette.cream,
    fontSize: 16,
    fontWeight: "500",
  },
  logoContainer: {
    flex: 1,
    marginTop: 70,
  },
  inputContainer: {
    flex: 2,
    marginTop: 50,
  },
  inputAndButton: {
    height: 40,
    width: 300,
    alignSelf: "center",
    borderRadius: 25,
    marginVertical: 10,
  },
  input: {
    backgroundColor: globalColors.loginScreenInputBackground,
    paddingHorizontal: 16,
    fontSize: 16,
    color: globalColors.palette.cream,
  },
  button: {
    backgroundColor: globalColors.loginScreenSubmitButtonBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    color: globalColors.palette.cream,
    textAlign: "center",
    textAlignVertical: "center",
  },
  messageContainer: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  message: {
    flexWrap: "wrap",
    fontSize: 18,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "right",
  },
});
