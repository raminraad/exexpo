import { ListItem, Avatar } from "react-native-elements";
import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
// import IconFeather from 'react-native-vector-icons/Feather';
import {Icon} from 'react-native-elements';
// import {GestureHandler} from "expo/build/removed.web";
//
// const {Swipeable} = GestureHandler;


export default class UserItem extends Component {
    state = {
        isSelected: false
    };

    onPerss = () => {
        this.setState((prevState, preveProps) => ({ isSelected: !prevState.isSelected }));
    };

    renderDetails = () => (
        <View style={styles.detailsContainer}>
            <Text style={styles.detailsText}>{this.props.item.description}</Text>
        </View>
    );

    render() {
        const { isSelected } = this.state;
        return (
            <View >
                <TouchableWithoutFeedback onPress={this.onPerss}>
                    <View style={styles.container}>
                        <ListItem subtitle={this.props.item.jobTitle}
                            title={this.props.item.fullname}
                            rightAvatar={{ source: { uri: this.props.item.avatar_url }, size: 48 }}
                            style={{ flex: 0.99, marginVertical: 0, padding: 0 }} />
                        {/* <IconFeather
                            name={isSelected ? "chevron-up" : "chevron-down"}
                            type='evilicon'
                            color={'#006494'}
                            size={32} /> */}
                            <Icon
                                reverse
                                name={isSelected ? "chevron-up" : "chevron-down"}
                                type='font-awesome'
                                size={12}
                                color={isSelected?'#EE6C4D':'#979DAC'}
                                />
                    </View>
                </TouchableWithoutFeedback>
                {isSelected && this.renderDetails()}
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flexDirection: 'row-reverse',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            marginHorizontal: 10,
            marginTop: 10,
            borderRadius: 5
        },
        detailsContainer: {
            flexDirection: 'row-reverse',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#2B2D42',
            marginHorizontal: 10,
            marginTop: 0,
            padding:15,
            borderRadius: 5
        },
        detailsText: {
            fontSize: 16,
            textAlign:'right',
            paddingHorizontal: 35,
            color:'#EDF2F4'
        }
    }
)


