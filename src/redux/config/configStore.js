import { configureStore } from "@reduxjs/toolkit";

import users from "../modules/users";
import post from "../modules/postSlice";
import list from "../modules/listSlice";

const store = configureStore({
  reducer: { users: users, post: post, list: list },
});

export default store;
