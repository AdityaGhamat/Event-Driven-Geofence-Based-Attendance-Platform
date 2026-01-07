import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import Loading from "../components/Loading";
import ProtectedRoutes from "../components/ProtectedRoutes";
import AuthProtectedRoutes from "../components/AuthProtectedRoutes";
import OfficeLayout from "../modules/office/layouts/OfficeLayout";
import OfficeSettings from "../modules/office/pages/OfficeSettings";
import OfficeProtection from "../modules/office/components/OfficeProtection";

const Privacy = lazy(() => import("../components/Legal/Privacy"));
const Terms = lazy(() => import("../components/Legal/Terms"));
const Contact = lazy(() => import("../components/Legal/Contact"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const AttendanceProfile = lazy(
  () => import("../modules/attendance/pages/AttendanceProfile")
);
const ChangePassword = lazy(
  () => import("../modules/auth/pages/ChangePassword")
);
const CreateOffice = lazy(() => import("../modules/office/pages/CreateOffice"));
const Login = lazy(() => import("../modules/auth/components/Login"));
const Register = lazy(() => import("../modules/auth/components/Register"));

const Office = lazy(() => import("../modules/office/pages/Office"));
const Profile = lazy(() => import("../modules/office/pages/Profile"));
const Attendance = lazy(() => import("../modules/attendance/pages/Attendance"));

export const routes = createBrowserRouter([
  {
    path: "login",
    element: (
      <Suspense fallback={<Loading />}>
        <AuthProtectedRoutes>
          <Login />
        </AuthProtectedRoutes>
      </Suspense>
    ),
  },
  {
    path: "register",
    element: (
      <Suspense fallback={<Loading />}>
        <AuthProtectedRoutes>
          <Register />
        </AuthProtectedRoutes>
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <LandingPage />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: <OfficeLayout />,
    children: [
      {
        path: "office",
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoutes>
              <Office />
            </ProtectedRoutes>
          </Suspense>
        ),
      },
      {
        path: "office/create",
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoutes>
              <OfficeProtection>
                <CreateOffice />
              </OfficeProtection>
            </ProtectedRoutes>
          </Suspense>
        ),
      },
      {
        path: "office/settings",
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoutes>
              <OfficeSettings />
            </ProtectedRoutes>
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          </Suspense>
        ),
      },
      {
        path: "attendance",
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoutes>
              <Attendance />
            </ProtectedRoutes>
          </Suspense>
        ),
      },
      {
        path: "attendance/profile",
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoutes>
              <AttendanceProfile />
            </ProtectedRoutes>
          </Suspense>
        ),
      },
      {
        path: "profile/change-password",
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoutes>
              <ChangePassword />
            </ProtectedRoutes>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/Privacy",
    element: <Privacy />,
  },
  {
    path: "/Terms",
    element: <Terms />,
  },
  {
    path: "/Contact",
    element: <Contact />,
  },
]);
