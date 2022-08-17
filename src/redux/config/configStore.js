import { configureStore } from "@reduxjs/toolkit";
import comments from "../modules/commentsSlice";
import comment from "../modules/commentSlice";
import posts from "../modules/detail";
import detail from "../modules/detail";


const store = configureStore({
  reducer: {
    comments,
    comment,
    posts,
    detail,
  },
});

export default store;
