import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
};

function DashboardLayout({ children }: Props) {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Header />

        <section className="dashboard-content">
          {/* Soporta React Router (Outlet) */}
          <Outlet />

          {/* Soporta uso antiguo con children */}
          {children}
        </section>
      </main>
    </div>
  );
}

export default DashboardLayout;