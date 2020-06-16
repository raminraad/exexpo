import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
import { Entypo,FontAwesome5 ,Feather} from '@expo/vector-icons'; 
import * as rxGlobal from "../lib/rxGlobal";
export default class SearchBarExample extends Component {
  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Feather name='x' size={rxGlobal.globalSizes.icons.small} style={{marginLeft:10}} color={rxGlobal.globalColors.searchBarIcon} />
            <Input placeholder="جستجو" />
            <Icon name="ios-search" />
          </Item>
        </Header>
      </Container>
    );
  }
}