import React,{Component} from "react";
import {DrawerContent} from "../components/DrawerContent";
import Home from "./Home";
import Users from "./Users";
import Details from "./Details";
import Order from "./Order";
import Profile from "./Profile";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {StackActions} from '@react-navigation/native';
import Products from "./Products";
import RetailChallenges from "./RetailChallenges";


const HomeDrawer = createDrawerNavigator();

export class HomeDrawerScreen extends Component<{ navigation: any }> {
    render() {
        return (
            <HomeDrawer.Navigator drawerType='slide' drawerContent={props => <DrawerContent {...props}  />}
                                  drawerPosition='right'>
                <HomeDrawer.Screen name='Home' component={Home} options={{title: 'Home'}}/>
                <HomeDrawer.Screen name='Products' component={Products} options={{title: 'Products'}}/>
                <HomeDrawer.Screen name='Users' component={Users} options={{title: 'Users'}}/>
                <HomeDrawer.Screen name='Details' component={Details} options={{title: 'Detail'}}/>
                <HomeDrawer.Screen name='Order' component={Order} options={{title: 'Order'}}/>
                <HomeDrawer.Screen name='Profile' component={Profile} options={{title: 'Profile'}}/>
                <HomeDrawer.Screen name='RetailChallenge' component={RetailChallenges} options={{title: 'RetailChallenge'}}/>
            </HomeDrawer.Navigator>
        );
    }
}
