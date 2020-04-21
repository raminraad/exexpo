// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from "./src/pages/Login";
import SignUp from "./src/pages/SignUp";
import Home from "./src/pages/Home";
import {createDrawerNavigator} from "@react-navigation/drawer";
import Profile from "./src/pages/Profile";
import Order from "./src/pages/Order";
import Details from "./src/pages/Details";


const HomeDrawer = createDrawerNavigator();
const LoginStack = createStackNavigator();

const HomeDrawerScreen = ({navigation}) => (
    <HomeDrawer.Navigator>
        <HomeDrawer.Screen name='Home' component={Home} options={{title: 'Overview'}}/>
        <HomeDrawer.Screen name='Details' component={Details} options={{title: 'Detail'}}/>
        <HomeDrawer.Screen name='Order' component={Order} options={{title: 'Order'}}/>
        <HomeDrawer.Screen name='Profile' component={Profile} options={{title: 'Profile'}}/>
        <HomeDrawer.Screen name='Login' component={Login} options={{title: 'Login'}}/>
    </HomeDrawer.Navigator>
);

function App() {
    return (
        <NavigationContainer>
            <LoginStack.Navigator initialRouteName="Login" screenOptions={{
                headerStyle: {
                    backgroundColor: 'seagreen',
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }}>
                <LoginStack.Screen name="Home" component={HomeDrawerScreen}/>
                <LoginStack.Screen name="Login" component={Login}/>
                <LoginStack.Screen name="SignUp" component={SignUp}/>
            </LoginStack.Navigator>
        </NavigationContainer>
    );
}

export default App;
