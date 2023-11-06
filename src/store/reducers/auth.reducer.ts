import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthModel {
  authDetails: any;
}

const authStore = createSlice({
  name: "auth-store",
  initialState: {
    authDetails: null
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
    }
  },
});

export default authStore;