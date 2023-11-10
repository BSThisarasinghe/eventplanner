import firebaseStore from '../reducers/firebase.reducer';
import Toast from 'react-native-toast-message';
import { postProfile, putProfile } from '../../services/firebase.service';

export const setSubmitProfile = (inputData: any, uid: string, navigation: any): any => {
    return (dispatch: any) => {
        dispatch(firebaseStore.actions.profilePostLoading());
        postProfile(inputData, uid)
            .then(async (res: any) => {

                navigation.navigate('drawertab')
                dispatch(firebaseStore.actions.profilePostSuccess(res));
            })
            .catch((error: any) => {
                // console.log(error);
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Something went wrong!'
                });
                dispatch(firebaseStore.actions.profilePostFail());
            });
    }
};

export const updateProfile = (inputData: any, uid: string, uniqueKey: string, setMode: (mode: string) => void): any => {
    return (dispatch: any) => {
        dispatch(firebaseStore.actions.profilePostLoading());
        putProfile(inputData, uid, uniqueKey)
            .then(async (res: any) => {
                setMode('display');
                dispatch(firebaseStore.actions.profilePostSuccess(res));
            })
            .catch((error: any) => {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Something went wrong!'
                });
                dispatch(firebaseStore.actions.profilePostFail());
            });
    }
};