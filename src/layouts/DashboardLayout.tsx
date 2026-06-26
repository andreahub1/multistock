import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
};

function DashboardLayout({ children }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar
        open={menuOpen}
        closeMenu={() => setMenuOpen(false)}
      />

      <main className="dashboard-main">
        <Header openMenu={() => setMenuOpen(true)} />

        <section className="dashboard-content">
          <Outlet />
          {children}
        </section>
      </main>
    </div>
  );
}

export default DashboardLayout;