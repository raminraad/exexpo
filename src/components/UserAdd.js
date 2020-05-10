import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal, TextInput, Button } from 'react-native';
import { globalStyles, colors } from '../styles/global';
import { Formik } from 'formik';

export default function UserAdd({ onSubmit,onCancel }) {

    return (
        <View style={globalStyles.container}>
            <Formik
                initialValues={{ fName: '', lName: '', jobTitle: '',description:'' }}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    onSubmit(values);
                }}>
                {
                    (props) => (
                        <View>
                            <TextInput
                                style={globalStyles.input}
                                placeholder='نام'
                                onChangeText={props.handleChange('fName')}
                                value={props.values.title}
                            />
                            <TextInput
                                multiline
                                style={globalStyles.input}
                                placeholder='نام خانوادگی'
                                onChangeText={props.handleChange('lName')}
                                value={props.values.body}
                            />
                            <TextInput
                                style={globalStyles.input}
                                placeholder='سمت'
                                onChangeText={props.handleChange('jobTitle')}
                                value={props.values.rating}/>
                                <TextInput
                                multiline
                                keyboardType='numeric'
                                style={globalStyles.input}
                                placeholder='توضیحات'
                                onChangeText={props.handleChange('description')}
                                value={props.values.rating}/>
                                <Button
                                title='تأیید'
                                color={colors.btnAdd}
                                onPress={props.handleSubmit} />
                                <View style={{height:15}}/>
                                <Button
                                title='انصراف'
                                color={colors.btnCancel}
                                onPress={onCancel} />
                            
                        </View>
                    )
                }
            </Formik>
        </View>
    )
}