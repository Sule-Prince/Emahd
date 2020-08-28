import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../config/axiosConfig";

const initialState = {
	isLoading: true,
	userInfo: {},
	screams: [],
	error: "",
};

export const otherUsersThunk = createAsyncThunk(
	"otherUser/getData",
	async (user, { getState, rejectWithValue }) => {
		try {
			const otherUserData = await axios.get(`user/${user}/otheruserinfo`);
			return otherUserData.data;
		} catch (err) {
			return rejectWithValue("Failed to get user's data, try again later");
		}
	}
);

const otherUsersData = createSlice({
	name: "otherUserData",
	initialState,
	reducers: {},
	extraReducers: {
		[otherUsersThunk.pending]: state => {
			state.isLoading = true;
		},
		[otherUsersThunk.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.userInfo = { ...action.payload.user };
			state.screams = [...action.payload.screams];
			state.error = "";
		},
		[otherUsersThunk.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
			state.userInfo = {};
			state.screams = {};
		},
	},
});

const otherUsersDataReducer = otherUsersData.reducer;

export default otherUsersDataReducer;
