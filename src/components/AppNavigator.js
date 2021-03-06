import React, { Component, useState } from "react";
import { DrawerContent } from "./DrawerContent";
import Login from "./Login";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator, HeaderBackground } from "@react-navigation/stack";
import { StackActions, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserVisitPlans from "./UserVisitPlans";
import VisitPlanCustomers from "./VisitPlanCustomers";
import VisitPlanResultForm from "./VisitPlanResultForm";
import SignUp from "./SignUp";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import VisitPlanResultProductForm from "./VisitPlanResultProductForm";
import AddProductFromDb from "./AddProductFromDb";
import AddProductFromCamera from "./AddProductFromCamera";
import * as rxGlobal from "../lib/rxGlobal";
import VisitPlanResultContext from "../contexts/VisitPlanResultContext";

const AppDrawer = () => {
  const DrawerNavigator = createDrawerNavigator();
  const [currentVisitPlan, setCurrentVisitPlan] = useState({});
  return (
    <VisitPlanResultContext.Provider value={{ value: currentVisitPlan, setValue: setCurrentVisitPlan }}>
      <DrawerNavigator.Navigator drawerType='slide' drawerContent={(props) => <DrawerContent {...props} />} drawerPosition='right'>
        <DrawerNavigator.Screen name='VisitPlanStack' component={VisitPlanStack} />
      </DrawerNavigator.Navigator>
    </VisitPlanResultContext.Provider>
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
            case "AddProductFromDb":
              iconName = "playlist-add";
              break;
            case "VisitPlanResultForm":
              iconName = "playlist-add-check";
              break;
            case "AddProductFromCamera":
              iconName = "camera-alt";
              break;
            default:
              iconName = "tablet";
              break;
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        style: {
          backgroundColor: rxGlobal.globalColors.tabBackgroundDefault,
        },
        activeBackgroundColor: rxGlobal.globalColors.tabBackgroundActive,
        activeTintColor: rxGlobal.globalColors.tabIconActive,
        inactiveTintColor: rxGlobal.globalColors.tabIconInactive,
        showLabel: false,
      }}>
      <VisitTab.Screen name='VisitPlanResultForm' component={VisitPlanResultForm} />
      <VisitTab.Screen name='VisitPlanResultProductForm' component={VisitPlanResultProductForm} />
      <VisitTab.Screen name='AddProductFromCamera' component={AddProductFromCamera} />
      <VisitTab.Screen name='AddProductFromDb' component={AddProductFromDb} />
    </VisitTab.Navigator>
  );
};
const VisitPlanStack = () => {
  const VisitStack = createStackNavigator();

  return (
    <VisitStack.Navigator
      //xxx
      // initialRouteName='VisitResultTab'
      initialRouteName='UserVisitPlans'
      //xxx
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
