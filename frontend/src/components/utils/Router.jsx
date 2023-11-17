import { createBrowserRouter } from "react-router-dom";
import MainPage from "../main/MainPage.jsx";
import LoginPage from "../auth/LoginPage.jsx";
import RegisterPage from "../auth/RegisterPage";
import ErrorPage from "../utils/ErrorPage.jsx";
import Dashboard from "../dashboard/Dashboard.jsx";
import LandingPage from "../main/LandingPage.jsx";
import HistoryPage from "../history/History.jsx";
import UsersPage from "../user/UsersPage.jsx";
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
