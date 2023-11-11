import React, { useState } from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";
import { Button, Input, Spinner } from "../../components";
import { setSignIn } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { validateInputs, validateSubmit } from "../../utils/validations";
import { setError } from "../../store/actions/error.action";
import { ValidationErrors } from "../../models/response/validation-erros.model";

type Props = {
    navigation: any
}

const Login = ({ navigation }: Props) => {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errors, setErrors] = useState<ValidationErrors>({});

    const [email, setEmail] = useState<string>('');

    const [password, setPassword] = useState<string>('');
    const dispatch = useDispatch();

    const {
        loginLoading
    } = useSelector<any, any>(({ auth }) => auth);

    const handleSignUp = () => {
        navigation.navigate('signup')
    };

    const onLogin = async () => {
        try {
            let errorValidations: ValidationErrors = {
                email: 'required|email',
                password: 'required'
            }
            const validationErrors: any = await validateSubmit({ email, password }, errorValidations);
            setErrors(validationErrors);
            if (Object.keys(validationErrors).length === 0) {
                dispatch(setSignIn(email, password, navigation))
            } else {
                setErrors(validationErrors);
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Something went wrong!'
            });
            dispatch(setError(error));
        }
    }

    const handleInputChange = (value: string, fieldName: string, rules: string) => {
        if (fieldName == 'email') {
            setEmail(value);
        } else {
            setPassword(value);
        }
        const validationErrors = validateInputs(fieldName, value, rules);
        setErrors(validationErrors);
    }

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={'always'}>
            <Toast />
            <View style={styles.titleWrapper}>
                <Text style={styles.header}>Welcome</Text>
                <Text>Welcome to your portal</Text>
            </View>
            {/* <View style={{ flex: 1 }}> */}
            <Input
                label={"Email"}
                value={email}
                onChangeText={(value: string) => handleInputChange(value, 'email', 'required|email')}
                placeholder={"e.g: name@example.com"}
                placeholderTextColor={"#d8d8d8"}
                leftIcon={'envelope'}
                inputStyle={{ marginBottom: 0 }}
                errorText={errors['email']}
            />
            <Input
                label={"Password"}
                value={password}
                secureTextEntry={!showPassword}
                onChangeText={(value: string) => handleInputChange(value, 'password', 'required')}
                placeholder={"*********"}
                placeholderTextColor={"#d8d8d8"}
                leftIcon={'lock'}
                rightIcon={showPassword ? 'eye' : 'eye-slash'}
                onPressRightIcon={() => setShowPassword(!showPassword)}
                inputStyle={{ marginBottom: 50 }}
                errorText={errors['password']}
            />
            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <Button
                    buttonText={'Restore passowrd'}
                    rightIcon={'arrow-up-right'}
                    rightColor={'#da5e42'}
                    buttonStyle={{ backgroundColor: 'transparent', paddingVertical: 0, paddingHorizontal: 0 }}
                    buttonTextStyle={{ color: '#da5e42' }}
                />
            </View>
            {/* </View> */}
            {!loginLoading ? <Button
                buttonText={'Login'}
                rightIcon={'arrow-right'}
                onPress={onLogin}
                testId={"loginButton"}
            /> : <Spinner />}
            <Button
                buttonText={'Sign Up'}
                rightIcon={'arrow-right'}
                onPress={handleSignUp}
                testId={"registerButton"}
            />

        </ScrollView>
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
    appleButton: { backgroundColor: '#000', flexDirection: 'row', padding: 5, borderRadius: 5, justifyContent: 'space-around', alignItems: 'center', width: 250, marginBottom: 30 },
    titleWrapper: { flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }
});

export default Login;