import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { projectFirestore } from "../firebase/FBConfig";

const initialState = {
    isLoading: false,
    data: [],
    unsubscribe: null,
    error: "",
};

export const postsDataThunk = createAsyncThunk( 
    "post/getData",
    async (user, { getState, rejectWithValue, dispatch }) => {
        let posts
        let unsubscribe
        try {
            unsubscribe = projectFirestore
                .collection("users")
                .doc(user)
                .onSnapshot(async snapshot => {
                    let friendsList = [];
                    try {
                            friendsList = snapshot.data().friends;
                    friendsList.push(user);
                    const screams = friendsList.map(async friend => {
                        let gottenScreams = [];
                        let docs = await projectFirestore
                            .collection("screams")
                            .where("handle", "==", friend)
                            .orderBy("createdAt", "desc")
                            .get();

                        docs.forEach(snapshot => {
                            gottenScreams.push(snapshot.data());
                        });
                      posts = gottenScreams
                    //   console.log(posts)
                        return gottenScreams;
                    });
                     posts = await Promise.all(screams);
                     console.log(posts)
                    
                    } catch (error) {
                        rejectWithValue("It seems you do not have an active connection")
                    }
                
                });
                // const newPosts = await posts
                console.log(await posts)
        } catch (error) {
            console.log(error)
            return rejectWithValue("Something went wrong, please try again");
        }
        // getState.post.unsubscribe = unsubscribe
    }
)



const postsData = createSlice( {
    name: "postsData",
    initialState,
    extraReducers: {
        [postsDataThunk.pending]: (state, action) => {
            state.isLoading = true;
        },
        [postsDataThunk.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = "";
        },
        [postsDataThunk.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.data = [];
        }
    }
}) 

const postDataReducer = postsData.reducer;
export default postDataReducer;