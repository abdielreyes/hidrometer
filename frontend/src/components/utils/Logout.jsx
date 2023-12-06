import { Navigate } from "react-router-dom";
import { useEffect } from "react";
function Logout() {
  useEffect(() => {
    window.localStorage.removeItem("token");
  }, []);

  window.localStorage.removeItem("token");
  return <Navigate to="/login" />;
}

export default Logout;
