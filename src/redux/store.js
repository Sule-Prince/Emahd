import { configureStore } from "@reduxjs/toolkit";

import signupReducer from "./authSlice";
import userDataReducer from "./userDataSlice";
import screamDataReducer from "./postsSlice";
import userActionsReducer from "./userActionsSlice";
import otherUsersDataReducer from "./otherUserSlice";
import extraDataReducer from "./extraDataSlice";
import userChatsReducer from "./userChatsSlice";
import searchReducer from "./searchResultSlice";
import userPostReducer from "./userPostSlice";

const store = configureStore({
  reducer: {
    signup: signupReducer,
    user: userDataReducer,
    posts: screamDataReducer,
    userActions: userActionsReducer,
    otherUser: otherUsersDataReducer,
    extra: extraDataReducer,
    chats: userChatsReducer,
    search: searchReducer,
    uploadPost: userPostReducer,
  },
});

export default store;
