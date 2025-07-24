import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import instance from "../../api/axios";

const initialState = {
  user: null,
  isAuthenticated: false,
};
export const updateUserById = createAsyncThunk(
  "updateUserById",
  async ({ formData }, thunkAPI) => {
    try {
      const res = await instance.post("/user/update", formData);

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state, _) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.userResponse;
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
