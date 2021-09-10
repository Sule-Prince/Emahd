import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../config/axiosConfig";
import { dataEntries, getData } from "../utils/customHooks/persist";
import { arrayToObj } from "../utils/helperFunctions";

const initialState = {
  isLoading: false,
  posts: {
    media: [],
    scream: [],
  },
  userPost: {
    media: [],
    scream: [],
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
  async (args, { rejectWithValue, getState }) => {
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
            mediaFile
              ? URL.createObjectURL(mediaFile)
              : URL.createObjectURL(new Blob([]))
          );
        } else
          mediaUrl = mediaFiles[postId]
            ? URL.createObjectURL(mediaFiles[postId])
            : URL.createObjectURL(new Blob([]));
        const transPost = { ...post, mediaUrl };

        posts.push(transPost);
      }

      const { handle: user, imageUrl } = getState().user.data;
      return { posts, user, imageUrl };
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
          ...state.userPost[type][index],
          [Object.keys(data)[0]]: Object.values(data)[0],
          name: "hey",
        };

        state.userPost[type][index] = { ...newPost };

        /*  state.userPost[type] = updateObjectInArray(state.userPost[type], {
          index,
          item: newPost,
        }); */
        // state.userPost[type][index] = { ...newPost };
      } else
        state.posts[type][index][Object.keys(data)[0]] = Object.values(data)[0];
    },
  },
  extraReducers: {
    [getPostsFromIndexDB.fulfilled]: (state, action) => {
      if (state.posts.media.length > 0 || state.posts.scream.length > 0) return;
      const { posts, user, imageUrl } = action.payload,
        media = [],
        scream = [],
        userMedia = [],
        userScream = [];

      let mediaIndex = 0,
        mediaUIndex = 0,
        screamIndex = 0,
        screamUIndex = 0;

      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        if (post.section === "scream") {
          if (post.handle === user) {
            post.uIndex = screamUIndex;
            post.imageUrl = imageUrl;
            userScream.push(post);

            screamUIndex += 1;
          }

          post.index = screamIndex;
          scream.push(post);

          screamIndex += 1;
        } else {
          if (post.handle === user) {
            post.uIndex = mediaUIndex;
            post.imageUrl = imageUrl;
            userMedia.push(post);

            mediaUIndex += 1;
          }

          post.index = mediaIndex;
          media.push(post);

          mediaIndex += 1;
        }
      }
      state.posts.media = media;
      state.posts.scream = scream;
      state.userPost.media = userMedia;
      state.userPost.scream = userScream;
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
