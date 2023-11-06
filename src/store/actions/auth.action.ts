import authStore from '../reducers/auth.reducer';
import auth from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import database from '@react-native-firebase/database';

export const setSignIn = (email: string, password: string, navigation: any): any => {
    return (dispatch: any) => {
        auth().signInWithEmailAndPassword(email, password)
            .then(async (user: any) => {
                const { currentUser } = auth();
                console.log("current User", JSON.stringify(currentUser));

                await AsyncStorage.setItem('user', JSON.stringify(currentUser));
                navigation.navigate('add-profile')
                dispatch(authStore.actions.loginSuccess(currentUser));
            })
            .catch((error: any) => {
                console.log(error);
                dispatch(authStore.actions.loginFail());
            });
    }
};

export const setSignUp = (email: string, password: string, navigation: any): any => {
    return (dispatch: any) => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async (user: any) => {
                const { currentUser } = auth();
                console.log("current User", JSON.stringify(currentUser));

                await AsyncStorage.setItem('user', JSON.stringify(currentUser));
                navigation.navigate('add-profile')
            })
            .catch((error: any) => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }
};

export const userFetch = (): any => {
    const { currentUser } = auth();

    return (dispatch: any) => {
        database().ref(`users/${currentUser!.uid}/personalinfo`)
            .on('value', snapshot => {
                dispatch(authStore.actions.userFetchSuccess(snapshot.val()));
            });
    }
};