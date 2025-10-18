import React, { useState, useEffect } from "react";
import { Users, FileText, Upload, Activity } from "lucide-react";
import AdminSidebar from "../components/AdminDashboard/Sidebar";
import DashboardTopBar from "../components/AdminDashboard/TopBar";
import StatsCard from "../components/AdminDashboard/StatsCard";
import StrokeChart from "../components/AdminDashboard/Charts/StrokeChart";
import TopDocuments from "../components/AdminDashboard/Charts/TopDocument";
import DetailsTable from "../components/AdminDashboard/Tables/DetailsInformation";

const AdminPage = () => {
  const [activeMenu] = useState("Dashboard");

  // State cho các metrics - Sẽ fetch từ API
  const [metrics, setMetrics] = useState({
    pendingDocs: 0,
    todayUploads: 0,
    newUsers: 0,
    totalVisits: 0,
  });

  // TODO: Fetch metrics từ API
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // const response = await api.get('/admin/summary');
        // setMetrics(response.data);

        // Dữ liệu mẫu cho demo
        setMetrics({
          pendingDocs: 12,
          todayUploads: 45,
          newUsers: 28,
          totalVisits: 1234,
        });
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchMetrics();
    // Refresh mỗi 30 giây
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

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
          {/* Breadcrumb & Header */}
          <div className="mb-8">
            <nav className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <span>Home</span>
              <span>/</span>
              <span className="font-medium text-gray-900">Dashboard</span>
            </nav>
            <h1 className="text-3xl font-bold text-gray-900">
              Analytics Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Tổng quan về tài nguyên học tập và hoạt động người dùng
            </p>
          </div>

          {/* Stats Cards Grid - 4 columns */}
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Tài liệu chờ duyệt"
              value={metrics.pendingDocs.toString()}
              subtitle="Cần xử lý ngay"
              color="bg-gradient-to-br from-orange-400 to-orange-500"
              icon={<FileText className="h-6 w-6" />}
            />
            <StatsCard
              title="Upload hôm nay"
              value={metrics.todayUploads.toString()}
              subtitle="Tài liệu mới"
              color="bg-gradient-to-br from-cyan-400 to-cyan-500"
              icon={<Upload className="h-6 w-6" />}
            />
            <StatsCard
              title="Người dùng mới"
              value={metrics.newUsers.toString()}
              subtitle="Đăng ký hôm nay"
              color="bg-gradient-to-br from-purple-400 to-purple-500"
              icon={<Users className="h-6 w-6" />}
            />
            <StatsCard
              title="Lượt truy cập"
              value={metrics.totalVisits.toLocaleString()}
              subtitle="Tuần này"
              color="bg-gradient-to-br from-pink-400 to-pink-500"
              icon={<Activity className="h-6 w-6" />}
            />
          </div>

          {/* Main Content Grid - 2/3 + 1/3 layout */}
          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Column - Chart + Details Table (2/3 width) */}
            <div className="space-y-7 lg:col-span-2">
              <StrokeChart />
              <DetailsTable />
            </div>

            {/* Right Column - Top Documents (1/3 width) */}
            <div className="lg:col-span-1">
              <TopDocuments />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
