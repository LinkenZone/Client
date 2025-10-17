// components/AdminDashboard/CRMReportCard.jsx
import React from "react";
import { BarChart3 } from "lucide-react";

export default function CRMReportCard() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 p-6 text-white shadow-xl">
      <div className="mb-4 flex items-center gap-2">
        <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
          <BarChart3 className="h-5 w-5" />
        </div>
      </div>

      <h3 className="mb-2 text-2xl font-bold">Create CRM Reports</h3>
      <p className="mb-6 text-sm leading-relaxed text-purple-100">
        Outlines keep you honest. And keep structure
      </p>

      <button className="w-full rounded-lg bg-white/20 py-2.5 font-medium backdrop-blur-sm transition-all hover:bg-white/30">
        Read More 3
      </button>

      {/* Decorative elements */}
      <div className="relative mt-6 h-32">
        <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute right-8 bottom-4 h-16 w-16 rounded-full bg-purple-300/20"></div>
        <div className="absolute right-4 bottom-8">
          <BarChart3 className="h-12 w-12 text-white/20" />
        </div>
      </div>
    </div>
  );
}
