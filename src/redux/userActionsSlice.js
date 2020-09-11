import { createSlice } from "@reduxjs/toolkit";

const userActions = createSlice({
	name: "userActions",
	initialState: {
		uploadprofilePic: {
			isLoading: false,
			error: "",
		},
		loadingPosts: {
			isLoading: false,
			which: "",
		},
		snackBar: {
			type: "success",
			message: "",
			duration: null,
			open: false,
			loading: false,
		},
	},
	reducers: {
		uploadingprofilePic: state => {
			state.uploadprofilePic.isLoading = true;
		},
		uploadedProfilePic: state => {
			state.uploadprofilePic.isLoading = false;
		},
		uploadError: state => {
			state.uploadprofilePic.error = "Failed to update profile picture";
		},
		openSnackBar: (state, action) => {
			if (action.payload.type) state.snackBar.type = action.payload.type;
			if (action.payload.duration)
				state.snackBar.duration = action.payload.duration;
			if (action.payload.loading)
				state.snackBar.loading = action.payload.loading;
			state.snackBar.message = action.payload.message;
			state.snackBar.open = true;
		},
		closeSnackBar: state => {
			state.snackBar.open = false;
			state.snackBar.loading = false;
			state.snackBar.type = "success";
		},
		/* 	openPostSkeleton: (state, action) => {
			state.loadingPosts.isLoading = true;
			state.loadingPosts.which = action.payload;
		},
		closePostSkeleton: state => {
			state.loadingPosts.isLoading = false;
			state.loadingPosts.which = "";
		}, */
	},
});

export const {
	uploadedProfilePic,
	uploadingprofilePic,
	uploadError,
	openPostSkeleton,
	closePostSkeleton,
	openSnackBar,
	closeSnackBar,
} = userActions.actions;

const userActionsReducer = userActions.reducer;
export default userActionsReducer;
