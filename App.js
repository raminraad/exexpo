// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from "./src/screens/Login";
import SignUp from "./src/screens/SignUp";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {MenuProvider} from 'react-native-popup-menu';
import {HomeDrawerScreen} from "./src/screens/HomeDrawerScreen";
import { AppLoading } from 'expo';
import { Container, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const LoginStack = createStackNavigator();



export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isReady: false,
      };
    }
  
    async componentDidMount() {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
      this.setState({ isReady: true });
    }
  
    render() {
      if (!this.state.isReady) {
        return <AppLoading />;
      }
  
      return (
        <Container>
          <MenuProvider>
            <NavigationContainer>
                <LoginStack.Navigator initialRouteName="Login" screenOptions={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#E8F1F2',
                    },
                    headerTintColor: '#13293D',
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    }
                }}>
                    <LoginStack.Screen name="Home" component={HomeDrawerScreen}/>
                    <LoginStack.Screen name="Login" component={Login}/>
                    <LoginStack.Screen name="SignUp" component={SignUp}/>
                </LoginStack.Navigator>
            </NavigationContainer>
        </MenuProvider>
        </Container>
      );
    }
  }