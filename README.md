# 🧠 JWT + RTK Query Demo

這是一個以 **React (Vite + TypeScript)** 與 **Express (JWT Auth)** 為基礎的全端登入系統練習專案。  
專案目標是實作一套完整、安全的 **Access Token + Refresh Token** 登入機制，  
同時使用 **Redux Toolkit + RTK Query** 管理前端狀態與 API。

---

## ⚙️ 支援兩種部署方式

✅ **Serverless API 模式（Vercel Functions）**  
　 → 用於 Vercel Deploy，免伺服器、免 CORS，自動擴展。

🧩 **Backend Server 模式（Express）**  
　 → 適合日後擴展成大型應用，可供 Render / Railway 長駐伺服器，擴充性強。

---

## 🚀 啟動本地開發（Vercel 模擬模式）

```bash
npm install -g vercel
vercel dev
```

---

## 🚀 Features

✅ 使用 JWT (JSON Web Token) 實現登入驗證
✅ Access Token / Refresh Token 自動續期
✅ HttpOnly Cookie 安全存放 Refresh Token
✅ RTK Query 管理 API 狀態（loading / error / success）
✅ Redux Toolkit 管理登入使用者與 token 狀態
✅ Axios 攔截器整合 refresh token 邏輯
✅ 登出清除 cookie + Redux 狀態
✅ 乾淨分層結構（frontend / backend 分離）

---

## ⚙️ JWT Authentication Flow

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

## 🔑 Token Lifetime

Token 類型 儲存位置 有效時間 用途 自動更新
Access Token Redux 記憶體 約 15 分鐘 每次發 API 驗證身份 ✅ axios 攔截器自動 refresh
Refresh Token HttpOnly Cookie 約 7 天 換取新 Access Token ❌ 需重新登入

---

## 🧠 RTK Query Hook Concept

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

## 🧩 Generate Secure Secret Keys

這兩個值是 JWT 用來簽發與驗證 Token 的核心密鑰。
在終端機（backend 資料夾）執行以下指令來生成隨機安全密鑰：

### 生成 Access Token Secret & Refresh Token Secret

node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

---

## ⚠️ Serverless 限制說明

在本專案的 Serverless API（Vercel Functions）架構中，請注意以下限制：

- Vercel 的 Serverless Function 屬於「無狀態」執行環境（stateless execution）。
- 每一次 API 請求都會啟動一個全新的執行實例，並在回傳後立即銷毀。
- 這代表在程式內以 `let users = []` 或 `const users = [...]` 等方式儲存資料，只能在單次請求中使用。
- 一旦請求結束，這些記憶體資料就會消失，無法在下次請求中保留（包括註冊後的使用者資訊）。
  因此：
- ✅ 本專案可以正常練習 JWT Token 驗證、Access/Refresh Token 流程。
- ⚠️ 但 **註冊帳號（/api/register）不會持久化保存**，登入僅能使用預設的 `testuser`。
- 若需實作真實的註冊 / 登入系統，請改用 **後端常駐服務（如 Render、Railway、VPS 等）** 搭配 **資料庫（MongoDB / PostgreSQL / Supabase / Neon 等）** 進行資料儲存。
