import React, { Component } from "react";
import { DrawerContent } from "../components/DrawerContent";
import Login from "./Login";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { StackActions, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserVisitPlans from "./UserVisitPlans";
import VisitPlanCustomers from "./VisitPlanCustomers";
import VisitPlanResultForm from "../components/VisitPlanResultForm";
import SignUp from "./SignUp";
import { Fontisto } from '@expo/vector-icons'; 

const AppDrawer = () => {
  const DrawerNavigator = createDrawerNavigator();
  return (
    <DrawerNavigator.Navigator drawerType='slide' drawerContent={(props) => <DrawerContent {...props} />} drawerPosition='right'>
      <DrawerNavigator.Screen name='VisitPlanStack' component={VisitPlanStack} />
    </DrawerNavigator.Navigator>
  );
};

const AuthStack = () => {
  const AuthenticateStack = createStackNavigator();
  return (
    <AuthenticateStack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false,
      }}>
      <AuthenticateStack.Screen name='Login' component={Login} />
      <AuthenticateStack.Screen name='AppDrawer' component={AppDrawer} />
      <AuthenticateStack.Screen name='SignUp' component={SignUp} />
    </AuthenticateStack.Navigator>
  );
};
const VisitResultTab = () => {
  const VisitTab = createBottomTabNavigator();

  return (
    <VisitTab.Navigator
    
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

switch (route.name) {
  case 'VisitPlanResultForm':
    iconName = 'shopping-basket';
    break;
  default:
    iconName='tablet';
    break;
}
        return <Fontisto name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      showLabel:false
    }}
    >
      <VisitTab.Screen name='log1' component={Login} />
      <VisitTab.Screen name='log2' component={Login} />
      <VisitTab.Screen name='log3' component={Login} />
      <VisitTab.Screen name='VisitPlanResultForm' component={VisitPlanResultForm} />
    </VisitTab.Navigator>
  );
};
const VisitPlanStack = () => {
  const VisitStack = createStackNavigator();

  return (
    <VisitStack.Navigator
      initialRouteName='UserVisitPlans'
      screenOptions={{
        headerShown: false,
      }}>
      <VisitStack.Screen name='UserVisitPlans' component={UserVisitPlans} initialParams={{ title: "پویش فروش خرده" }} />
      <VisitStack.Screen name='VisitPlanCustomers' component={VisitPlanCustomers} />
      <VisitStack.Screen name='VisitResultTab' component={VisitResultTab} />
    </VisitStack.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};
