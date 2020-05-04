// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import Login from "./src/pages/Login";
import SignUp from "./src/pages/SignUp";
import Home from "./src/pages/Home";
import {createDrawerNavigator} from "@react-navigation/drawer";
import Profile from "./src/pages/Profile";
import Order from "./src/pages/Order";
import Details from "./src/pages/Details";
import {DrawerContent} from "./src/components/DrawerContent";
import Users from "./src/pages/Users";
import {MenuProvider} from 'react-native-popup-menu';


const HomeDrawer = createDrawerNavigator();
const LoginStack = createStackNavigator();

const HomeDrawerScreen = ({navigation}) => (
    <HomeDrawer.Navigator drawerType='slide' drawerContent={props => <DrawerContent {...props}  />} drawerPosition='right' >
        <HomeDrawer.Screen name='Home' component={Home} options={{title: 'Overview'}}/>
        <HomeDrawer.Screen name='Users' component={Users} options={{title: 'Users'}}/>
        <HomeDrawer.Screen name='Details' component={Details} options={{title: 'Detail'}}/>
        <HomeDrawer.Screen name='Order' component={Order} options={{title: 'Order'}}/>
        <HomeDrawer.Screen name='Profile' component={Profile} options={{title: 'Profile'}}/>
    </HomeDrawer.Navigator>
);

function App() {
    return (
        <MenuProvider>
            <NavigationContainer>
                <LoginStack.Navigator initialRouteName="Login" screenOptions={{
                    headerShown: false,
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
            </NavigationContainer></MenuProvider>
    );
}

export default App;
