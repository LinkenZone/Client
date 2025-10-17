import React, { useState } from "react";
import { Users, FileText, Crown, DollarSign } from "lucide-react";
import AdminSidebar from "../components/AdminDashboard/Sidebar";
import DashboardTopBar from "../components/AdminDashboard/TopBar";
import StatsCard from "../components/AdminDashboard/StatsCard";
import StrokeChart from "../components/AdminDashboard/Charts/StrokeChart";
import SalesProgress from "../components/AdminDashboard/Charts/SalesProgress";
import NewUsersTable from "../components/AdminDashboard/Tables/NewUsersTable";
import SalesDetailsTable from "../components/AdminDashboard/Tables/SalesDetailsTable";
import CRMReportCard from "../components/AdminDashboard/CRMReportCard";

const AdminPage = () => {
  const [activeMenu] = useState("Dashboard");

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar activeMenu={activeMenu} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <DashboardTopBar />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Home</span>
              <span>/</span>
              <span className="text-gray-900">Analytic</span>
            </div>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>

          {/* Stats Cards Grid */}
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="User Registrations"
              value="2455"
              subtitle="User Registrations"
              color="bg-gradient-to-br from-pink-400 to-pink-500"
              icon={<Users className="h-6 w-6" />}
            />
            <StatsCard
              title="Event Registrations"
              value="2455"
              subtitle="Event Registrations"
              color="bg-gradient-to-br from-cyan-400 to-cyan-500"
              icon={<FileText className="h-6 w-6" />}
            />
            <StatsCard
              title="User Registrations"
              value="2455"
              subtitle="User Registrations"
              color="bg-gradient-to-br from-purple-400 to-purple-500"
              icon={<Crown className="h-6 w-6" />}
            />
            <StatsCard
              title="User Registrations"
              value="2455"
              subtitle="User Registrations"
              color="bg-gradient-to-br from-indigo-400 to-indigo-500"
              icon={<DollarSign className="h-6 w-6" />}
            />
          </div>

          {/* Charts Section */}
          <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <StrokeChart />
            </div>
            <div className="space-y-6">
              <SalesProgress />
              <CRMReportCard />
            </div>
          </div>

          {/* Tables Section */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <NewUsersTable />
            <SalesDetailsTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
