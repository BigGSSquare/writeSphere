import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../api/axios";
import toast from "react-hot-toast";
export const deleteBlogById = createAsyncThunk(
  "deleteBlogById",
  async ({ id }, thunkAPI) => {
    try {
      const res = await instance.delete(`/blog/deleteBlog/${id}`);
      return { ...res.data, id };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const updateBlogById = createAsyncThunk(
  "updateBlogById",
  async ({ formData, id }, thunkAPI) => {
    try {
      const res = await instance.put(`/blog/updateBlog/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      console.log(res.data.blog);
      return res.data.blog;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const addBlog = createAsyncThunk(
  "addBlog",
  async (formData, thunkAPI) => {
    try {
      const res = await instance.post("/blog/createBlog", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
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
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
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
export const searchBlog = createAsyncThunk(
  "searchBlog",
  async ({ searchTerm, category }, thunkAPI) => {
    try {
      const res = await instance.get(
        `/blog/search?keyword=${searchTerm}&category=${category}`
      );
      console.log(res.data.blogs);
      return res.data.blogs;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  blogs: [],
  blogSearch: [],
  searchActive: false,
  blogDetails: null,
  loading: false,
  category: "",
};
export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    clearSearch: (state, action) => {
      state.searchActive = false;
      state.blogSearch = [];
    },
    setCategory: (state, action) => {
      console.log(action.payload);
      state.category = action.payload;
    },
    clearCategory: (state, action) => {
      state.category = "";
    },
  },
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
      })
      .addCase(updateBlogById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateBlogById.fulfilled, (state, action) => {
        const updatedBlog = action.payload;
        state.loading = false;

        const index = state.blogs.findIndex(
          (blog) => blog._id === updatedBlog._id
        );

        if (index !== -1) {
          state.blogs[index] = updatedBlog;
        }
      })
      .addCase(deleteBlogById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteBlogById.fulfilled, (state, action) => {
        const { success, id } = action.payload;
        state.loading = false;
        if (success) {
          const blogs = state.blogs;
          const newArray = blogs.filter((blogq) => blogq._id !== id);
          state.blogs = newArray;
        }
      })
      .addCase(searchBlog.pending, (state, action) => {
        state.loading = true;
        state.searchActive = true;
      })
      .addCase(searchBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogSearch = action.payload;
      });
  },
});

export default blogSlice.reducer;
export const { clearSearch, setCategory, clearCategory } = blogSlice.actions;