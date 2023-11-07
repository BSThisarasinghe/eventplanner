import React, { useEffect, useState } from "react";
import { Image, PermissionsAndroid, StyleSheet, Text, TextInput, ScrollView, View } from "react-native";
import { Button, Input, Spinner } from "../../components";
import { UploadHandler } from "./components/UploadHandler";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import database from '@react-native-firebase/database';
import { AddProfileDetails } from "./components/AddProfileDetails";
import SimpleReactValidator from "simple-react-validator";
import { userFetch } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFetchBlob from "rn-fetch-blob";
import Toast from "react-native-toast-message";

const EditProfile = () => {
    const [mode, setMode] = useState<string>('display');
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [mobile, setMobile] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [uniqueKey, setUniqueKey] = useState<string>('');
    const [file, setFile] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [validator] = useState(new SimpleReactValidator());

    const dispatch = useDispatch();

    const {
        userDetails,
        userDetailsLoading
    } = useSelector<any, any>(({ auth }) => auth);

    const useForceUpdate = () => {
        const [value, setValue] = useState(0);
        return () => setValue(value => value + 1);
    }

    const convertImageToBase64 = (imageUri: (string | null)) => {
        return new Promise((resolve, reject) => {
            RNFetchBlob.fs.readFile(imageUri!, 'base64')
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const forceUpdate = useForceUpdate()
    const onPressUpload = async () => {
        if (mode === 'edit') {
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
                    let imageUri: (string | null | undefined) = null;
                    if (result && result.assets && result.assets.length > 0) {
                        imageUri = result.assets[0].uri;
                    }
                    convertImageToBase64(imageUri!)
                        .then((base64Data) => {
                            console.log('Base64 data:', base64Data);
                            setFile(base64Data);
                        })
                        .catch((error) => {
                            console.error('Error converting image to base64:', error);
                        });
                } else {
                    console.log("Camera permission denied");
                }
            } catch (err) {
                console.log("err", err);
            }
        }
    }

    useEffect(() => {
        for (const userId in userDetails) {
            if (userDetails.hasOwnProperty(userId)) {
                const userData = userDetails[userId];
                setUniqueKey(userId);
                const firstName = userData.firstName;
                const uid = userData!.uid;
                setFirstName(userData.firstName);
                setLastName(userData.lastName);
                setEmail(userData.email);
                setAddress(userData.address);
                setMobile(userData.mobile);
                setFile(userData.profilePic);
            }
        }
    }, [JSON.stringify(userDetails)])

    const getUser = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('user');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    };

    const onPressEdit = () => {
        setMode('edit')
    }

    const onPressSubmit = async () => {
        setLoading(true);
        if (validator.allValid()) {
            const userStore = await getUser();
            const uid = userStore!.uid;
            const dataRef = database().ref(`users/${uid}/personalinfo/${uniqueKey}`);
            dataRef.update({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobile: mobile,
                address: address,
                profilePic: file
            })
                .then(() => {
                    console.log('Data updated successfully');
                    setLoading(false);
                    setMode('display')
                })
                .catch((error) => {
                    setLoading(false);
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Something went wrong!'
                    });
                    console.error('Error updating data: ', error);
                });
        } else {
            setLoading(false);
            validator.showMessages();
            forceUpdate()
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={'always'}>
            <Toast />
            {!userDetailsLoading ? <>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        buttonText={''}
                        rightIcon={mode == 'edit' ? 'camera' : ''}
                        buttonStyle={{ backgroundColor: '#f1e6e3', width: 150, height: 150, borderRadius: 100, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}
                        imageStyle={{ width: 150, height: 150, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}
                        rightColor={'#da5e42'}
                        onPress={onPressUpload}
                        backgroundImage={{ uri: 'data:image/png;base64,' + file }}
                    />
                </View>
                <AddProfileDetails
                    mode={mode}
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
                    scrollEnable={false}
                />
                <View>
                    {!loading ? <Button
                        buttonText={mode == 'display' ? 'Edit' : 'Save'}
                        onPress={mode == 'display' ? onPressEdit : onPressSubmit}
                    // onPress={step == 1 ? onPressNext : onSubmitProfile}
                    /> : <Spinner />}
                </View>
            </> :
                <Spinner />}
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

export default EditProfile;