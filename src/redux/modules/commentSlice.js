import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// http://wetube-phenomenonlee.shop/api/posts/:postId
export const __getComment = createAsyncThunk(
  "GET_COMMENT",
  async (payload, thunkAPI) => {
    try {
      // const  data  = await axios.get(`http://wetube-phenomenonlee.shop/comments/${payload}`);
      const  {data } = await axios.get(`http://localhost:3001/comments/${payload}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState = {
  list: {
    comment: "안녕하세요",
    content: "s",
    nickName: "sd",
    id: 0,
    postId: 0,
  },
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
      state.data = action.payload;
    },
    [__getComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { commentActions } = commentSlice.actions;
export default commentSlice.reducer;
