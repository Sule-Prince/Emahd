import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../config/axiosConfig";
import { projectStorage } from "../firebase/FBConfig";
import IDGenerator from "../utils/IDGenerator";
import ImageEdits from "../utils/ImageEditor";
import { screamsDataThunk } from "./postsSlice";

export const userPostThunk = createAsyncThunk(
  "user/post",
  async ({ data, route }, { rejectWithValue }) => {
    if (!data && !route) return;
    try {
      const res = await axios.post(route, data);
      return res.data.feedback;
    } catch (err) {
      if (err.response) {
        return rejectWithValue(
          "Ooops!! Something went wrong, please try again"
        );
      }
      return rejectWithValue("Ooops!! you're currently offline");
    }
  }
);

export const dataStoreThunk = createAsyncThunk(
  "user/store",
  async (
    {
      section,
      media,
      data: { route, post, mediaType, postSettings, multiple = false },
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      // Logic for uploading posts that contain any form of media content
      let data, newFile;

      const editor = new ImageEdits();

      // Upload logic for media related posts

      let storageUrls = [];
      for (const url of media) {
        let fileName = IDGenerator();
        const blob = await editor.reduceImage({ src: url, format: "blob" });

        newFile = toFile(blob, "image/jpeg");
        const storageUrl = await uploadData({
          file: newFile,
          fileName,
        });

        storageUrls.push(storageUrl);
      }

      data = {
        post,
        url: multiple ? storageUrls : storageUrls[0],
        thumb: [],
        mediaType,
        section,
        multiple,
        postSettings,
      };

      console.log(data);
      const res = await dispatch(userPostThunk({ data, route }));

      dispatch(screamsDataThunk());

      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const userPost = createSlice({
  name: "userPost",
  initialState: {
    userPosts: {
      progress: 0,
      posting: false,
      error: "",
    },
  },

  reducers: {},
  extraReducers: {
    [userPostThunk.pending]: (state) => {
      state.userPosts.posting = true;
    },
    [userPostThunk.fulfilled]: (state, action) => {
      if (action.payload === true) state.userPosts.posting = false;
    },
    [userPostThunk.rejected]: (state, action) => {
      state.userPosts.posting = false;

      state.userPosts.error = action.payload;
    },
    [dataStoreThunk.pending]: (state) => {
      state.userPosts.posting = true;
      console.log("posting");
    },
    [dataStoreThunk.fulfilled]: (state) => {
      state.userPosts.posting = false;
      console.log("posted");
    },
    [dataStoreThunk.rejected]: (state, action) => {
      state.userPosts.posting = false;

      state.userPosts.error = action.payload;
    },
  },
});

const userPostReducer = userPost.reducer;
export default userPostReducer;

// Function converts blob data to a file
function toFile(blob, type) {
  return new File([blob], `${IDGenerator()}.${type.split("/")[1]}`, {
    type,
    lastModified: Date.now(),
  });
}

// Function uploads data to firebase storage bucket
function uploadData({
  file,
  fileName,
  setProgress = () => {},
  setError = () => {},
  progress = false,
}) {
  return new Promise((resolve, reject) => {
    const splittedName = file.name.split("."),
      fileExtension = splittedName[splittedName.length - 1],
      fileRef = `${fileName}.${fileExtension}`,
      storageRef = projectStorage.ref(fileRef);

    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        if (progress) {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress((prev) => {
            if (percentage < 10) return 10;
            return percentage;
          });
        }
      },
      (err) => {
        setError(err);
        reject(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        resolve(url);
      }
    );
  });
}
