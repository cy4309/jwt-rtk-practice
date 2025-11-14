import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/services/rtkAsyncThunk/axiosInstance";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.post("/login", credentials);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (data: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/register", data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Register failed");
    }
  }
);

export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/logout");
      return true;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Logout failed");
    }
  }
);
