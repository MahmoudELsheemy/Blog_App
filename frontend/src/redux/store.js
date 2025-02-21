import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Slices/AuthSlice";
import { profileReducer } from "./Slices/ProfileSlice";
import { postReducer } from "./Slices/PostSlice";
import { categoryReducer } from "./Slices/CategorySlice";
import { commentReducer } from "./Slices/CommentSlice";
import { passwordReducer } from "./Slices/passwordSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    post: postReducer,
    category: categoryReducer,
    comment: commentReducer,
    password: passwordReducer,
  },
});

export default store;
