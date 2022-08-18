import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../../util/cookie";

// const getDetailPage = "http://wetube-phenomenonlee.shop/api/"

export const __getPostThunk = createAsyncThunk(
    "GET_POST",
    async (id, payload, thunkAPI) => {
      console.log(payload)
        try {
          const data = await axios.post(`http://wetube-phenomenonlee.shop/api/posts/${id}`, payload,  {
              headers: {
                Authorization: `Bearer ${getCookie("token")}`,
              },
            });
            // console.log("detail", data.data);
            return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e.code);
    }
    }
    );

export const __updatePostThunk = createAsyncThunk(
    "UPDATE_POST",
    async (payload, id, thunkAPI) => {
        try {
        axios.patch(`http://wetube-phenomenonlee.shop/api/posts/${id}`, payload);
        return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.code);
        }
    }
);

export const __deletePostThunk = createAsyncThunk(
    "DELETE_POST",
    async (payload, id, thunkAPI) => {
        try {
          axios.delete(`http://wetube-phenomenonlee.shop/api/posts/${id}`, payload);
         
        return thunkAPI.fulfillWithValue(payload);
      } catch (e) {
        return thunkAPI.rejectWithValue(e.code);
      }
    }
  );

const initialState = {
  allPost: [
    {
      postId: 1,
      title: "운동하실분",
      content: "다이어트, 벌크업, 유산소 다양한 팁들 알려드립니다. ",
      nickname: "멍멍이",
      like: 10000,
      createdAt: "2020-01-01"
  }
  ],
    error: null,
    isLoading: false,
}

export const detail = createSlice({
    name: "posts",
    initialState,
    reducers: {
        clearPost: (state) => {
            state.posts = {
                title: "",
                newContent: "",    
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