import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { v4 as uuidv4 } from "uuid";

const initialState = {
  allPost: [],
  isLoading: false,
  error: null,
};

export const __getPost = createAsyncThunk(
  "post/getPosts",
  async (id, thunkAPI) => {
    try {
      const data = await axios.get(
        // `http://localhost:3001/allPost`
        "http://wetube-phenomenonlee.shop/api/posts"
        // `http://localhost:3001/comment?postId=${id}`
      );
      // const data = { RESP };
      // console.log(data.data.allPost);
      return thunkAPI.fulfillWithValue(data.data.allPost);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [__getPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allPost = action.payload;
    },
    [__getPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
  },
});

export const {} = postSlice.actions;
export default postSlice.reducer;
