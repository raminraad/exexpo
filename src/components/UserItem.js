import { ListItem, Avatar } from "react-native-elements";
import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import IconFeather from "react-native-vector-icons/Feather";
import { Icon } from "react-native-elements";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { globalStyles, globalColors, globalSizes } from "../lib/rxGlobal";

export default class UserItem extends Component {
  state = {
    isSelected: false,
  };

  onPerss = () => {
    this.setState((prevState, prevProps) => ({
      isSelected: !prevState.isSelected,
    }));
  };

  renderDetails = () => (
    <View style={styles.detailsContainer}>
      <Text style={styles.detailsText}>{this.props.item?this.props.item.description:''}</Text>
    </View>
  );

  LeftAction = () => {
    return (
      <View style={globalStyles.listItemSwipeLeftContainer}>
        <Icon
          reverse
          name="trash"
          onPress={() => this.props.onDelete(this.props.item.key)}
          type="font-awesome"
          size={globalSizes.icons.small}
          color={globalColors.btnDelete}
        />
        <Icon
          reverse
          name="edit"
          // todo: implement update functionality
          onPress={() => this.props.onEdit(this.props.item.key)}
          type="font-awesome"
          size={globalSizes.icons.small}
          color={globalColors.btnUpdate}
        />
      </View>
    );
  };

  render() {
    const { isSelected } = this.state;
    return (
      <Swipeable renderLeftActions={this.LeftAction}>
        <View>
          <TouchableWithoutFeedback onPress={this.onPerss}>
            <View style={styles.container}>
              <ListItem
                subtitle={this.props.item?this.props.item.jobTitle:''}
                title={this.props.item?`${this.props.item.fName} ${this.props.item.lName}`:''}
                rightAvatar={{
                  source: { uri: this.props.item?this.props.item.avatar_url:'' },
                  size: 48,
                }}
                style={{ flex: 0.99, marginVertical: 4, padding: 0 }}
              />
              <Icon
                reverse
                name={isSelected ? "chevron-up" : "chevron-down"}
                type="font-awesome"
                size={12}
                color={
                  isSelected
                    ? globalColors.listItemCollapseIcon
                    : globalColors.listItemExpandIcon
                }
              />
            </View>
          </TouchableWithoutFeedback>
          {isSelected && this.renderDetails()}
        </View>
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 15,
    borderColor: "rgba(3,3,3,0.5)",
    borderWidth: 0.5,
  },
  detailsContainer: {
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: globalColors.palette.paleGray,
    marginHorizontal: 10,
    marginTop: 0,
    padding: 15,
    borderRadius: 5,
  },
  detailsText: {
    fontSize: 18,
    textAlign: "right",
    paddingHorizontal: 35,
    color: globalColors.palette.coal,
  },
  
});
