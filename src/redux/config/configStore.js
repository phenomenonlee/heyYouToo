import { configureStore } from "@reduxjs/toolkit";

import comment from "../modules/commentSlice"
import comments from "../modules/commentsSlice"
import detail from "../modules/detail";
import list from "../modules/listSlice";
import post from "../modules/postSlice";
import users from "../modules/users";

const store = configureStore({
  reducer: {
    comment,
    comments,
    detail,
    list,
    post,
    users,
  },
});

export default store;
