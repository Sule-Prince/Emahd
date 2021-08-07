import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../config/axiosConfig";
import { dataEntries, getData } from "../utils/customHooks/persist";
import { arrayToObj } from "../utils/helperFunctions";

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
  topPosts: {
    media: [],
    scream: [],
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

export const getTopPostsThunk = createAsyncThunk(
  "topPosts/getData",
  async (args, { rejectWithValue }) => {
    try {
      const data = (await axios.get("/admin/gettopposts")).data;

      return data;
    } catch (error) {
      if (!navigator.onLine)
        return rejectWithValue(
          "Cannot get posts, please connect to the internet!!"
        );

      return rejectWithValue("Cannot get posts, please try again later");
    }
  }
);

export const getPostsFromIndexDB = createAsyncThunk(
  "user/getIndexedData",
  async (args, { rejectWithValue }) => {
    try {
      const posts = [];
      const postsArr = await dataEntries({
        storeName: "postData",
        dbName: "Emahd-post",
      });

      const mediaFiles = arrayToObj(
        await dataEntries({
          storeName: "image-store",
          dbName: "Emahd-image",
        })
      );

      for (let index = 0; index < postsArr.length; index++) {
        let mediaUrl;
        const postId = postsArr[index][0];
        const post = postsArr[index][1];
        if (post.multiple) {
          mediaUrl = mediaFiles[postId].map((mediaFile) =>
            URL.createObjectURL(mediaFile)
          );
        } else mediaUrl = URL.createObjectURL(mediaFiles[postId]);
        const transPost = { ...post, mediaUrl };

        posts.push(transPost);
      }

      return posts;
    } catch (error) {
      console.error(error);
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
      state.uploadProfilePic.isLoading = false;

      /*  const payload = action.payload,
        length = state.posts.length,
        userPostLength = state.posts[length - 1].length;

      if (length === 0) return;
      if (userPostLength === 0) return;
      if (state.posts[length - 1][0].handle === payload.user) {
        state.posts[length - 1].map((post) => {
          post.imageUrl = payload.url;

          return post;
        });
      } */
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
    [getPostsFromIndexDB.fulfilled]: (state, action) => {
      const posts = action.payload,
        media = [],
        scream = [];
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        if (post.section === "scream") scream.push(post);
        else media.push(post);
      }
      state.posts.media = media;
      state.posts.scream = scream;
    },
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
    [getTopPostsThunk.fulfilled]: (state, action) => {
      state.topPosts.media = action.payload.posts.media;
      state.topPosts.scream = action.payload.posts.screams;
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
