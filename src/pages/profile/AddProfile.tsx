import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Spinner } from "../../components";
import { UploadHandler } from "./components/UploadHandler";
import { ImagePickerResponse, launchCamera } from 'react-native-image-picker';
import { AddProfileDetails } from "./components/AddProfileDetails";
import { useDispatch, useSelector } from "react-redux";
import { userFetch } from "../../store/actions";
import { validateFile, validateInputs, validateSubmit } from "../../utils/validations";
import { convertImageToBase64, requestCameraPermissions, requestReadPermissions, requestWritePermissions } from "../../utils/flie-handling";
import { setSubmitProfile } from "../../store/actions/firebase.action";
import { getData } from "../../utils/async-storage";

type Props = {
    navigation: any
}

interface ValidationErrors {
    [key: string]: string;
}

const AddProfile = ({ navigation }: Props) => {
    const [step, setStep] = useState<number>(1);

    const [errors, setErrors] = useState<ValidationErrors>({});
    const [inputData, setInputData] = useState<any>({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        address: '',
        file: ''
    });

    const dispatch = useDispatch();

    const {
        userDetails,
        userDetailsLoading
    } = useSelector<any, any>(({ auth }) => auth);

    const {
        profilePostLoading
    } = useSelector<any, any>(({ firebase }) => firebase);

    useEffect(() => {
        dispatch(userFetch());
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
            let cameraGranted = await requestCameraPermissions();
            let readGranted = await requestReadPermissions();
            let writeGranted = await requestWritePermissions();

            if (cameraGranted && readGranted && writeGranted) {
                // console.log("Camera permission given");
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
                setErrors({});
            } else {
                // console.log("Camera permission denied");
            }
        } catch (err) {
            // console.log("err", err);
        }

    }

    const handleFormSubmit = async () => {
        const userStore = await getData();
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
            dispatch(setSubmitProfile(inputData, uid, navigation));
        } else {
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
                    {!profilePostLoading ? <Button
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