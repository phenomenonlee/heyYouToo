import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: [],
};

export const __getList = createAsyncThunk(
  "post/getList",
  async (id, thunkAPI) => {
    try {
      const data = await axios.get(
        `http://localhost:3001/posts`
        // `http://localhost:3001/comment?postId=${id}`
      );
      // const data = { RESP };
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {},
  extraReducers: {
    [__getList.fulfilled]: (state, action) => {
      state.list = action.payload;
    },
    [__getList.rejected]: (state, action) => {
      state.err = action.payload;
    },
  },
});

export const {} = listSlice.actions;
export default listSlice.reducer;
