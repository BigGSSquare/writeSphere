import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../api/axios";
import toast from "react-hot-toast";
export const fetchBlogById = createAsyncThunk(
  "fetchBlogById",
  async (id, thunkAPI) => {
    try {
      const res = await instance.get(`/blog/${id}`);
      console.log(res.data);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const fetchAllBlogs = createAsyncThunk(
  "fetchAllBlogs",
  async (_, thunkAPI) => {
    try {
      const res = await instance.get("/blog/fetchAllBlogs");
      return res.data.blogs;
    } catch (err) {
      toast.error("error fetching blogs");
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);
const initialState = {
  blogs: [],
  blogDetails: "",
  loading: false,
};
export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {})
      .addCase(fetchBlogById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.blogDetails = action.payload;
        state.loading = false;
      });
  },
});

export default blogSlice.reducer;
