// In App.js in a new project

import * as React from "react";
import Login from "./src/screens/Login";
import SignUp from "./src/screens/SignUp";
import { MenuProvider } from "react-native-popup-menu";
import { AppNavigator } from "./src/screens/AppNavigator";
import { AppLoading } from "expo";
import { Container, Text, Root } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import UserVisitPlans from "./src/screens/UserVisitPlans";
import VisitPlanCustomers from "./src/screens/VisitPlanCustomers";
import VisitPlanResultForm from "./src/components/VisitPlanResultForm";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Root>
        <Container>
          <MenuProvider>
            <AppNavigator />
          </MenuProvider>
        </Container>
      </Root>
    );
  }
}
