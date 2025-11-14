import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAsync,
  registerAsync,
} from "@/stores/features/rtkAsyncThunk/authThunk";
import { RootState, AppDispatch } from "@/stores/store";
import { useNavigate } from "react-router-dom";
import { toggleAuthMode } from "@/stores/features/authModeSlice";

export default function Auth() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // const { loading, error } = useSelector((state: any) => state.auth);
  const { loading, error, success, accessToken } = useSelector(
    (s: RootState) => s.authThunk
  );

  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const rtkMode = useSelector((s: RootState) => s.authMode.mode);

  // ✅ 登入成功後導向首頁
  useEffect(() => {
    if (accessToken) {
      console.log("✅ 登入成功，導向首頁");
      navigate("/"); // 依照你的 router_path 修改
    }
  }, [accessToken, navigate]);

  // 註冊成功 → 切回登入 tab
  useEffect(() => {
    if (success === "註冊成功，請登入") {
      setMode("login");
    }
  }, [success]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      dispatch(loginAsync({ username, password }));
    } else {
      dispatch(registerAsync({ username, password }));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 w-[320px]"
      >
        <div className="flex gap-2 justify-around border-b">
          <button
            type="button"
            onClick={() => dispatch(toggleAuthMode())}
            className="absolute top-4 right-4 text-xs px-4 py-2 rounded-lg bg-white border border-black"
          >
            切換登入模式（目前：{rtkMode}）
          </button>

          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 py-2 text-center font-semibold ${
              mode === "login"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-400"
            }`}
          >
            登入
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`flex-1 py-2 text-center font-semibold ${
              mode === "register"
                ? "border-b-2 border-green-500 text-green-600"
                : "text-gray-400"
            }`}
          >
            註冊
          </button>
        </div>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="帳號"
          className="border p-2 rounded"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="密碼"
          type="password"
          className="border p-2 rounded"
        />
        <button
          disabled={loading}
          className={`text-white py-2 rounded ${
            mode === "login" ? "bg-blue-500" : "bg-green-500"
          }`}
        >
          {loading ? "處理中..." : mode === "login" ? "登入" : "註冊"}
        </button>
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        {success && (
          <p className="text-green-600 text-center text-sm">{success}</p>
        )}
      </form>
    </div>
  );
}
