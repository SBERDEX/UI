"use client";
import { createSlice } from "@reduxjs/toolkit";
const accountSlice = createSlice({
    name: "account",
    initialState: {
        acconut: null,
    },
    reducers: {
        setAccount(state, action){
            state.acconut = action.payload;
        },
        disconnectAccount(state, action){

        },
    }
});

export const {setAccount, disconnectAccount} = accountSlice.actions;

export default accountSlice.reducer;