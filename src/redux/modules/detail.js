import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getDetailPage = "http://wetube-phenomenonlee.shop/api/posts/"

export const __getPostThunk = createAsyncThunk(
    "GET_POST",
    async (arg, thunkAPI) => {
        try {
        console.log(arg,typeof(arg))
        // const data = await axios.get(getDetailPage, arg);
        const data = await axios.get(getDetailPage+`${arg}`);
        return thunkAPI.fulfillWithValue(data.data.allPost);
    } catch (e) {
        return thunkAPI.rejectWithValue(e.code);
    }
    }
    );

export const __updatePostThunk = createAsyncThunk(
    "UPDATE_POST",
    async (payload, thunkAPI) => {
        try {
        // axios.post("http://wetube-phenomenonlee.shop/api/posts/:postId", payload);
        axios.patch(`http://localhost:3001/post/${payload.postId}`, payload)
        return thunkAPI.fulfillWithValue(payload);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.code);
        }
    }
);

export const __deletePostThunk = createAsyncThunk(
    "DELETE_POST",
    async (payload, thunkAPI) => {
        try {
        //   axios.delete("http://wetube-phenomenonlee.shop/api/posts/:postId", arg);
          axios.delete("http://localhost:3001/allpost", payload);
          console.log(payload)
        return thunkAPI.fulfillWithValue(payload);
      } catch (e) {
        return thunkAPI.rejectWithValue(e.code);
      }
    }
  );

const initialState = {
    allPost: {
            id: 1,
            postId: 1,
            title: "운동하실분",
            nickName: "멍멍이",
            like: 10000,
            content: "다이어트, 벌크업, 유산소 다양한 팁들 알려드립니다. ",
            createdAt: "2020-01-01"
            },
    error: null,
    isLoading: false,
}

export const detail = createSlice({
    name: "posts",
    initialState,
    reducers: {
        clearPost: (state) => {
            state.post = {
                id: 0,
                postId: 0,
                title: "",
                nickName: "",
                like: 0,
                content: "",
                createdAt: "",
            };
        },
    },
    extraReducers: {
      // 게시글 삭제
    [__deletePostThunk.pending]: (state) => {
        state.isLoading = true;
      },
      [__deletePostThunk.fulfilled]: (state, action) => {
        state.isLoading = false;
        const target = state.posts.data.findIndex(
          (post) => post.id === action.payload
        );
        state.posts.data.splice(target, 1);
      },
      [__deletePostThunk.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
  
      // 게시글 수정
      [__updatePostThunk.pending]: (state) => {
        state.isLoading = true;
      },
      [__updatePostThunk.fulfilled]: (state, action) => {
        const target = state.posts.data.findIndex(
          (post) => post.id === action.payload.id
        );
        state.isLoading = false;
        state.posts.splice(target, 1, action.payload);
      },
      [__updatePostThunk.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
      
    },
  });
export const { clearPost } = detail.actions;
export default detail.reducer;