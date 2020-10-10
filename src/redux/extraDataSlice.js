import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../config/axiosConfig";

export const followSuggestThunk = createAsyncThunk(
	"followSuggest/getData",
	async (args, { rejectWithValue }) => {
		try {
			const users = await (await axios.get("/followusers")).data;

			return users.users;
		} catch (error) {
			return rejectWithValue("Something seems to have gone wrong please try again");
		}
	}
);

const initialState = {
	followSuggest: {
		isLoading: false,
		users: [],
		error: "",
	},
};

const extraData = createSlice({
	name: "extras",
	initialState,
	reducers: {},
	extraReducers: {
		[followSuggestThunk.pending]: state => {
			state.followSuggest.isLoading = true;
		},
		[followSuggestThunk.fulfilled]: (state, action) => {
			state.followSuggest.isLoading = false;
			state.followSuggest.users = [...action.payload];
			state.followSuggest.error = "";
		},
		[followSuggestThunk.rejected]: (state, action) => {
			state.followSuggest.isLoading = false;
			state.followSuggest.users = [];
			state.followSuggest.error = action.payload;
		},
	},
});

const extraDataReducer = extraData.reducer;

export default extraDataReducer;
