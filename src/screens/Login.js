import React, { Component, useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator ,BackHandler} from "react-native";
import Logo from "../components/Logo";
import { CheckBox } from 'react-native-elements'
import { StackActions } from "@react-navigation/native";
import { globalColors, globalLiterals } from "../lib/rxGlobal";
import NetInfo from '@react-native-community/netinfo';
import * as dp from "../lib/sqliteDp";

export default function Login({ navigation }) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isConnected = useRef(false);
const [IsRememberChecked, setIsRememberChecked] = useState(true);
  const passPhraseRef = useRef(null);
  const userNameRef = useRef(null);
  let userInfo = {
    userName: "offline",
    passPhrase: "offline123",
    iMEI: "64564646465465454",
  };

  global.AcceptableDistanceForVisitor = 200;

  const goto = (screen) => {
    //clear the stack and set the Home screen as only screen
    navigation.dispatch(StackActions.replace(screen,{title:'پویش فروش خرده'}));
  };

  // XXX: start

  console.disableYellowBox = true;

  // userInfo = {
  //   userName: "offline",
  //   passPhrase: "offline123",
  //   iMEI: "offline",
  // };
  // goto('Drawer')
  //xxx: end

  const submit = async () => {
console.log(userInfo);

    setIsLoading(true);
    setMessage("در حال بررسی اطلاعات کاربری..");
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(userInfo),
      redirect: "follow",
    };

    if (await NetInfo.fetch().then(state => state.isConnected)) {
      fetch("http://audit.mazmaz.net/Api/WebApi.asmx/Authenticate", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.d.Token) {
            global.authToken = result.d.Token;
            setMessage("تأیید کاربری، در حال بروزرسانی اطلاعات..");
          } else {
            throw result.d.Message;
          }
        })
        //xxx:
        .then(dp.pullAndCommitVisitPlanData)
        //xxx
        .then(()=>goto('Drawer'))
        .catch((error) => {
          setMessage(error);
        });
    } else {
      setMessage(globalLiterals.actionAndStateErrors.NoInternetError);
    }
    setIsLoading(false);
  };

  

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "space-between", flex: 1 }}>
      <View style={styles.logoContainer}>
        <Logo/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.inputAndButton, styles.input]}
            underlineColorAndroid='rgba(0,0,0,0)'
            textAlign='right'
            placeholder='نام کاربری'
            keyboardType='email-address'
            onSubmitEditing={() => passPhraseRef.current.focus()}
            onChangeText={(val) => (userInfo.userName = val)}
            ref={userNameRef}
            value='offline'
          />
          <TextInput
            style={[styles.inputAndButton, styles.input]}
            underlineColorAndroid='rgba(0,0,0,0)'
            textAlign='right'
            secureTextEntry={true}
            placeholder='گذرواژه'
            onSubmitEditing={submit}
            onChangeText={(val) => (userInfo.passPhrase = val)}
            ref={passPhraseRef}
            value='offline123'
          />
<View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
  
  <Text style={{...styles.buttonText,textAlign:'right',flex:5,color:IsRememberChecked?globalColors.palette.silver:globalColors.palette.lead}}>ذخیــــــــره اطلاعــــــــــات کاربـــــــــری</Text>
  <CheckBox
    containerStyle={{backgroundColor:globalColors.transparent,borderWidth:0,flex:2}}
    checked={IsRememberChecked}
    checkedColor={globalColors.palette.silver}
    uncheckedColor={globalColors.palette.lead}
    onPress={()=>setIsRememberChecked(!IsRememberChecked)}
  />
</View>

          <TouchableOpacity style={[styles.inputAndButton, styles.button]} onPress={submit}>
            <Text style={styles.buttonText}>ورود به حساب</Text>
          </TouchableOpacity>
          <View style={styles.messageContainer}>
            <ActivityIndicator size={isLoading ? 24 : 0} style={{ marginHorizontal: 10 }} />
            <Text style={styles.message}>{message}</Text>
          </View>
        </View>
      </View>
      <View style={styles.signUpTextContainer}>
        <Text style={styles.signUpText}>هنوز حساب کاریری ندارید؟ </Text>
        <TouchableOpacity onPress={()=>{goto('SignUp')}}>
          <Text style={styles.signUpButton}>ایجاد حساب کاربری</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginTop:70
  },
  inputContainer: {
    flex: 2,
    marginTop:50
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
    alignItems:'center',
    justifyContent:'center',
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
    marginVertical: 10,
  },
  message: {
    flexWrap: "wrap",
    fontSize: 16,
    fontWeight: "500",
    color: globalColors.palette.cream,
    textAlign: "right",
  },
});
