import { Navigate, Route, Routes } from 'react-router-dom';
import PublicSite from './PublicSite';
import JoinPage from './pages/JoinPage';
import AdminRoutes from './admin/AdminRoutes';
import AdminDashboard from './admin/AdminDashboard';
import ScheduleEditor from './admin/pages/ScheduleEditor';
import PricingEditor from './admin/pages/PricingEditor';
import ServicesEditor from './admin/pages/ServicesEditor';
import ImagesEditor from './admin/pages/ImagesEditor';
import InfoEditor from './admin/pages/InfoEditor';
import UsersEditor from './admin/pages/UsersEditor';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/join" element={<JoinPage />} />
      <Route path="/admin/login" element={<Navigate to="/join" replace />} />
      <Route path="/admin" element={<AdminRoutes />}>
        <Route index element={<AdminDashboard />} />
        <Route path="planning" element={<ScheduleEditor />} />
        <Route path="tarifs" element={<PricingEditor />} />
        <Route path="services" element={<ServicesEditor />} />
        <Route path="images" element={<ImagesEditor />} />
        <Route path="infos" element={<InfoEditor />} />
        <Route path="members" element={<UsersEditor />} />
      </Route>
      <Route path="/*" element={<PublicSite />} />
    </Routes>
  );
}
