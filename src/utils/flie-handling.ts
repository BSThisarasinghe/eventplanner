import { PermissionsAndroid } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const convertImageToBase64 = async (imageUri: string) => {
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

export const requestCameraPermissions = async () => {
    return new Promise(async (resolve) => {
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
        resolve(cameraGranted === PermissionsAndroid.RESULTS.GRANTED)
    });
};

export const requestReadPermissions = async () => {
    return new Promise(async (resolve) => {
        const readGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: 'Gallery Permission',
                message: 'App needs access to your gallery.',
                buttonPositive: 'OK',
            }
        );
        resolve(readGranted === PermissionsAndroid.RESULTS.GRANTED);
    });
};

export const requestWritePermissions = async () => {
    return new Promise(async (resolve) => {
        const writeGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Gallery Permission',
                message: 'App needs access to your gallery.',
                buttonPositive: 'OK',
            }
        );
        resolve(writeGranted === PermissionsAndroid.RESULTS.GRANTED);
    });
};
