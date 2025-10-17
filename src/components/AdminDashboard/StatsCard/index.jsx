// components/AdminDashboard/StatsCard/index.jsx
import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatsCard({
  title,
  value,
  subtitle,
  color = "bg-gradient-to-br from-pink-400 to-pink-500",
  icon,
  trend,
}) {
  return (
    <div className={`rounded-2xl p-6 text-white shadow-lg ${color}`}>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="mb-1 text-sm font-medium opacity-90">{title}</p>
          <h3 className="text-3xl font-bold">{value}</h3>
        </div>
        {icon && (
          <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 text-sm">
        {trend && (
          <>
            {trend > 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span className="font-medium">{Math.abs(trend)}%</span>
          </>
        )}
        <span className="opacity-90">{subtitle}</span>
      </div>
    </div>
  );
}
