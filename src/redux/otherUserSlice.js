import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../config/axiosConfig";

const initialState = {
  isLoading: true,
  userData: {
    coverPhoto: "",
    imageUrl: "",
    noOfPosts: "__",
    friends: "",
    followers: "",
  },
  userPost: {
    media: [],
    scream: [],
  },
  features: {
    feature: [],
    data: [],
    isLoading: false,
    error: "",
  },
  error: "",
};

export const otherUsersThunk = createAsyncThunk(
  "otherUser/getData",
  async (user, { rejectWithValue }) => {
    try {
      const otherUserData = await axios.get(`user/${user}/otheruserinfo`);
      return otherUserData.data;
    } catch (err) {
      return rejectWithValue("Failed to get user's data, try again later");
    }
  }
);

export const getotherFeaturesThunk = createAsyncThunk(
  "otherUserFeatures/getData",
  async (args, { getState, rejectWithValue }) => {
    try {
      const { userId } = getState().otherUser.userData;
      console.log(userId);
      const features = (await axios.post("/extra/getfeatures", { uid: userId }))
        .data;
      return features;
    } catch (error) {
      return rejectWithValue("Something went wrong, please try again later");
    }
  }
);

const otherUsersData = createSlice({
  name: "otherUserData",
  initialState,
  reducers: {},
  extraReducers: {
    [otherUsersThunk.pending]: (state) => {
      state.isLoading = true;
      state.features.feature = [];
      state.features.data = [];
    },
    [otherUsersThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userData = { ...action.payload.user };
      state.userPost = action.payload.userPost;
      state.error = "";
    },
    [otherUsersThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.userData = {};
      state.userPost = {};
    },
    [getotherFeaturesThunk.pending]: (state) => {
      state.features.isLoading = true;
    },
    [getotherFeaturesThunk.fulfilled]: (state, action) => {
      state.features.isLoading = false;

      state.features.feature = action.payload.features;
      state.features.data = action.payload.featuredData;
    },
    [getotherFeaturesThunk.rejected]: (state) => {
      state.features.isLoading = false;
    },
  },
});

const otherUsersDataReducer = otherUsersData.reducer;

export default otherUsersDataReducer;
