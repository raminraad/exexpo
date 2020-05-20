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
import VisitPlans from "./VisitPlans";
import VisitPlanCustomers from "./VisitPlanCustomers";


const HomeDrawer = createDrawerNavigator();

export class HomeDrawerScreen extends Component<{ navigation: any }> {
    render() {
        return (
            <HomeDrawer.Navigator drawerType='slide' drawerContent={props => <DrawerContent {...props}  />}
                                  drawerPosition='right'>
                <HomeDrawer.Screen name='Home' component={Home} />
                <HomeDrawer.Screen name='Products' component={Products} />
                <HomeDrawer.Screen name='Users' component={Users} />
                <HomeDrawer.Screen name='Details' component={Details} />
                <HomeDrawer.Screen name='Order' component={Order} />
                <HomeDrawer.Screen name='Profile' component={Profile} />
                <HomeDrawer.Screen name='RetailChallenge' component={VisitPlans} />
                <HomeDrawer.Screen name='VisitPlanCustomers' component={VisitPlanCustomers} />
            </HomeDrawer.Navigator>
        );
    }
}
