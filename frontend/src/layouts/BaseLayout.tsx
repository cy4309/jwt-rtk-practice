import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores/store";
import { logOut } from "@/stores/features/authSlice";
import { useLogoutMutation } from "@/services/authApi";
import { useNavigate } from "react-router-dom";
import ThemeButton from "@/components/ThemeButton";
import BaseButton from "@/components/BaseButton";

const BaseLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("📤 [STEP 6] 執行登出中...");
    try {
      const res = await logoutApi().unwrap(); // 清除 cookie
      console.log("✅ [STEP 6] 後端回傳:", res);
    } catch (err) {
      console.error("❌ [STEP 6] 登出 API 失敗:", err);
      console.error("Logout failed:", err);
    } finally {
      dispatch(logOut());
      console.log("💾 [STEP 6] Redux 已清除登入資訊");
      navigate("/login");
    }
  };

  return (
    <div className="p-4 w-full min-h-[100dvh] flex flex-col bg-secondary dark:bg-primary text-primary dark:text-secondary">
      <header className="p-4 shadow flex justify-between items-center rounded-lg">
        <h1 className="text-xl font-bold">歡迎，{user?.username}</h1>
        <div className="flex justify-center items-center space-x-4">
          <ThemeButton />
          <BaseButton
            onClick={handleLogout}
            className="px-4 py-2 rounded transition font-bold bg-red-500 hover:bg-red-600"
          >
            登出
          </BaseButton>
        </div>
      </header>

      <main className="p-4 flex-1">{children}</main>

      <footer className="p-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} My App
      </footer>
    </div>
  );
};

export default BaseLayout;
