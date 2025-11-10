import { lazy, Suspense } from "react";
import "@/assets/styles/app.css";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { router_path } from "@/routers";
import BaseLayout from "@/layouts/BaseLayout";
import ProtectedRoute from "@/routers/ProtectedRoute";
import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import LoadingIndicator from "@/components/LoadingIndicator";

const Error = lazy(() => import("@/pages/Error"));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingIndicator />}>{children}</Suspense>
);

const App: React.FC = () => {
  const routers = createBrowserRouter([
    {
      path: router_path.auth || "/auth",
      element: (
        <SuspenseWrapper>
          <Auth />
        </SuspenseWrapper>
      ),
    },
    {
      element: (
        <BaseLayout>
          <SuspenseWrapper>
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          </SuspenseWrapper>
        </BaseLayout>
      ),
      children: [
        {
          index: true,
          path: router_path.index,
          element: <Home key="Home" />,
        },
        {
          path: router_path.error,
          element: <Error key="Error" />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
};

export default App;
