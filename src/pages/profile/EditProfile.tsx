import React, { useEffect, useState } from "react";
import { Image, PermissionsAndroid, StyleSheet, Text, TextInput, ScrollView, View } from "react-native";
import { Button, Input, Spinner } from "../../components";
import { UploadHandler } from "./components/UploadHandler";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import database from '@react-native-firebase/database';
import { AddProfileDetails } from "./components/AddProfileDetails";
import SimpleReactValidator from "simple-react-validator";
import { updateProfile, userFetch } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { validateInputs, validateSubmit } from "../../utils/validations";
import { convertImageToBase64, requestCameraPermissions, requestReadPermissions, requestWritePermissions } from "../../utils/flie-handling";
import { getData } from "../../utils/async-storage";
import { setError } from "../../store/actions/error.action";
import { ValidationErrors } from "../../models/response/validation-erros.model";

const EditProfile = () => {
    const [mode, setMode] = useState<string>('display');

    const [uniqueKey, setUniqueKey] = useState<string>('');
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

    const {
        profilePostLoading
    } = useSelector<any, any>(({ firebase }) => firebase);

    const onPressUpload = async () => {
        if (mode === 'edit') {
            const options: any = {
                saveToPhotos: true,
                mediaType: "photo",
                includeBase64: false
            }
            let result;
            try {
                let cameraGranted = await requestCameraPermissions();
                let readGranted = await requestReadPermissions();
                let writeGranted = await requestWritePermissions();
                if (cameraGranted && readGranted && writeGranted) {
                    result = await launchCamera(options);
                    let imageUri: (string | null | undefined) = null;
                    if (result && result.assets && result.assets.length > 0) {
                        imageUri = result.assets[0].uri;
                    }
                    let base64Data = await convertImageToBase64(imageUri!)

                    setInputData((prevData: any) => ({
                        ...prevData,
                        ['file']: base64Data
                    }));
                } else {
                    // console.log("Camera permission denied");
                }
            } catch (err) {
                dispatch(setError(err));
            }
        }
    }

    useEffect(() => {
        for (const userId in userDetails) {
            if (userDetails.hasOwnProperty(userId)) {
                const userData = userDetails[userId];
                setUniqueKey(userId);

                setInputData({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    mobile: userData.mobile,
                    address: userData.address,
                    file: userData.profilePic,
                })
            }
        }
    }, [JSON.stringify(userDetails)])

    const onPressEdit = () => {
        setMode('edit')
    }

    const handleFormSubmit = async () => {

        const userStore = await getData();
        const uid = userStore!.uid;

        let errorValidations: ValidationErrors = {
            firstName: 'required',
            lastName: 'required',
            email: 'required|email',
            mobile: 'required|numeric|max:10',
            address: 'required',
            file: 'required'
        }
        const validationErrors: any = await validateSubmit(inputData, errorValidations);

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            dispatch(updateProfile(inputData, uid, uniqueKey, setMode));
        } else {
            setErrors(validationErrors);
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
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={'always'}>
            <Toast />
            {!userDetailsLoading ? <>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        buttonText={''}
                        rightIcon={mode == 'edit' ? 'camera' : ''}
                        buttonStyle={styles.buttonStyle}
                        imageStyle={styles.buttonImageStyle}
                        rightColor={'#da5e42'}
                        onPress={onPressUpload}
                        backgroundImage={{ uri: 'data:image/png;base64,' + inputData.file }}
                    />
                </View>
                <AddProfileDetails
                    mode={mode}
                    // validator={validator}
                    inputData={inputData}
                    handleInputChange={handleInputChange}
                    validateInputs={validateInputs}
                    errors={errors}
                    scrollEnable={false}
                />
                <View>
                    {!profilePostLoading ? <Button
                        buttonText={mode == 'display' ? 'Edit' : 'Save'}
                        onPress={mode == 'display' ? onPressEdit : handleFormSubmit}
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
    appleButton: { backgroundColor: '#000', flexDirection: 'row', padding: 5, borderRadius: 5, justifyContent: 'space-around', alignItems: 'center', width: 250, marginBottom: 30 },
    buttonStyle: { backgroundColor: '#f1e6e3', width: 150, height: 150, borderRadius: 100, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
    buttonImageStyle: { width: 150, height: 150, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }
});

export default EditProfile;