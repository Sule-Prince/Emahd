import { configureStore } from '@reduxjs/toolkit';
import signupReducer from './authSlice';
import userDataReducer from './userDataSlice';
import screamDataReducer from './screamsSlice';
import userActionsReducer from './userActionsSlice';
import otherUsersDataReducer from './otherUserSlice';

const store = configureStore({
  reducer: {
    signup: signupReducer,
    user: userDataReducer,
    posts: screamDataReducer,
    userActions: userActionsReducer,
    otherUser: otherUsersDataReducer,
  },

})

export default store