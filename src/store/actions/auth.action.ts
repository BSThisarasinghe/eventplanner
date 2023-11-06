import authStore from '../reducers/auth.reducer';
import auth from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";

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