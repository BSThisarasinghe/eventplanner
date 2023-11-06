import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthModel {
  authDetails: any;
  userDetails: any;
  userDetailsLoading: boolean;
}

const authStore = createSlice({
  name: "auth-store",
  initialState: {
    authDetails: null,
    userDetails: null,
    userDetailsLoading: false
  } as AuthModel,
  reducers: {
    loginSuccess: (state: AuthModel, action: PayloadAction<any>) => {
      return {
        ...state,
        authDetails: action.payload
      }
    },
    loginFail: (state: AuthModel) => {
      return {
        ...state,
        authDetails: null
      }
    },
    userFetchLoading: (state: AuthModel) => {
      return {
        ...state,
        userDetailsLoading: true
      }
    },
    userFetchSuccess: (state: AuthModel, action: PayloadAction<any>) => {
      return {
        ...state,
        userDetails: action.payload,
        userDetailsLoading: false
      }
    },
    userFetchFail: (state: AuthModel, action: PayloadAction<any>) => {
      return {
        ...state,
        userDetails: null,
        userDetailsLoading: false
      }
    }
  },
});

export default authStore;