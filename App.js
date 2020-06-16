// In App.js in a new project

import * as React from "react";
import Login from "./src/components/Login";
import SignUp from "./src/components/SignUp";
import { MenuProvider } from "react-native-popup-menu";
import { AppNavigator } from "./src/components/AppNavigator";
import { AppLoading } from "expo";
import { Container, Text, Root } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";


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
