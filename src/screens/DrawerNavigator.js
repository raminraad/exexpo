import React,{Component} from "react";
import {DrawerContent} from "../components/DrawerContent";
import Home from "./Home";
import Login from "./Login";
import Details from "./Details";
import Order from "./Order";
import Profile from "./Profile";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {StackActions} from '@react-navigation/native';
import Products from "./Products";
import VisitPlans from "./VisitPlans";
import VisitPlanCustomers from "./VisitPlanCustomers";
import VisitPlanResultForm from "../components/VisitPlanResultForm";


const drawer = createDrawerNavigator();

export class DrawerNavigator extends Component<{ navigation: any }> {
    render() {
        return (
            <drawer.Navigator drawerType='slide' drawerContent={props => <DrawerContent {...props}  />}
                                  drawerPosition='right'>
                <drawer.Screen name='Login' component={Login} />
                <drawer.Screen name='VisitPlans' component={VisitPlans} initialParams={{title:'پویش فروش خرده'}}/>
                <drawer.Screen name='Home' component={Home} />
                <drawer.Screen name='VisitPlanCustomers' component={VisitPlanCustomers} />
                <drawer.Screen name='VisitPlanResultForm' component={VisitPlanResultForm} />
            </drawer.Navigator>
        );
    }
}
