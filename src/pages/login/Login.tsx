import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleReactValidator from 'simple-react-validator';
import { Button, Input } from "../../components";
import auth from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setSignIn } from "../../store/actions";
import { useDispatch } from "react-redux";

type Props = {
    navigation: any
}

const Login = ({ navigation }: Props) => {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [validator] = useState(new SimpleReactValidator())
    const dispatch = useDispatch();
    
    const useForceUpdate = () => {
        const [value, setValue] = useState(0);
        return () => setValue(value => value + 1);
    }

    const forceUpdate = useForceUpdate()

    const handleSignUp = () => {
        navigation.navigate('signup')
    };

    const onLogin = async () => {
        try {
            // const response = await signInWithEmailAndPassword(auth, email, password);
            // console.log("response 2", response);
            if (validator.allValid()) {
                dispatch(setSignIn(email, password, navigation))
            } else {
                validator.showMessages();
                forceUpdate()
            }
        } catch (error) {
            console.log("reposne 2 error", error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.header}>Welcome</Text>
                <Text>Welcome to your portal</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Input
                    label={"Email"}
                    value={email}
                    onChangeText={(value: string) => {
                        forceUpdate();
                        setEmail(value)
                    }}
                    placeholder={"e.g: name@example.com"}
                    placeholderTextColor={"#d8d8d8"}
                    leftIcon={'envelope'}
                    inputStyle={{ marginBottom: 0 }}
                    errorText={validator.message('email', email, 'required|email')}
                />
                <Input
                    label={"Password"}
                    value={password}
                    secureTextEntry={!showPassword}
                    onChangeText={(value: string) => {
                        forceUpdate()
                        setPassword(value)
                    }}
                    placeholder={"*********"}
                    placeholderTextColor={"#d8d8d8"}
                    leftIcon={'lock'}
                    rightIcon={showPassword ? 'eye' : 'eye-slash'}
                    onPressRightIcon={() => setShowPassword(!showPassword)}
                    inputStyle={{ marginBottom: 0 }}
                    errorText={validator.message('password', password, 'required')}
                />
                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <Button
                        buttonText={'Restore passowrd'}
                        rightIcon={'arrow-up-right'}
                        color={'#da5e42'}
                        buttonStyle={{ backgroundColor: 'transparent', paddingVertical: 0, paddingHorizontal: 0 }}
                        buttonTextStyle={{ color: '#da5e42' }}
                    />
                </View>
            </View>
            <Button
                buttonText={'Login'}
                rightIcon={'arrow-right'}
                onPress={onLogin}
            />
            <Button
                buttonText={'Sign Up'}
                rightIcon={'arrow-right'}
                onPress={handleSignUp}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

export default Login;