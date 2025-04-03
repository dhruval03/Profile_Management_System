import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserDashboard from '../pages/user/UserDashboard';
import Unauthorized from '../pages/Unauthorized'; 
import ProtectedRoute from './ProtectedRoute';
import AdminRoutes from "./AdminRoutes";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/unauthorized" element={<Unauthorized />} />

    <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Route>

    <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
      <Route path="/user-dashboard" element={<UserDashboard />} />
    </Route>

    {/* Handle unknown routes */}
    <Route path="*" element={<Unauthorized />} />
  </Routes>
);

export default AppRoutes;
