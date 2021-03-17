import { createSlice } from "@reduxjs/toolkit";

const userActions = createSlice({
  name: "userActions",
  initialState: {
    uploadCoverPhoto: {
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
      shouldClose: true,
    },
    talkBubble: {
      message: "",
      type: "",
      open: false,
    },
  },
  reducers: {
    // coverphoto related reducers
    uploadingCoverPhoto: (state) => {
      state.uploadCoverPhoto.isLoading = true;
    },
    uploadedCoverPhoto: (state) => {
      state.uploadCoverPhoto.isLoading = false;
    },
    uploadCoverPhotoError: (state) => {
      state.uploadCoverPhoto.isLoading = false;
      state.uploadCoverPhoto.error = "Failed to update cover photo";
    },

    // SnackBar related reducers
    openSnackBar: (state, action) => {
      if (action.payload.type) state.snackBar.type = action.payload.type;
      if (action.payload.duration)
        state.snackBar.duration = action.payload.duration;
      if (action.payload.loading)
        state.snackBar.loading = action.payload.loading;
      if (action.payload.shouldClose)
        state.snackBar.shouldClose = action.payload.shouldClose;
      state.snackBar.message = action.payload.message;
      state.snackBar.open = true;
    },
    closeSnackBar: (state) => {
      state.snackBar.open = false;
      state.snackBar.loading = false;
      state.snackBar.shouldClose = true;
      state.snackBar.type = "success";
    },

    // Talk notifications bubble reducers
    openTalkBubble: (state, action) => {
      state.talkBubble.message = action.payload.message;
      state.talkBubble.type = action.payload.type;
      state.talkBubble.open = true;
    },
    closeTalkBubble: (state) => {
      state.talkBubble.open = false;
      state.talkBubble.message = "";
    },
  },
});

export const {
  uploadedCoverPhoto,
  uploadingCoverPhoto,
  uploadCoverPhotoError,
  openPostSkeleton,
  closePostSkeleton,
  openSnackBar,
  closeSnackBar,
  openTalkBubble,
  closeTalkBubble,
} = userActions.actions;

const userActionsReducer = userActions.reducer;
export default userActionsReducer;
