import { Navigate, Outlet } from "react-router-dom";
function ProtectedRoutes() {
  const token = window.localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
