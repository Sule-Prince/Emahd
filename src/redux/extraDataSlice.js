import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../config/axiosConfig";
import { makeSingleArray, objectToArray } from "../utils/helperFunctions";

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

      return data.data;
    } catch (error) {
      return rejectWithValue("Something went wrong, please try again later");
    }
  }
);

export const getFeaturesThunk = createAsyncThunk(
  "features/getData",
  async (args, { rejectWithValue }) => {
    try {
      const features = (await axios.post("/extra/getfeatures")).data;
      return features;
    } catch (error) {
      return rejectWithValue("Something went wrong, please try again later");
    }
  }
);

export const getFeaturedThunk = createAsyncThunk(
  "featured/getData",
  async (args, { rejectWithValue }) => {
    try {
      const featured = (await axios.get("/extra/getfeatured")).data;
      return featured;
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
  features: {
    feature: [],
    data: [],
    isLoading: false,
    error: "",
  },
  featured: {
    feature: [],
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
      state.followSuggest.users = [
        ...action.payload.filter((user) => user !== null),
      ];
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
      state.bannerPosts.data = action.payload;
      state.bannerPosts.error = "";
    },
    [bannerPostsThunk.rejected]: (state, action) => {
      state.bannerPosts.isLoading = false;
      state.bannerPosts.error = action.payload;
    },
    [getFeaturesThunk.pending]: (state) => {
      state.features.isLoading = true;
    },
    [getFeaturesThunk.fulfilled]: (state, action) => {
      state.features.isLoading = false;

      state.features.feature = action.payload.features;
      state.features.data = action.payload.featuredData;
    },
    [getFeaturesThunk.rejected]: (state) => {
      state.features.isLoading = false;
    },
    [getFeaturedThunk.pending]: (state) => {
      state.featured.isLoading = true;
    },
    [getFeaturedThunk.fulfilled]: (state, action) => {
      state.featured.isLoading = false;
      const feature = makeSingleArray(objectToArray(action.payload.featured));
      state.featured.feature = feature;

      const data = {};
      action.payload.data.forEach((featuredData) => {
        const posts = makeSingleArray(objectToArray(featuredData.data)).sort(
          (a, b) => {
            if (a.createdAt > b.createdAt) return 1;
            if (a.createdAt === b.createdAt) return 0;
            else return -1;
          }
        );
        data[featuredData.id] = posts;
      });

      state.featured.data = data;
    },
    [getFeaturedThunk.rejected]: (state) => {
      state.featured.isLoading = false;
    },
  },
});

export const { popUserSuggest, getBannerPosts } = extraData.actions;
const extraDataReducer = extraData.reducer;

export default extraDataReducer;
