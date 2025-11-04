import type { ReactNode } from 'react';
import DashboardFooter from "../components/molecules/dashboardFooter";
import DashboardHeader from "../components/molecules/dashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen w-full min-w-[320px] flex-col bg-(--second-color)">
      <DashboardHeader />
      <div className="flex-1">
        {children}
      </div>
      <DashboardFooter />
    </div>
  );
}

export default DashboardLayout;