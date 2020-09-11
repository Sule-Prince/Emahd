import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../config/axiosConfig";

const initialState = {
	isLoading: true,
	data: {},
	likes: [],
	notifications: {
		read: [],
		unread: [],
		noOfUnread: 0,
	},
	likedPosts: {
		isLoading: false,
		data: [],
		error: "",
		hasRequested: false,
	},
	error: "",
};

/* Get all the user related data */

export const userDataThunk = createAsyncThunk(
	"user/getData",
	async (route, { getState, rejectWithValue }) => {
		const isLoading = getState().user.isLoading;
		if (!isLoading) {
			return;
		}
		try {
			const userData = await axios.get(route);

			return userData.data;
		} catch (err) {
			return rejectWithValue(
				"Something seems to have gone wrong, please try again"
			);
		}
	}
);

/* Get all the posts a user has liked */

export const userLikedPostsThunk = createAsyncThunk(
	"user/getLikedPosts",
	async (likesArray, { rejectWithValue, getState }) => {
		if (getState().user.likedPosts.hasRequested) {
			return getState().likedPosts.data;
		}
		try {
			const userData = await axios.post("/user/getlikedposts", likesArray);

			return userData.data;
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
		updateLikedPosts: (state, action) => {
			state.likedPosts.data.push(action.payload);
		},
		updateUnlikedPosts: (state, action) => {
			let index;
			state.likedPosts.data.filter((obj, i) => {
				if (obj.postId === action.payload) {
					index = i;
					return obj;
				}
				return obj;
			});

			if (index >= 0) state.likedPosts.data.splice(index, 1);
		},
		notifications: (state, action) => {
			if (action.payload) {
				state.notifications.unread = [...action.payload.unread.reverse()];
				state.notifications.read = [...action.payload.read.reverse()];
				state.notifications.noOfUnread = action.payload.unread.length;
			}
		},
	},
	extraReducers: {
		/* userDataThunk */

		[userDataThunk.pending]: state => {
			state.isLoading = true;
			let userData;

			if (localStorage.getItem("userData"))
				userData = JSON.parse(localStorage.getItem("userData"));

			if (userData && typeof userData === "object") {
				state.data = userData;
			}
		},
		[userDataThunk.fulfilled]: (state, action) => {
			state.isLoading = false;
			const {
				bio,
				handle,
				fullName,
				course,
				university,
				email,
			} = action.payload.data;
			const userData = { bio, handle, fullName, course, university, email };
			localStorage.setItem("userData", JSON.stringify(userData));
			state.data = { ...action.payload.data };
			state.likes = [...action.payload.likes];
			state.error = "";
		},
		[userDataThunk.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},

		/* userLikedPostsThunk */

		[userLikedPostsThunk.pending]: state => {
			state.likedPosts.error = "";
			state.likedPosts.isLoading = true;
		},
		[userLikedPostsThunk.fulfilled]: (state, action) => {
			state.likedPosts.isLoading = false;
			state.likedPosts.error = "";
			state.likedPosts.data = [...action.payload];
			state.likedPosts.hasRequested = true;
		},
		[userLikedPostsThunk.rejected]: (state, action) => {
			state.likedPosts.isLoading = false;
			state.likedPosts.error = action.payload;
		},
	},
});

export const {
	addFriend,
	removeFriend,
	likePost,
	unlikePost,
	updateLikedPosts,
	updateUnlikedPosts,
	notifications,
} = userData.actions;

const userDataReducer = userData.reducer;

export default userDataReducer;
