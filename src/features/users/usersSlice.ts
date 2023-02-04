import { createSlice } from "@reduxjs/toolkit";
import {
  getUsersListThunk,
  createUserThunk,
  updateUserThunk,
  deleteUsersListThunk,
} from "./usersThunks";
import { UsersState } from "../../shared/interfaces/users";

const initialState: UsersState = {
  data: [],
  loading: "idle",
  error: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersListThunk.pending, (state) => {
        if (state.loading === "idle") {
          state.loading = "pending";
        }
      })
      .addCase(getUsersListThunk.fulfilled, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "idle";
          state.data = action.payload;
        }
      })
      .addCase(getUsersListThunk.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "idle";
          state.error = action.error;
        }
      })
      .addCase(createUserThunk.pending, (state) => {
        if (state.loading === "idle") {
          state.loading = "pending";
        }
      })
      .addCase(createUserThunk.fulfilled, (state, action) => {
        state.loading = "idle";
        state.data = action.payload;
      })
      .addCase(createUserThunk.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error;
      })
      .addCase(updateUserThunk.pending, (state) => {
        if (state.loading === "idle") {
          state.loading = "pending";
        }
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.loading = "idle";
        state.data = action.payload;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error;
      })
      .addCase(deleteUsersListThunk.pending, (state) => {
        if (state.loading === "idle") {
          state.loading = "pending";
        }
      })
      .addCase(deleteUsersListThunk.fulfilled, (state, action) => {
        state.loading = "idle";
        state.data = action.payload;
      })
      .addCase(deleteUsersListThunk.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error;
      });
  },
});

export default usersSlice.reducer;
