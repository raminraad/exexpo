import React, {Component} from 'react';
import {StyleSheet, TextInput} from "react-native";
import Modal from "react-native-modalbox";

class UserAddModal extends Component {
    showModal(){
        this.refs.myModal.open();
    }

    render() {
        return (
            <Modal
                ref={'myModal'}
                style={styles.modal} position='center' backDrop={true} backButtonClose={true} swipeToClose={true}>
                <TextInput
                    name='fullname'
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    textAlign="right"
                    placeholder="نام و نام خانوادگی"
                    onSubmitEditing={() => this.password.focus()}
                    onChangeText={(val) => this.setState({username: val})}
                    ref={(input) => this.username = input}
                />
                <TextInput
                    name='jobTitle'
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    textAlign="right"
                    placeholder="سمت"
                    onSubmitEditing={() => this.password.focus()}
                    onChangeText={(val) => this.setState({username: val})}
                    ref={(input) => this.username = input}
                />
            </Modal>
        );
    }
}

export default UserAddModal;


const styles = StyleSheet.create(
    {
        modal:{
            backgroundColor: '#EEE',
            justifyContent:'center',
            //todo: remove two following lines when you moved modal to main screen class
            marginTop:-700,
            marginLeft:-350,
            borderRadius:25,
            borderWidth:1,
            borderColor:'#577399',
            shadowRadius:100,
            shadowColor:'black',
            width:500,
            height:600,

        },
        inputBox: {
            width: 300,
            height: 50,
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: 25,
            paddingHorizontal: 16,
            fontSize: 16,
            color: 'rgba(255,255,255,1)',
            marginVertical: 10,
        },
    }
);
