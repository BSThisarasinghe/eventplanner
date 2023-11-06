import React, { useEffect, useState } from "react";
import { Image, PermissionsAndroid, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { FIREBASE_AUTH, FIREBASE_STORE } from "../../firebase/firebase-config";
import { addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Button, Input } from "../../components";
import { UploadHandler } from "./components/UploadHandler";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { AddProfileDetails } from "./components/AddProfileDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const AddProfile = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [mobile, setMobile] = useState<string>('');
    const [address, setAddress] = useState<string>('');

    const getUser = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('user');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    };

    useEffect(() => {
        const userStore = getUser();
        console.log("userStore", userStore);
    }, []);

    const onSubmitProfile = async () => {
        // Implement your authentication logic here
        // console.log('Username:', username);
        // console.log('Password:', password);
        const userStore = await getUser();
        const uid = userStore.uid;
        try {
            // await firestore().collection('users').doc(uid).set({
            //     name: 'name',
            //     profilePictureUrl: 'profilePictureUrl',
            // });
            // Profile data successfully stored.
            // const doc = addDoc(collection(FIREBASE_STORE, 'profile'), {
            //     uid: uid,
            //     firstName: firstName,
            //     lastName: lastName,
            //     email: email,
            //     mobile: mobile,
            //     address: address
            // });
            // console.log("####", doc);
            database().ref(`users/${uid}/personalinfo`)
                .push({
                    uid: uid,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    mobile: mobile,
                    address: address
                });

        } catch (error) {
            // Handle errors here.
        }
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
                firstName={firstName}
                lastName={lastName}
                email={email}
                mobile={mobile}
                address={address}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setEmail={setEmail}
                setMobile={setMobile}
                setAddress={setAddress}
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
                    onPress={onSubmitProfile}
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

export default AddProfile;