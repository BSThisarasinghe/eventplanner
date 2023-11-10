import database from '@react-native-firebase/database';

const postProfile = (inputData: any, uid: string) => {
    return new Promise((resolve) => {
        let dataSubmit = database().ref(`users/${uid}/personalinfo`)
            .push({
                uid: uid,
                firstName: inputData.firstName,
                lastName: inputData.lastName,
                email: inputData.email,
                mobile: inputData.mobile,
                address: inputData.address,
                profilePic: inputData.file
            });
        resolve(dataSubmit);
    });
};

const putProfile = (inputData: any, uid: string, uniqueKey: string) => {
    const dataRef = database().ref(`users/${uid}/personalinfo/${uniqueKey}`); // Update profile data

    return dataRef.update({
        firstName: inputData.firstName,
        lastName: inputData.lastName,
        email: inputData.email,
        mobile: inputData.mobile,
        address: inputData.address,
        profilePic: inputData.file
    });
};


export {
    postProfile,
    putProfile
}