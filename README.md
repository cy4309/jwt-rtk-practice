🧠 JWT + RTK Query Demo
這是一個以 React (Vite + TypeScript) 與 Express (JWT Auth) 為基礎的全端登入系統練習專案。
專案目標是實作一套完整、安全的 Access Token + Refresh Token 登入機制，
同時使用 Redux Toolkit + RTK Query 管理前端狀態與 API。

---

🚀 Features
✅ 使用 JWT (JSON Web Token) 實現登入驗證
✅ Access Token / Refresh Token 自動續期
✅ HttpOnly Cookie 安全存放 Refresh Token
✅ RTK Query 管理 API 狀態（loading / error / success）
✅ Redux Toolkit 管理登入使用者與 token 狀態
✅ Axios 攔截器整合 refresh token 邏輯
✅ 登出清除 cookie + Redux 狀態
✅ 乾淨分層結構（frontend / backend 分離）

---

⚙️ JWT Authentication Flow
[Client] → POST /login → [Server]
↓ 驗證帳密
↳ 發出 accessToken (15 min) + refreshToken (7 days)
↳ refreshToken 以 HttpOnly Cookie 儲存
[Client]
↳ Redux 儲存 accessToken
↳ Axios 自動夾帶 Authorization header
[Access Token 過期後]
↳ Axios 攔截器偵測 401 → POST /refresh
↳ Server 驗證 cookie(refreshToken) → 發出新 accessToken
↳ Redux 自動更新 accessToken

---

🔑 Token Lifetime
Token 類型 儲存位置 有效時間 用途 自動更新
Access Token Redux 記憶體 約 15 分鐘 每次發 API 驗證身份 ✅ axios 攔截器自動 refresh
Refresh Token HttpOnly Cookie 約 7 天 換取新 Access Token ❌ 需重新登入

---

🧠 RTK Query Hook Concept
RTK Query 會自動根據你定義的 endpoint 生成 hooks，例如：
const [login, { data, isLoading, isError, isSuccess }] = useLoginMutation();
名稱 說明
login 觸發 /login API 的函式
data API 回傳結果
isLoading 是否正在發送請求
isSuccess 是否成功
isError 是否錯誤
.unwrap() 取出結果、錯誤可被 try/catch 捕捉

---

🧩 Generate Secure Secret Keys
這兩個值是 JWT 用來簽發與驗證 Token 的核心密鑰。
在終端機（backend 資料夾）執行以下指令來生成隨機安全密鑰：

# 生成 Access Token Secret & Refresh Token Secret

node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

---
