import authStore from '../reducers/auth.reducer';
import auth from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import database from '@react-native-firebase/database';
import Toast from 'react-native-toast-message';

export const setSignIn = (email: string, password: string, navigation: any): any => {
    return (dispatch: any) => {
        dispatch(authStore.actions.loginLoading());
        auth().signInWithEmailAndPassword(email, password)
            .then(async (user: any) => {
                const { currentUser } = auth();
                // console.log("current User", JSON.stringify(currentUser));

                await AsyncStorage.setItem('user', JSON.stringify(currentUser));
                navigation.navigate('add-profile')
                dispatch(authStore.actions.loginSuccess(currentUser));
            })
            .catch((error: any) => {
                // console.log(error);
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Something went wrong!'
                });
                dispatch(authStore.actions.loginFail());
            });
    }
};

export const setSignUp = (email: string, password: string, navigation: any): any => {
    return (dispatch: any) => {
        dispatch(authStore.actions.signUpLoading());
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async (user: any) => {
                const { currentUser } = auth();
                // console.log("current User", JSON.stringify(currentUser));
                dispatch(authStore.actions.signUpSuccess());

                await AsyncStorage.setItem('user', JSON.stringify(currentUser));
                navigation.navigate('add-profile')
            })
            .catch((error: any) => {
                dispatch(authStore.actions.signUpFail());
                if (error.code === 'auth/email-already-in-use') {
                    // console.log('That email address is already in use!');
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'That email address is already in use!'
                    });
                }

                if (error.code === 'auth/invalid-email') {
                    // console.log('That email address is invalid!');
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'That email address is invalid!'
                    });
                }

                // console.error(error);
            });
    }
};

export const userFetch = (): any => {
    const { currentUser } = auth();
    if (currentUser) {
        return (dispatch: any) => {
            dispatch(authStore.actions.userFetchLoading());
            database().ref(`users/${currentUser!.uid}/personalinfo`)
                .on('value', snapshot => {
                    dispatch(authStore.actions.userFetchSuccess(snapshot.val()));
                });
        }
    } else {
        return (dispatch: any) => {
            dispatch(authStore.actions.userFetchFail(null));
        }
    }

};

export const logOutUser = (): any => {
    return (dispatch: any) => {
        auth().signOut().then(function () {
            AsyncStorage.clear();
        }).catch(function (error) {
            // console.log("Logout error", error);
        });
    }
};