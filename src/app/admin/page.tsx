import AdminComponente from "./AdminComponente/AdminComponente";
import DashboardComponente from "./DashboardComponente/DashboardComponente";

export default function AdminPage() {
  return (
    <div>
      <DashboardComponente />
      <AdminComponente />
    </div>
  );
}