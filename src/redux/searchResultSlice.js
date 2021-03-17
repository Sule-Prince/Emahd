import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/";
import { axios } from "../config/axiosConfig";

const initialState = {
  data: [],
  error: "",
  isLoading: false,
};

export const searchThunk = createAsyncThunk(
  "search/result",
  async (text, { rejectWithValue }) => {
    try {
      const response = (await axios.post("/search", { text })).data;

      return response;
    } catch (error) {
      return rejectWithValue("Something went wrong, try again later");
    }
  }
);

const searchSlice = createSlice({
  name: "search/result",
  initialState,
  reducers: {},
  extraReducers: {
    [searchThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [searchThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.data = action.payload;
    },
    [searchThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const searchReducer = searchSlice.reducer;
export default searchReducer;
