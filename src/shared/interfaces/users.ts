import { SerializedError } from "@reduxjs/toolkit";

export interface IUser {
  id: number;
  name: string;
  lastName: string;
  phoneNumber: string;
  age: number;
}

export interface UsersState {
  data: IUser[];
  loading: string;
  error: null | SerializedError;
}

export type UserFormValues = Omit<IUser, "id">;
