import Toast from "react-native-toast-message";
import errorStore from "../reducers/error.reducer";

export const setError = (error: any): any => {
    return (dispatch: any) => {
        if (error.code && error.code === 'auth/email-already-in-use') {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'That email address is already in use!'
            });
        } else if (error.code && error.code === 'auth/invalid-email') {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'That email address is invalid!'
            });
        } else {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Something went wrong!'
            });
        }
        dispatch(errorStore.actions.setError(error));
    }
};

export const clearError = (): any => {
    return (dispatch: any) => {
        dispatch(errorStore.actions.clearError());
    }
};