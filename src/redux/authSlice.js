import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../config/axiosConfig";

const initialState = {
	isAuthenticated: false,
};

/* const refreshTokenThunk = createAsyncThunk("refreshtoken", async (arg) => {
	try {
		const response = await axios.post("/login", arg)
		const token = response.data
		localStorage.setItem("token", token);
	} catch (error) {}
}) */

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
