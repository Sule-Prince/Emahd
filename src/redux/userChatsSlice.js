import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { randomMsgs, randomNames } from "../utils/generateData";
import { objectToArray } from "../utils/helperFunctions";

const generateDataObjs = (noOfObjects) => {
  const arrayOfObjs = [];
  const names = randomNames(noOfObjects);
  const msgs = randomMsgs(noOfObjects);

  for (let i = 0; i <= noOfObjects; i++) {
    let obj = {
      handle: names[i],
      imageUrl: "",
      lastMsg: msgs[i],
      socketId: i === 4 ? 1234567 : Math.round(Math.random() * 1000000),
      noOfUnreadMsgs: 1,
    };
    arrayOfObjs.push(obj);
  }

  return arrayOfObjs;
};

const initialState = {
  chats: {
    isLoading: false,
    data: generateDataObjs(10),
    error: "",
  },
  messages: {
    isLoading: false,
    data: {},
    error: "",
  },
};

export const userChatsThunk = createAsyncThunk(
  "user/chats",
  (args, { getState, rejectWithValue }) => {}
);

export const socketHandShakeThunk = createAsyncThunk(
  "user/socketHandshake",
  (args, { rejectWithValue }) => {
    // projectFir
  }
);

const userChatsSlice = createSlice({
  name: "user/chats",
  initialState,
  reducers: {
    updateChatMessages: (state, action) => {
      const { handle, data } = action.payload;
      if (!state.messages.data[handle])
        state.messages.data[handle] = { read: [], unread: [] };
      state.messages.data[handle].unread.push(data);
    },
    markRead: (state, action) => {
      const handle = action.payload;
      const userMsg = state.messages.data[handle];
      userMsg.read = [...userMsg.read, ...userMsg.unread];
      userMsg.unread = [];
    },
    performSocketHandShake: (state, action) => {},
    updateLastMessage: (state, action) => {
      const [i, lastMsg] = action.payload;
      state.chats.data[i].lastMsg = lastMsg;
    },
  },
  extraReducers: {
    [userChatsThunk.pending]: (state) => {
      state.chats.isLoading = true;
      state.chats.error = "";
    },
    [userChatsThunk.fulfilled]: (state, action) => {
      state.chats.isLoading = false;
      state.chats.error = "";

      // Data of friends chat is expected to come in an object form
      // So it is converted to an array so as to display it in the DOM
      state.chats.data = makeSingleArray(objectToArray(action.payload));
    },
    [userChatsThunk.rejected]: (state, action) => {
      state.chats.isLoading = false;
      state.chats.error = action.payload;
      state.chats.data = [];
    },
  },
});

export const {
  markRead,
  updateChatMessages,
  performSocketHandShake,
  updateLastMessage,
} = userChatsSlice.actions;
const userChatsReducer = userChatsSlice.reducer;

export default userChatsReducer;

function makeSingleArray(array) {
  const singleArray = [];
  for (let arr of array) {
    singleArray.push(arr[1]);
  }

  return singleArray;
}
