import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name: "account",
    initialState: {
        acconut: localStorage.getItem(localStorage.getItem("adress")),
    },
    reducers: {
        setAccount(state, action){
            acconut = action
        },
        disconnectAccount(state, action){

        },
    }
});

export const {setAccount, disconnectAccount} = accountSlice.actions;

export default accountSlice.reducer;