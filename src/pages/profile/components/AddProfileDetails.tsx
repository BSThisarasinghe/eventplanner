import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Button, Input } from "../../../components";

interface ValidationErrors {
    [key: string]: string;
}


type Props = {
    scrollEnable: boolean;
    mode: string;
    validateInputs: (key: string, value: string, rules: string) => ValidationErrors,
    handleInputChange: (fieldName: string, value: string, rules: string) => void,
    errors: ValidationErrors,
    inputData: any
}

const AddProfileDetails = ({
    scrollEnable,
    mode,
    handleInputChange,
    errors,
    inputData
}: Props) => {

    return (
        <ScrollView contentContainerStyle={styles.container} scrollEnabled={scrollEnable} keyboardShouldPersistTaps={'always'}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.header}>Welcome</Text>
                <Text>Welcome to your portal</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Input
                    label={"First Name"}
                    value={inputData.firstName}
                    // onChangeText={(value: string) => {
                    //     validateInputs("First Name", value, 'required');
                    //     setFirstName(value);
                    //     forceUpdate();
                    // }}
                    onChangeText={(value: string) => handleInputChange('firstName', value, 'required')}
                    placeholder={"e.g: name@example.com"}
                    placeholderTextColor={"#d8d8d8"}
                    // leftIcon={'envelope'}
                    inputStyle={{ marginBottom: 0 }}
                    errorText={errors['firstName']}
                    editable={mode === 'edit'}
                />
                <Input
                    label={"Last Name"}
                    value={inputData.lastName}
                    // onChangeText={(value: string) => {
                    //     setLastName(value);
                    //     forceUpdate();
                    // }}
                    onChangeText={(value: string) => handleInputChange('lastName', value, 'required')}
                    placeholder={"*********"}
                    placeholderTextColor={"#d8d8d8"}
                    // leftIcon={'lock'}
                    // rightIcon={showPassword ? 'eye' : 'eye-slash'}
                    // onPressRightIcon={() => setShowPassword(!showPassword)}
                    inputStyle={{ marginBottom: 0 }}
                    // errorText={validator.message('last name', lastName, 'required')}
                    errorText={errors['lastName']}
                    editable={mode === 'edit'}
                />
                <Input
                    label={"Email"}
                    value={inputData.email}
                    // onChangeText={(value: string) => {
                    //     setEmail(value);
                    //     forceUpdate();
                    // }}
                    onChangeText={(value: string) => handleInputChange('email', value, 'required|email')}
                    placeholder={"*********"}
                    placeholderTextColor={"#d8d8d8"}
                    // leftIcon={'lock'}
                    // rightIcon={showPassword ? 'eye' : 'eye-slash'}
                    // onPressRightIcon={() => setShowPassword(!showPassword)}
                    inputStyle={{ marginBottom: 0 }}
                    // errorText={validator.message('email', email, 'required|email')}
                    errorText={errors['email']}
                    editable={mode === 'edit'}
                />
                <Input
                    label={"Phone number"}
                    value={inputData.mobile}
                    // onChangeText={(value: string) => {
                    //     setMobile(value)
                    //     forceUpdate();
                    // }}
                    onChangeText={(value: string) => handleInputChange('mobile', value, 'required|numeric|max:10')}
                    placeholder={"*********"}
                    placeholderTextColor={"#d8d8d8"}
                    // leftIcon={'lock'}
                    // rightIcon={showPassword ? 'eye' : 'eye-slash'}
                    // onPressRightIcon={() => setShowPassword(!showPassword)}
                    inputStyle={{ marginBottom: 0 }}
                    // errorText={validator.message('mobile', mobile, 'required|numeric|max:10')}
                    errorText={errors['mobile']}
                    editable={mode === 'edit'}
                />
                <Input
                    label={"Mailing address"}
                    value={inputData.address}
                    // onChangeText={(value: string) => {
                    //     setAddress(value)
                    //     forceUpdate();
                    // }}
                    onChangeText={(value: string) => handleInputChange('address', value, 'required')}
                    placeholder={"*********"}
                    placeholderTextColor={"#d8d8d8"}
                    // leftIcon={'lock'}
                    // rightIcon={showPassword ? 'eye' : 'eye-slash'}
                    // onPressRightIcon={() => setShowPassword(!showPassword)}
                    inputStyle={{ marginBottom: 0 }}
                    // errorText={validator.message('address', address, 'required')}
                    errorText={errors['address']}
                    editable={mode === 'edit'}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center',
        padding: 16,
        // backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#000'
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#00b8a9',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 10,
        color: '#000'
    },
    button: {
        backgroundColor: '#00b8a9',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10
    },
    textStyle: {
        color: '#000',
        margin: 20
    },
    smallText: {
        color: '#000',
        fontSize: 10,
        margin: 10
    },
    facebookButton: { backgroundColor: '#4c69ba', flexDirection: 'row', padding: 5, borderRadius: 5, justifyContent: 'space-around', alignItems: 'center', width: 250, marginBottom: 10 },
    googleButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#d8d8d8', flexDirection: 'row', padding: 5, borderRadius: 5, justifyContent: 'space-around', alignItems: 'center', width: 250, marginBottom: 10 },
    appleButton: { backgroundColor: '#000', flexDirection: 'row', padding: 5, borderRadius: 5, justifyContent: 'space-around', alignItems: 'center', width: 250, marginBottom: 30 }
});

export { AddProfileDetails };