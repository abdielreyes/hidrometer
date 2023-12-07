import { Navigate, Outlet } from "react-router-dom";
function ProtectedRoutes() {
  const token = window.localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
}

export default ProtectedRoutes;
