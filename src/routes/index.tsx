import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import AuthPage from "../pages/AuthPage";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [{ path: "/", element: <Home /> }],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [{ path: "/auth", element: <AuthPage /> }],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
