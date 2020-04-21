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


const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: 'orange',
        },
        headerTintColor: 'gray',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name='Login' component={Login} options={{title: 'Login'}}/>
        <HomeStack.Screen name='SignUp' component={SignUp} options={{title: 'SignUp'}}/>
        <HomeStack.Screen name='Home' component={Home} options={{title: 'Overview'}}/>
    </HomeStack.Navigator>
);
const DetailsStackScreen = ({navigation}) => (
    <DetailsStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: 'orange',
        },
        headerTintColor: 'gray',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <DetailsStack.Screen name='Details' component={Details} options={{}}/>
    </DetailsStack.Navigator>
);

function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeStackScreen}/>
                <Drawer.Screen name="Profile" component={DetailsStackScreen}/>
            </Drawer.Navigator>
            {/*<Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={Login} options={{title: 'Login'}}/>
                <Stack.Screen name="SignUp" component={SignUp}/>
                <Stack.Screen name="Home" component={Home}/>
            </Stack.Navigator>*/}
        </NavigationContainer>
    );
}

export default App;
