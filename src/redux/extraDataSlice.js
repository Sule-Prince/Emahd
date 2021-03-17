import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../config/axiosConfig";

export const followSuggestThunk = createAsyncThunk(
  "followSuggest/getData",
  async (args, { rejectWithValue }) => {
    try {
      const users = await (await axios.get("/followusers")).data;
      return users.users;
    } catch (error) {
      return rejectWithValue("Something went wrong, please try again later");
    }
  }
);

export const bannerPostsThunk = createAsyncThunk(
  "bannerPosts/getPosts",
  async (args, { rejectWithValue }) => {
    try {
      const data = (await axios.get("/bannerposts")).data;
      console.log(data.data);

      return data.data;
    } catch (error) {
      return rejectWithValue("Something went wrong, please try again later");
    }
  }
);

const initialState = {
  followSuggest: {
    isLoading: false,
    users: [],
    error: "",
  },
  bannerPosts: {
    data: [],
    isLoading: false,
    error: "",
  },
};

const extraData = createSlice({
  name: "extras",
  initialState,
  reducers: {
    popUserSuggest: (state, action) => {
      state.followSuggest.users.splice(action.payload, 1);
    },
  },
  extraReducers: {
    [followSuggestThunk.pending]: (state) => {
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

    [bannerPostsThunk.pending]: (state) => {
      state.bannerPosts.isLoading = true;
    },
    [bannerPostsThunk.fulfilled]: (state, action) => {
      state.bannerPosts.isLoading = false;
      console.log(action.payload);
      state.bannerPosts.data = action.payload;
      state.bannerPosts.error = "";
    },
    [bannerPostsThunk.rejected]: (state, action) => {
      state.bannerPosts.isLoading = false;
      state.bannerPosts.error = action.payload;
    },
  },
});

export const { popUserSuggest, getBannerPosts } = extraData.actions;
const extraDataReducer = extraData.reducer;

export default extraDataReducer;
