import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorModel {
    error: any;
}

const errorStore = createSlice({
    name: "error-store",
    initialState: {
        error: null
    } as ErrorModel,
    reducers: {
        setError: (state: ErrorModel, action: PayloadAction<any>) => {
            return {
                ...state,
                error: action.payload
            }
        },
        clearError: (state: ErrorModel) => {
            return {
                ...state,
                error: null
            }
        }
    },
});

export default errorStore;