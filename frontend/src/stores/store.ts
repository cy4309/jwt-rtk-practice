//* Redux Store 設定主檔
//* 負責將 Redux 與 axios 連動起來。

import { configureStore } from "@reduxjs/toolkit";
import { api, setupAxiosInterceptors } from "@/services/rtkQuery/api";
import authReducer from "@/stores/features/rtkQuery/authSlice";
import themeReducer from "@/stores/features/themeSlice";

export const setupStore = () =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      auth: authReducer,
      theme: themeReducer,
    },
    middleware: (getDefault) => getDefault().concat(api.middleware),
  });

// 產生 store instance
export const store = setupStore();
// 設定 axios interceptors
setupAxiosInterceptors(store);

// ✅ 用 ReturnType 生成型別，避免跨模組推導錯誤
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
