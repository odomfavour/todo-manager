import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem("todo-token");

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
