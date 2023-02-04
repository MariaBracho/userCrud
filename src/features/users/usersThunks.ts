import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "../../api/getUsers";
import {
  UsersState,
  IUser,
  UserFormValues,
} from "../../shared/interfaces/users";

export const getUsersListThunk = createAsyncThunk(
  "users/list",
  async (_data, { rejectWithValue }) => {
    try {
      const users = await getUsers();
      return users;
    } catch (err) {
      return rejectWithValue((err as any).response.data);
    }
  }
);

export const createUserThunk = createAsyncThunk(
  "users/create",
  async (newUser: UserFormValues, { rejectWithValue, getState }) => {
    try {
      const { data } = (getState() as any).users as UsersState;
      return [
        ...data,
        {
          id: data.length + 1,
          ...newUser,
        },
      ];
    } catch (err) {
      console.error(err);
      return rejectWithValue((err as any).response.data);
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  "users/update",
  async (
    { id, ...newUserData }: Partial<IUser> & { id: number },
    { rejectWithValue, getState }
  ) => {
    try {
      const { data } = (getState() as any).users as UsersState;
      return data.map((user) => {
        if (user.id === id)
          return {
            ...user,
            ...newUserData,
          };

        return user;
      });
    } catch (err) {
      console.error(err);
      return rejectWithValue((err as any).response.data);
    }
  }
);

export const deleteUsersListThunk = createAsyncThunk(
  "users/delete",
  async (ids: number[], { rejectWithValue, getState }) => {
    try {
      const { data } = (getState() as any).users as UsersState;
      return data.filter((user) => !ids.includes(user.id));
    } catch (err) {
      return rejectWithValue((err as any).response.data);
    }
  }
);
