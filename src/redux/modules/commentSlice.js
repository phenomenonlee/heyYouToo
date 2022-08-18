// http://wetube-phenomenonlee.shop/api/

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../../util/cookie";

export const __getComment = createAsyncThunk(
  "GET_COMMENT",
  async (id, thunkAPI) => {
    try {
      // console.log(id);
      // console.log(payload);
      const data = await axios.get(`http://wetube-phenomenonlee.shop/api/comments/${id}`, {
        headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
      });
      // console.log("ddd", data)
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState = {
  comment: [
    {
    commentId: 0,
    postId: 0,
    comment: "안녕하세요",
    nickname: "멍멍이",
    createdAt: "2020-01-01",
  }
  ],
  isLoading: false,
  error: null,
  isGlobalEditmode: false,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [__getComment.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      // console.log(action.payload)
    },
    
    [__getComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { commentActions } = commentSlice.actions;
export default commentSlice.reducer;
