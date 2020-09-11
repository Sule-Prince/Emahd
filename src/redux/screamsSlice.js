import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../config/axiosConfig";

const initialState = {
	isLoading: false,
	posts: [],
    error: "",
    retries: 0,
};

export const screamsDataThunk = createAsyncThunk(
	"post/getData",
	async (args, { getState, dispatch, rejectWithValue }) => {
		const posts = getState().posts;
		if (!posts.isLoading) return;
		try {
			const response = await axios.get("/screams");
			const posts = response.data;
			posts.forEach( (postArray, firstIndex) => {
				
				postArray.forEach( (post, secondIndex) => {
					const index = [firstIndex, secondIndex]
					
					post.index = index;
					console.log(post)
				})
			})
			return posts;
		} catch (error) {
            if(posts.retries !== 5) {
                console.log(posts.retries)
                setTimeout(() => {
                dispatch(screamsDataThunk("/screams"))
                    
                }, 10000);
            } 
			return rejectWithValue("Cannot get screams, please try again later");
		}
	}
);

const screamsData = createSlice({
	name: "postsData",
	initialState,
	reducers: {},
	extraReducers: {
		[screamsDataThunk.pending]: state => {
			state.isLoading = true;
		},
		[screamsDataThunk.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.posts = action.payload;
			state.error = "";
		},
		[screamsDataThunk.rejected]: (state, action) => {
            state.isLoading = false;
            state.retries += 1
			if(state.retries === 5) {
                state.error = action.payload;
                console.log("Error payload has been set")
            }
			state.posts = [];
		},
	},
});

const screamDataReducer = screamsData.reducer;
export default screamDataReducer;
