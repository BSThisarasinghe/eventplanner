import React, { useEffect, useState } from "react";
import { Image, PermissionsAndroid, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { FIREBASE_AUTH, FIREBASE_STORE } from "../../firebase/firebase-config";
import { addDoc, collection } from 'firebase/firestore';
import SimpleReactValidator from 'simple-react-validator';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Button, Input } from "../../components";
import { UploadHandler } from "./components/UploadHandler";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { AddProfileDetails } from "./components/AddProfileDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { useDispatch, useSelector } from "react-redux";
import { userFetch } from "../../store/actions";

type Props = {
    navigation: any
}

const AddProfile = ({ navigation }: Props) => {
    const [step, setStep] = useState<number>(1);

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [mobile, setMobile] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [file, setFile] = useState<any>(null);
    const [validator] = useState(new SimpleReactValidator());

    const dispatch = useDispatch();

    const {
        userDetails
    } = useSelector<any, any>(({ auth }) => auth);

    const useForceUpdate = () => {
        const [value, setValue] = useState(0);
        return () => setValue(value => value + 1);
    }

    const forceUpdate = useForceUpdate()

    const getUser = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('user');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    };

    useEffect(() => {
        dispatch(userFetch());
    }, []);

    useEffect(() => {
        const userStore = getUser();
        console.log("userStore", userStore);
    }, []);

    useEffect(() => {
        console.log("##############################", JSON.stringify(userDetails));
        
        if (userDetails) {
            navigation.navigate('bottomtab')
        } else {
            navigation.navigate('add-profile')
        }
    }, [])

    const onSubmitProfile = async () => {
        const userStore = await getUser();
        const uid = userStore!.uid;
        try {
            if (validator.allValid()) {
                database().ref(`users/${uid}/personalinfo`)
                    .push({
                        uid: uid,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        mobile: mobile,
                        address: address
                    });
            } else {
                validator.showMessages();
                forceUpdate()
            }

        } catch (error) {
            // Handle errors here.
        }
    };

    const onPressNext = () => {
        setStep(step + 1)
    }

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
                console.log("sfdf", result);
                
                setFile(result);
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.log("err", err);
        }

    }

    return (
        <View style={styles.container}>
            {step == 1 ? <UploadHandler
                onPressUpload={onPressUpload}
                file={file}
            /> : <AddProfileDetails
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
                validator={validator}
                forceUpdate={forceUpdate}
                scrollEnable={true}
                mode={'edit'}
            />}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {step == 2 && <Button
                    buttonText={'Back'}
                    leftIcon={'arrow-left'}
                    buttonStyle={{ backgroundColor: '#f1e6e3', marginRight: 10 }}
                    buttonTextStyle={{ color: '#000' }}
                    leftColor={'#000'}
                    onPress={() => setStep(step - 1)}
                />}
                <Button
                    buttonText={'Next'}
                    rightIcon={'arrow-right'}
                    onPress={step == 1 ? onPressNext : onSubmitProfile}
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