import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createStore, get } from "idb-keyval";
import { axios } from "../config/axiosConfig";
import { getLocalStorageData } from "../utils/getlocalStorageData";

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

const imageUrlThunk = createAsyncThunk(
  "user/dataUrl",
  async (args, { rejectWithValue }) => {
    try {
      const imageStore = createStore("Emahd", "image-store");
      const imgFile = await get("imageUrl", imageStore);
      const coverFIle = await get("coverPhoto", imageStore);

      const dataUrl = {
        imageUrl: "",
        coverPhoto: "",
      };

      const imgDataUrl = URL.createObjectURL(imgFile);
      const coverDataUrl = URL.createObjectURL(coverFIle);

      if (imgDataUrl) dataUrl.imageUrl = imgDataUrl;
      if (coverDataUrl) dataUrl.coverPhoto = coverDataUrl;

      return dataUrl;
    } catch (error) {
      return rejectWithValue(
        "Something seems to have gone wrong, please try again"
      );
    }
  }
);

/* Get all the user related data */
export const userDataThunk = createAsyncThunk(
  "user/getData",
  async (args, { getState, rejectWithValue, dispatch }) => {
    dispatch(imageUrlThunk());

    const isLoading = getState().user.isLoading;
    if (!isLoading) {
      return;
    }
    try {
      const userData = await axios.get("/user/userinfo");

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
        state.notifications.unread = [...action.payload.unread];
        state.notifications.read = [...action.payload.read];
        state.notifications.noOfUnread = action.payload.unread.length;
      }
    },
    updateData: (state, action) => {
      const payload = action.payload;
      state.data[payload.which] = payload.data;
    },
  },
  extraReducers: {
    [imageUrlThunk.fulfilled]: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },

    /* userDataThunk */

    [userDataThunk.pending]: (state) => {
      state.isLoading = true;
      let userData = getLocalStorageData("userData");

      if (userData) userData = JSON.parse(userData);

      if (!userData || typeof userData !== "object") {
        userData = {};
      }

      state.data = { ...state.data, ...userData };
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
        friends,
        followers,
        DOB,
        gender,
        phoneNo,
        noOfPosts,
      } = action.payload.data;
      const userData = {
        friends,
        followers,
        noOfPosts,
        bio,
        handle,
        gender,
        fullName,
        course,
        university,
        email,
        DOB,
        phoneNo,
      };
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

    [userLikedPostsThunk.pending]: (state) => {
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
  updateData,
} = userData.actions;

const userDataReducer = userData.reducer;

export default userDataReducer;

async function getDataFromDB(data) {
  const imageStore = createStore("Emahd", "image-store");
  const file = await get(data, imageStore);

  const dataUrl = URL.createObjectURL(file);
  if (dataUrl) return dataUrl;

  return "";
}
