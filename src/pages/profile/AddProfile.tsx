import React, { useEffect, useState } from "react";
import { Image, PermissionsAndroid, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { FIREBASE_AUTH, FIREBASE_STORE } from "../../firebase/firebase-config";
import { addDoc, collection } from 'firebase/firestore';
import SimpleReactValidator from 'simple-react-validator';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Button, Input, Spinner } from "../../components";
import { UploadHandler } from "./components/UploadHandler";
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { AddProfileDetails } from "./components/AddProfileDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { useDispatch, useSelector } from "react-redux";
import { userFetch } from "../../store/actions";
import { validateFile, validateInputs, validateSubmit } from "../../utils/validations";

type Props = {
    navigation: any
}

interface ValidationErrors {
    [key: string]: string;
}

const AddProfile = ({ navigation }: Props) => {
    const [step, setStep] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const [errors, setErrors] = useState<ValidationErrors>({});
    const [inputData, setInputData] = useState<any>({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        address: '',
        file: ''
    });

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

    const forceUpdate = useForceUpdate()

    const getUser = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('user');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    };

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

    useEffect(() => {
        dispatch(userFetch());
    }, []);

    useEffect(() => {
        const userStore = getUser();
        // console.log("userStore", userStore);
    }, []);

    useEffect(() => {
        if (userDetails) {
            navigation.navigate('drawertab')
        } else {
            navigation.navigate('add-profile')
        }
    }, [userDetails])

    const onPressNext = async () => {
        const validationErrors: any = await validateFile(inputData);
        console.log("#######################33", validationErrors);
        
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            setStep(step + 1)
        } else {
            setErrors(validationErrors);
        }
    }

    const onPressUpload = async () => {

        const options: any = {
            saveToPhotos: true,
            mediaType: "photo",
            includeBase64: false
        }
        let result: ImagePickerResponse;
        try {
            const cameraGranted = await PermissionsAndroid.request( // Permission for camera
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
                // console.log("Camera permission given");
                result = await launchCamera(options);
                let imageUri: (string | null | undefined) = null;
                if (result && result.assets && result.assets.length > 0) {
                    imageUri = result.assets[0].uri;
                }
                convertImageToBase64(imageUri!)
                    .then((base64Data) => {
                        // console.log('Base64 data:', base64Data);
                        setInputData((prevData: any) => ({
                            ...prevData,
                            ['file']: base64Data
                        }));
                        setErrors({});
                    })
                    .catch((error) => {
                        // console.error('Error converting image to base64:', error);
                    });

            } else {
                // console.log("Camera permission denied");
            }
        } catch (err) {
            // console.log("err", err);
        }

    }

    const handleFormSubmit = async () => {
        setLoading(true);
        const userStore = await getUser();
        const uid = userStore!.uid;
        let errorValidations: ValidationErrors = {
            firstName: 'required',
            lastName: 'required',
            email: 'required|email',
            mobile: 'required|numeric|max:10',
            address: 'required'
        }
        const validationErrors: any = await validateSubmit(inputData, errorValidations);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                await database().ref(`users/${uid}/personalinfo`)
                    .push({
                        uid: uid,
                        firstName: inputData.firstName,
                        lastName: inputData.lastName,
                        email: inputData.email,
                        mobile: inputData.mobile,
                        address: inputData.address,
                        profilePic: inputData.file
                    });
                setLoading(false);
                navigation.navigate('drawertab');

            } catch (error) {
                // Handle errors here.
                setLoading(false);
            }
        } else {
            setLoading(false);
            setErrors(validationErrors);
            // forceUpdate();
        }
    };

    const handleInputChange = (fieldName: string, value: string, rules: string) => {
        setInputData((prevData: any) => ({
            ...prevData,
            [fieldName]: value
        }));
        const validationErrors = validateInputs(fieldName, value, rules);
        setErrors(validationErrors);
        // forceUpdate();
    };

    return (
        <View style={styles.container}>
            {!userDetailsLoading ? <>
                {step == 1 ? <UploadHandler // wizard implementation
                    onPressUpload={onPressUpload}
                    file={inputData.file}
                    errors={errors}
                /> : <AddProfileDetails
                    inputData={inputData}
                    handleInputChange={handleInputChange}
                    validateInputs={validateInputs}
                    errors={errors}
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
                    {!loading ? <Button
                        buttonText={'Next'}
                        rightIcon={'arrow-right'}
                        onPress={step == 1 ? onPressNext : handleFormSubmit}
                    /> : <Spinner />}
                </View>
            </> : <Spinner />}
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