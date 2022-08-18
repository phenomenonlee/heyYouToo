import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../../util/cookie";

export const __getCommentsThunk = createAsyncThunk(
  "GET_COMMENTS",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`http://wetube-phenomenonlee.shop/api/comments/${id}`, {
        headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },});
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.code);
    }
  }
);

export const __getCommentsByPostId = createAsyncThunk(
  "GET_COMMENT_BY_POST_ID",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`http://wetube-phenomenonlee.shop/api/comments/${id}`, {
        headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },});
      
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.code);
    }
  }
);

export const __deleteComment = createAsyncThunk(
  "DELETE_COMMENT",
  async (payload, commentId, thunkAPI) => {
    try {
      console.log(commentId)
      // console.log(paylaod)
      await axios.delete(`http://wetube-phenomenonlee.shop/api/comments/${payload.id}`, payload, {
        headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },});
      // console.log(payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.code);
    }
  }
);

// /api/comments/:commentId

export const __updateComment = createAsyncThunk(
  "UPDATE_COMMENT",
  async (payload, id, thunkAPI) => {
    try {
      console.log("aaaaa", payload);
      console.log("dddd", id)
      axios.patch(`http://wetube-phenomenonlee.shop/api/comments/${id}`, payload ,{
        headers: {
        Authorization: `Bearer ${getCookie("token")}`,
        }
      });
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
// 댓글 저장하기
export const __addComment = createAsyncThunk(
  "ADD_COMMENT",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(`http://wetube-phenomenonlee.shop/api/comments/${payload.id}`, payload, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
        });
      
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState = {
    comments: {
      data: [],
      isLoading: false,
      error: null,
    },
    commentsByPostId: {
      data: [],
      isLoading: false,
      error: null,
    },
  };

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    // 전체 댓글 조회
    [__getCommentsThunk.pending]: (state) => {
      state.comments.isLoading = true;
    },
    [__getCommentsThunk.fulfilled]: (state, action) => {
      state.comments.isLoading = false;
      state.comments.data = action.payload;
    },
    [__getCommentsThunk.rejected]: (state, action) => {
      state.comments.isLoading = false;
      state.comments.error = action.payload;
    },

    // // 댓글 조회 (postId)
    [__getCommentsByPostId.pending]: (state) => {
      state.commentsByPostId.isLoading = true;
    },
    [__getCommentsByPostId.fulfilled]: (state, action) => {
      state.commentsByPostId.isLoading = false;
      state.commentsByPostId.data = action.payload;
    },
    [__getCommentsByPostId.rejected]: (state, action) => {
      state.commentsByPostId.isLoading = false;
      state.commentsByPostId.error = action.payload;
    },

    // 댓글 삭제
    [__deleteComment.pending]: (state) => {
      state.commentsByPostId.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.commentsByPostId.isLoading = false;
      const target = state.commentsByPostId.data.findIndex(
        (comment) => comment.id === action.payload
      );
      state.commentsByPostId.data.splice(target, 1);
    },
    [__deleteComment.rejected]: (state, action) => {
      state.commentsByPostId.isLoading = false;
      state.commentsByPostId.error = action.payload;
    },

    // 댓글 수정
    [__updateComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateComment.fulfilled]: (state, action) => {
      state.data.map((comment) => {
        if (comment.id === action.payload.id) {
          return {
            ...comment,
            comment: action.payload.newComment,
          };
        } else {
          return { ...comment };
        }
      })
   
    //   const target = state.commentsByPostId.data.findIndex(
    //     (comment) => comment.id === action.payload.id
    //     );
    //     console.log(action.payload)
    //   state.isLoading = false;
    //   state.commentsByPostId.data.splice(target, 1, action.payload);
    // },
    // [__updateComment.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    },
    // 댓글 추가
    [__addComment.pending]: (state) => {
      state.commentsByPostId.isLoading = true;
    },
    [__addComment.fulfilled]: (state, action) => {
      state.commentsByPostId.isLoading = false;
      state.commentsByPostId.data.push(action.payload);
    },
    [__addComment.rejected]: (state, action) => {
      state.commentsByPostId.isLoading = false;
      state.commentsByPostId.error = action.payload;
    },
  },
});

export const { ommentsActions } = commentsSlice.actions;
export default commentsSlice.reducer;
