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
		talkBubble: {
			message: "",
			type: "",
			open: false,
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
		openTalkBubble: (state, action) => {
			state.talkBubble.message = action.payload.message;
			state.talkBubble.type = action.payload.type;
			state.talkBubble.open = true;
		},
		closeTalkBubble: state => {
			state.talkBubble.open = false;
			state.talkBubble.message = "";
		},
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
	openTalkBubble,
	closeTalkBubble,
} = userActions.actions;

const userActionsReducer = userActions.reducer;
export default userActionsReducer;
