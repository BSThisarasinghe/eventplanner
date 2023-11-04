import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Button, Input } from "../../../components";


const AddProfileDetails = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = () => {
        // Implement your authentication logic here
        // console.log('Username:', username);
        // console.log('Password:', password);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.header}>Welcome</Text>
                <Text>Welcome to your portal</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Input
                    label={"First Name"}
                    value={email}
                    onChangeText={(value: string) => setEmail(value)}
                    placeholder={"e.g: name@example.com"}
                    placeholderTextColor={"#d8d8d8"}
                    // leftIcon={'envelope'}
                    inputStyle={{ marginBottom: 0 }}
                />
                <Input
                    label={"Last Name"}
                    value={password}
                    onChangeText={(value: string) => setPassword(value)}
                    placeholder={"*********"}
                    placeholderTextColor={"#d8d8d8"}
                    // leftIcon={'lock'}
                    // rightIcon={showPassword ? 'eye' : 'eye-slash'}
                    onPressRightIcon={() => setShowPassword(!showPassword)}
                    inputStyle={{ marginBottom: 0 }}
                />
                <Input
                    label={"Email"}
                    value={password}
                    onChangeText={(value: string) => setPassword(value)}
                    placeholder={"*********"}
                    placeholderTextColor={"#d8d8d8"}
                    // leftIcon={'lock'}
                    // rightIcon={showPassword ? 'eye' : 'eye-slash'}
                    onPressRightIcon={() => setShowPassword(!showPassword)}
                    inputStyle={{ marginBottom: 0 }}
                />
                <Input
                    label={"Phone number"}
                    value={password}
                    onChangeText={(value: string) => setPassword(value)}
                    placeholder={"*********"}
                    placeholderTextColor={"#d8d8d8"}
                    // leftIcon={'lock'}
                    // rightIcon={showPassword ? 'eye' : 'eye-slash'}
                    onPressRightIcon={() => setShowPassword(!showPassword)}
                    inputStyle={{ marginBottom: 0 }}
                />
                <Input
                    label={"Mailing address"}
                    value={password}
                    onChangeText={(value: string) => setPassword(value)}
                    placeholder={"*********"}
                    placeholderTextColor={"#d8d8d8"}
                    // leftIcon={'lock'}
                    // rightIcon={showPassword ? 'eye' : 'eye-slash'}
                    onPressRightIcon={() => setShowPassword(!showPassword)}
                    inputStyle={{ marginBottom: 0 }}
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