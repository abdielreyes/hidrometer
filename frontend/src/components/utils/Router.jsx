import { createBrowserRouter, Outlet } from "react-router-dom";
import LoginPage from "../auth/LoginPage.jsx";
import RegisterPage from "../auth/RegisterPage";
import ErrorPage from "../utils/ErrorPage.jsx";
import Dashboard from "../dashboard/Dashboard.jsx";
import LandingPage from "../main/LandingPage.jsx";
import HistoryPage from "../history/History.jsx";

import UsersPage from "../user/UsersPage.jsx";
import PrivacyPolicy from "../info/PrivacyPolicy.jsx";
import TermsAndConditions from "../info/TermsAndConditions.jsx";

import ProtectedRoutes from "./ProtectedRoutes.jsx";
import Logout from "./Logout.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet></Outlet>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "terms",
        element: <TermsAndConditions />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "history",
        element: <HistoryPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
