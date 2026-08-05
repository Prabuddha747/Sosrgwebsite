import { AdminDashboard } from './AdminDashboard';

export const AdminPage = () => (
  <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto min-h-screen space-y-12">
    <h1 className="text-5xl font-serif italic mb-12"><span className="gold-text">Admin</span> Dashboard</h1>
    <AdminDashboard />
  </div>
);
