import { createSlice } from "@reduxjs/toolkit";
import { loginAsync, registerAsync, logoutAsync } from "./authThunk";

export interface AuthState {
  user: { username: string } | null;
  accessToken: string | null;
  loading: boolean;
  success: string | null;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  success: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.loading = false;
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 登入
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { username: action.payload.user.username };
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload as string;
        // 有時 action.payload 是物件，要統一轉成字串
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : JSON.stringify(action.payload);
        state.success = null;
      })
      // 註冊
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.loading = false;
        state.success = "註冊成功，請登入";
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = null;
      })
      // 登出
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.success = null;
      });
  },
});

export default authSlice.reducer;
export const { clearAuth } = authSlice.actions;
