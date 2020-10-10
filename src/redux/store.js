import { configureStore } from '@reduxjs/toolkit';
import signupReducer from './authSlice';
import userDataReducer from './userDataSlice';
import screamDataReducer from './screamsSlice';
import userActionsReducer from './userActionsSlice';
import otherUsersDataReducer from './otherUserSlice';
import extraDataReducer from "./extraDataSlice"

const store = configureStore({
  reducer: {
    signup: signupReducer,
    user: userDataReducer,
    posts: screamDataReducer,
    userActions: userActionsReducer,
    otherUser: otherUsersDataReducer,
    extra: extraDataReducer
  },

})

export default store