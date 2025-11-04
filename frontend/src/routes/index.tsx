import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import GuestRoutes from "./GuestRoutes";
import PublicRoutes from "./PublicRoutes";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<GuestRoutes />} />
      <Route path="/dashboard/*" element={<PrivateRoutes />} />
      <Route path="/*" element={<PublicRoutes />} />
    </Routes>
  );
}

export default AppRoutes;