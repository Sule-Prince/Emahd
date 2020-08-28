import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuthenticated: false,
};

const signupSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		signin: state => {
			state.isAuthenticated = true;
		},
		signout: state => {
			state.isAuthenticated = false;
		},
	},
});

const signupReducer = signupSlice.reducer;
export const { signin, signout } = signupSlice.actions;

export default signupReducer;
