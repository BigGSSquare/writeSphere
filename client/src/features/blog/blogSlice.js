import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../api/axios";
import toast from "react-hot-toast";
export const addBlog = createAsyncThunk(
  "addBlog",
  async (formData, thunkAPI) => {
    try {
      const res = await instance.post("/blog/createBlog", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      console.log(res);
      console.log(res.data.blog);
      return res.data.blog;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

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
export const updateBlogById = createAsyncThunk(
  "updateBlogById",
  async (_, { rejectWithValue }) => {
    try {
      const res = await instance.put("/blog/updateBlogById");
    } catch (err) {}
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
  blogDetails: null,
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
      })
      .addCase(addBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.blogs.unshift(action.payload);
      });
  },
});

export default blogSlice.reducer;
