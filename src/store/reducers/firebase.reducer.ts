import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FireBaseModel {
    profilePostResponse: any;
    profilePostLoading: boolean;
}

const firebaseStore = createSlice({
    name: "firebase-store",
    initialState: {
        profilePostResponse: null,
        profilePostLoading: false
    } as FireBaseModel,
    reducers: {
        profilePostLoading: (state: FireBaseModel) => {
            return {
                ...state,
                profilePostLoading: true
            }
        },
        profilePostSuccess: (state: FireBaseModel, action: PayloadAction<any>) => {
          return {
            ...state,
            profilePostResponse: action.payload,
            profilePostLoading: false
          }
        },
        profilePostFail: (state: FireBaseModel) => {
          return {
            ...state,
            profilePostLoading: false
          }
        }
    },
});

export default firebaseStore;