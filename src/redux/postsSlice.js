import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../config/axiosConfig";
import IDGenerator from "../utils/IDGenerator";

const initialState = {
  isLoading: false,
  posts: {
    media: [],
    scream: [],
    userPost: {
      media: [],
      scream: [],
    },
  },
  error: "",
  retries: 0,
  uploadProfilePic: {
    isLoading: false,
    error: "",
  },
};

export const screamsDataThunk = createAsyncThunk(
  "post/getData",
  async (args, { getState, dispatch, rejectWithValue }) => {
    let posts = getState().posts.posts;

    try {
      const response = await axios.get("/screams");
      if (!response.data.feedback) {
        posts = response.data;
      }
      return posts;
    } catch (error) {
      if (!navigator.onLine)
        return rejectWithValue(
          "Cannot get posts, please connect to the internet!!"
        );
      if (posts.retries <= 5 && navigator.onLine) {
        setTimeout(() => {
          dispatch(screamsDataThunk());
        }, 10000);
      }
      return rejectWithValue("Cannot get posts, please try again later");
    }
  }
);

const screamsData = createSlice({
  name: "postsData",
  initialState,
  reducers: {
    // profile photo related reducers
    uploadingProfilePic: (state) => {
      state.uploadProfilePic.isLoading = true;
    },
    uploadedProfilePic: (state, action) => {
      const payload = action.payload,
        length = state.posts.length,
        userPostLength = state.posts[length - 1].length;
      state.uploadProfilePic.isLoading = false;

      if (length === 0) return;
      if (userPostLength === 0) return;
      if (state.posts[length - 1][0].handle === payload.user) {
        state.posts[length - 1].map((post) => {
          post.imageUrl = payload.url;

          return post;
        });
      }
    },
    uploadProfilePicError: (state) => {
      state.uploadProfilePic.isLoading = false;
      state.uploadProfilePic.error = "Failed to update profile picture";
    },

    updatePost: (state, { payload: { index, user, type, ...data } }) => {
      if (user) {
        const newPost = {
          ...state.posts.userPost[type][index],
          [Object.keys(data)[0]]: Object.values(data)[0],
        };

        state.posts.userPost[type] = updateObjectInArray(
          state.posts.userPost[type],
          {
            index,
            item: newPost,
          }
        );
        // state.posts.userPost[type][index] = { ...newPost };
      } else
        state.posts[type][index][Object.keys(data)[0]] = Object.values(data)[0];
    },
  },
  extraReducers: {
    [screamsDataThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [screamsDataThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.error = "";
    },
    [screamsDataThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.retries += 1;
      if (!navigator.onLine) {
        state.error = action.payload;
        return;
      }
      if (state.retries === 3) {
        state.error = action.payload;
      }
    },
  },
});

export const {
  uploadedProfilePic,
  uploadingProfilePic,
  uploadProfilePicError,
  updatePost,
} = screamsData.actions;

const screamDataReducer = screamsData.reducer;
export default screamDataReducer;

function updateObjectInArray(array, action) {
  return array.map((item, index) => {
    if (index !== action.index) {
      // This isn't the item we care about - keep it as-is
      return item;
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...action.item,
    };
  });
}
