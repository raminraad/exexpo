import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal, TextInput, Button } from 'react-native';
import { globalStyles , colors} from '../styles/global';
import {Formik} from 'formik';

export default function UserAdd({addItem}){

    return(
        <View style={globalStyles.container}>
            <Formik
                initialValues ={{title:'',body:'',rating:''}}
                onSubmit={(values,actions)=>{
                    actions.resetForm();
                    addItem(values);
                }}>
                    {
                        (props)=>(
                            <View>
                                <TextInput 
                                    style={globalStyles.input} 
                                    placeholder='Review title' 
                                    onChangeText={props.handleChange('title')} 
                                    value={props.values.title}
                                />
                                <TextInput
                                    multiline
                                    style={globalStyles.input} 
                                    placeholder='Review body' 
                                    onChangeText={props.handleChange('body')} 
                                    value={props.values.body}
                                />
                                <TextInput
                                    multiline
                                    keyboardType='numeric'
                                    style={globalStyles.input} 
                                    placeholder='Rating (1-5)' 
                                    onChangeText={props.handleChange('rating')} 
                                    value={props.values.rating}
                                />
                                <Button
                                    title='تأیید'
                                    color={colors.btnAdd}
                                    onPress={props.handleSubmit}/>
                            </View>
                        )
                    }
            </Formik>
        </View>
    )
}