import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import LandingPage from "../main/LandingPage.jsx";
const Dispatch = () => {
  if (!window.localStorage.getItem("token")) {
    return <LandingPage />;
  } else {
    const token = window.localStorage.getItem("token");
    console.log(token);
    const decodedToken = jwtDecode(token);
    const user = decodedToken.user;
    console.log(user);

    if (user.role === "Admin") {
      return <Navigate to="/admin" />;
    }
    if (user.role === "User") {
      return <Navigate to="/home" />;
    }
  }
};
export default Dispatch;
