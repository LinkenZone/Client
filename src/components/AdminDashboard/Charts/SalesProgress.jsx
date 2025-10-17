// components/AdminDashboard/Charts/SalesProgress.jsx
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Progress", value: 74 },
  { name: "Remaining", value: 26 },
];

const COLORS = ["#8b5cf6", "#e5e7eb"];

export default function SalesProgress() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Sales of the last week
        </h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-center py-8">
        <div className="relative">
          <ResponsiveContainer width={200} height={200}>
            <PieChart>
              <Pie
                data={data}
                cx={100}
                cy={100}
                innerRadius={70}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-gray-800">74%</span>
            <span className="text-sm text-gray-500">Progress</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-purple-500"></div>
            <span className="text-sm text-gray-600">Most Soles</span>
          </div>
          <span className="text-sm font-medium text-gray-800">
            Authors with the best sales
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gray-300"></div>
            <span className="text-sm text-gray-600">Total sales lead</span>
          </div>
          <span className="text-sm font-medium text-gray-800">
            The users with the latest reports
          </span>
        </div>
      </div>
    </div>
  );
}
