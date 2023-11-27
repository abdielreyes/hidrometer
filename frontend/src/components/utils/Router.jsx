import { createBrowserRouter } from "react-router-dom";
import MainPage from "../main/MainPage.jsx";
import LoginPage from "../auth/LoginPage.jsx";
import RegisterPage from "../auth/RegisterPage";
import ErrorPage from "../utils/ErrorPage.jsx";
import Dashboard from "../dashboard/Dashboard.jsx";
import LandingPage from "../main/LandingPage.jsx";
import HistoryPage from "../history/History.jsx";

import UsersPage from "../user/UsersPage.jsx";
import PrivacyPolicy from "../info/PrivacyPolicy.jsx";
import TermsAndConditions from "../info/TermsAndConditions.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/terms",
    element: <TermsAndConditions />,
  },
  {
    path: "/dashboard",
    element: (
      <MainPage>
        <Dashboard></Dashboard>
      </MainPage>
    ),
  },
  {
    path: "/history",
    element: (
      <MainPage>
        <HistoryPage></HistoryPage>
      </MainPage>
    ),
  },
  {
    path: "/users",
    element: (
      <MainPage>
        <UsersPage></UsersPage>
      </MainPage>
    ),
  },
]);
export default router;
