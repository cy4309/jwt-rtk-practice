//* 保護頁面元件
//* 控制登入狀態存取權限。

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/stores/store";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  console.log(
    "🧩 [STEP 4] ProtectedRoute 檢查 token:",
    token ? "存在 ✅" : "不存在 ❌"
  );
  return token ? children : <Navigate to="/auth" replace />;
}
