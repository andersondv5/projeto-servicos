import { lazy } from "react";
import GuestRoute from "../components/routes/guestRoute";

const LoginPage = lazy(() => import("../pages/LoginPage"));

function GuestRoutes() {
  return (
    <GuestRoute>
      <LoginPage />
    </GuestRoute>
  );
}

export default GuestRoutes;
