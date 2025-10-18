// components/AdminDashboard/Charts/StrokeChart.jsx
import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan '03", Desktops: 260, Laptops: 420, Tablets: 300 },
  { name: "Feb '03", Desktops: 320, Laptops: 380, Tablets: 280 },
  { name: "Mar '03", Desktops: 380, Laptops: 350, Tablets: 320 },
  { name: "Apr '03", Desktops: 420, Laptops: 280, Tablets: 360 },
  { name: "May '03", Desktops: 360, Laptops: 320, Tablets: 280 },
  { name: "Jun '03", Desktops: 450, Laptops: 380, Tablets: 320 },
  { name: "Jul '03", Desktops: 480, Laptops: 420, Tablets: 360 },
  { name: "Aug '03", Desktops: 520, Laptops: 460, Tablets: 380 },
  { name: "Sep '03", Desktops: 480, Laptops: 400, Tablets: 340 },
  { name: "Oct '03", Desktops: 560, Laptops: 480, Tablets: 380 },
  { name: "Nov '03", Desktops: 520, Laptops: 440, Tablets: 360 },
  { name: "Dec '03", Desktops: 580, Laptops: 500, Tablets: 400 },
];

export default function StrokeChart() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Tỉ lệ duyệt bài</h3>
        <select className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 focus:border-blue-500 focus:outline-none">
          <option>Show By Month</option>
          <option>Show By Week</option>
          <option>Show By Year</option>
        </select>
      </div>

      <div className="mt-6">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#999" />
            <YAxis tick={{ fontSize: 12 }} stroke="#999" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Laptops"
              stroke="#f97316"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
