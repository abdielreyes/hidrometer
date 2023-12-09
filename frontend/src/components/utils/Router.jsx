import { createBrowserRouter } from "react-router-dom";
import MainPage from "../main/MainPage.jsx";
import LoginPage from "../auth/LoginPage.jsx";
import RegisterPage from "../auth/RegisterPage";
import ErrorPage from "../utils/ErrorPage.jsx";
import Dashboard from "../dashboard/Dashboard.jsx";
import HistoryPage from "../history/History.jsx";

import UsersPage from "../user/UsersPage.jsx";
import PrivacyPolicy from "../info/PrivacyPolicy.jsx";
import TermsAndConditions from "../info/TermsAndConditions.jsx";

import ProtectedRoutes from "./ProtectedRoutes.jsx";
import Logout from "../auth/Logout.jsx";
import Dispatch from "./Dispatch.jsx";
import HomePage from "../home/HomePage.jsx";
import Profile from "../user/Profile.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Dispatch></Dispatch>,
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
        element: (
          <MainPage>
            <Dashboard></Dashboard>
          </MainPage>
        ),
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
    path: "/home",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "",
        element: (
          <MainPage>
            <HomePage />
          </MainPage>
        ),
      },
      {
        path: "profile",
        element: (
          <MainPage>
            <Profile />
          </MainPage>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
