import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../config/axiosConfig";

const initialState = {
	isLoading: true,
	data: {},
	likes: [],
	error: "",
};

export const userDataThunk = createAsyncThunk(
	"user/getData",
	async (route, { getState, rejectWithValue }) => {
		const isLoading = getState().user.isLoading;
		if (!isLoading) {
			return;
		}
		try {
			const userData = {};
			const data = await axios.get(route);
			const likes = await axios.get("/user/getlikes");
			userData.data = data.data;
			userData.likes = likes.data;
			return userData;
		} catch (err) {
			return rejectWithValue(
				"Something seems to have gone wrong, please try again"
			);
		}
	}
);

const userData = createSlice({
	name: "userData",
	initialState,
	reducers: {
		addFriend: (state, action) => {
			state.data.friends.push(action.payload);
		},
		removeFriend: (state, action) => {
			const index = state.data.friends.indexOf(action.payload);
			state.data.friends.splice(index, 1);
		},
		likePost: (state, action) => {
			state.likes.push(action.payload);
		},
		unlikePost: (state, action) => {
			const index = state.likes.indexOf(action.payload);
			state.likes.splice(index, 1);
		},
	},
	extraReducers: {
		[userDataThunk.pending]: state => {
			state.isLoading = true;
		},
		[userDataThunk.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = { ...action.payload.data };
			state.likes = [...action.payload.likes];
			state.error = "";
		},
		[userDataThunk.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const {
	addFriend,
	removeFriend,
	likePost,
	unlikePost,
} = userData.actions;

const userDataReducer = userData.reducer;

export default userDataReducer;
