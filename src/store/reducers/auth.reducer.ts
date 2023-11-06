import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthModel {
  authDetails: any;
  userDetails: any;
  userDetailsLoading: boolean;
  loginLoading: boolean;
  signUpLoading: boolean;
}

const authStore = createSlice({
  name: "auth-store",
  initialState: {
    authDetails: null,
    userDetails: null,
    userDetailsLoading: false,
    loginLoading: false,
    signUpLoading: false
  } as AuthModel,
  reducers: {
    loginLoading: (state: AuthModel) => {
      return {
        ...state,
        loginLoading: true
      }
    },
    loginSuccess: (state: AuthModel, action: PayloadAction<any>) => {
      return {
        ...state,
        authDetails: action.payload,
        loginLoading: false
      }
    },
    loginFail: (state: AuthModel) => {
      return {
        ...state,
        authDetails: null,
        loginLoading: false
      }
    },
    signUpLoading: (state: AuthModel) => {
      return {
        ...state,
        signUpLoading: true
      }
    },
    signUpSuccess: (state: AuthModel) => {
      return {
        ...state,
        signUpLoading: false
      }
    },
    signUpFail: (state: AuthModel) => {
      return {
        ...state,
        signUpLoading: false
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