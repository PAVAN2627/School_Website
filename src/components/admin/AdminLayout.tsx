import { Outlet, Navigate } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";

const isAuthenticated = () => localStorage.getItem("admin-auth") === "true";

export const AdminLayout = () => {
  if (!isAuthenticated()) return <Navigate to="/admin/login" replace />;

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
