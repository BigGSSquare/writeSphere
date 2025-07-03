import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../features/auth/authSlice.js";
import blogReducers from "../features/blog/blogSlice.js";
export const store = configureStore({
  reducer: {
    auth: authReducers,
    blog: blogReducers,
  },
});
