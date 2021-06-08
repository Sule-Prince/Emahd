import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { projectFirestore } from "../firebase/FBConfig";
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
    data: {},
    error: "",
  },
  messages: {
    isLoading: false,
    data: {},
    error: "",
  },
};

export const createRoomThunk = createAsyncThunk(
  "user/createroom",
  async (
    { roomId, type, handle: otherUserHandle },
    { getState, rejectWithValue }
  ) => {
    try {
      const userHandle = getState().user.data.handle;
      const userId = getState().user.data.userId;
      const otherUserId = roomId.split("-").filter((id) => id !== userId)[0];
      console.log({ roomId, type, otherUserHandle, userId, otherUserId });

      let exists = (
        await projectFirestore.collection("messages").doc(roomId).get()
      ).exists;

      if (exists) return;
      const data = {
        type,
        roomId,
        lastMessage: "",
        noOfUnreadMsgs: 0,
        createdAt: Date.now(),
      };
      await projectFirestore
        .collection("chats")
        .doc(userId)
        .update({
          roomId: {
            ...data,
            userId,
            handle: userHandle,
          },
        });

      await projectFirestore
        .collection("chats")
        .doc(otherUserId)
        .update({
          roomId: { ...data, handle: otherUserHandle, userId: otherUserId },
        });

      await projectFirestore
        .collection("messages")
        .doc(roomId)
        .set({
          [userId]: userHandle,
          [otherUserId]: otherUserHandle,
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        "Something seems to have gone wrong, please try again"
      );
    }
  }
);

export const getUserMsgsThunk = createAsyncThunk(
  "user/getMsgs",
  async (roomId, { getState, rejectWithValue }) => {
    try {
      const data = await projectFirestore
        .collection("messages")
        .doc(roomId)
        .get();

      return data;
    } catch (error) {
      return rejectWithValue(
        "Something seems to have gone wrong, please try again"
      );
    }
  }
);

export const setUserMsgsThunk = createAsyncThunk(
  "user/setMsgs",
  async ({ roomId, data }, { getState, rejectWithValue }) => {
    try {
      await projectFirestore
        .collection("messages")
        .doc(roomId)
        .update({
          [data.createdAt]: data,
        });

      return data;
    } catch (error) {
      return rejectWithValue(
        "Something seems to have gone wrong, please try again"
      );
    }
  }
);

const userChatsSlice = createSlice({
  name: "user/chats",
  initialState,
  reducers: {
    updateChatMessages: (state, action) => {
      const { roomId, data } = action.payload;
      if (!state.messages.data[roomId])
        state.messages.data[roomId] = { read: [], unread: [] };
      state.messages.data[roomId].unread = [
        ...state.messages.data[roomId].unread,
        data,
      ];
    },
    markRead: (state, action) => {
      const roomId = action.payload;
      const userMsg = state.messages.data[roomId];
      userMsg.read = [...userMsg.read, ...userMsg.unread];
      userMsg.unread = [];
    },
    updateLastMessage: (state, action) => {
      const { roomId, lastMsg, createdAt } = action.payload;
      if (!state.chats.data[roomId]) state.chats.data[roomId] = {};
      state.chats.data[roomId] = {
        ...state.chats.data[roomId],
        lastMsg,
        createdAt,
      };
    },
  },
  extraReducers: {
    [getUserMsgsThunk.pending]: (state) => {
      state.chats.isLoading = true;
      state.chats.error = "";
    },
    [getUserMsgsThunk.fulfilled]: (state, action) => {
      state.chats.isLoading = false;
      state.chats.error = "";

      state.chats.data = action.payload;
    },
    [getUserMsgsThunk.rejected]: (state, action) => {
      state.chats.isLoading = false;
      state.chats.error = action.payload;
      state.chats.data = {};
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
