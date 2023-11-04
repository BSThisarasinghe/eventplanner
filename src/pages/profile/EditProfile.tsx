import React, { useState } from "react";
import { Image, PermissionsAndroid, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Button, Input } from "../../components";
import { UploadHandler } from "./components/UploadHandler";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { AddProfileDetails } from "./components/AddProfileDetails";

const EditProfile = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = () => {
        // Implement your authentication logic here
        // console.log('Username:', username);
        // console.log('Password:', password);
    };

    const onPressUpload = async () => {

        const options: any = {
            saveToPhotos: true,
            mediaType: "photo",
            includeBase64: false
        }
        let result;
        try {
            const cameraGranted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            const readGranted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Gallery Permission',
                    message: 'App needs access to your gallery.',
                    buttonPositive: 'OK',
                }
            );
            const writeGranted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Gallery Permission',
                    message: 'App needs access to your gallery.',
                    buttonPositive: 'OK',
                }
            );
            if (cameraGranted === PermissionsAndroid.RESULTS.GRANTED && readGranted === PermissionsAndroid.RESULTS.GRANTED && writeGranted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
                result = await launchCamera(options);
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.log("err", err);
        }

        console.log("##############", result);

    }

    return (
        <View style={styles.container}>
            {/* <UploadHandler
                onPressUpload={onPressUpload}
            /> */}
            <AddProfileDetails
            />
            <View>
                <Button
                    buttonText={'Back'}
                    leftIcon={'arrow-left'}
                    buttonStyle={{ backgroundColor: '#f1e6e3' }}
                    buttonTextStyle={{ color: '#000' }}
                    leftColor={'#000'}
                />
                <Button
                    buttonText={'Next'}
                    rightIcon={'arrow-right'}
                />
            </View>
            {/* <Image source={{ uri: 'file:///data/user/0/com.eventplanner/cache/rn_image_picker_lib_temp_8293857d-2053-425b-802d-adc57f52bca9.jpg' }} style={{ width: 200, height: 200 }} /> */}
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

export default EditProfile;