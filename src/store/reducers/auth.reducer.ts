import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthModel {
  authDetails: any;
  userDetails: any;
}

const authStore = createSlice({
  name: "auth-store",
  initialState: {
    authDetails: null,
    userDetails: null
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
    userFetchSuccess: (state: AuthModel, action: PayloadAction<any>) => {
      return {
        ...state,
        userDetails: action.payload
      }
    },
    userFetchFail: (state: AuthModel, action: PayloadAction<any>) => {
      return {
        ...state,
        userDetails: null
      }
    }
  },
});

export default authStore;