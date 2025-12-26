import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

/* ---------- Custom Tooltip ---------- */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 shadow-md rounded-lg p-2 border border-gray-300">
        <p className="text-xs font-semibold text-purple-800 mb-1">
          {payload[0].payload.priority}
        </p>
        <p className="text-sm text-gray-600">
          Count:{" "}
          <span className="text-sm font-medium text-gray-900">
            {payload[0].payload.count}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

/* ---------- Bar Chart ---------- */
const CustomBarChart = ({ data }) => {
  // Function to alternate colors
  const getBarColor = (entry) => {
    switch (entry?.priority) {
      case "Low":
        return "#00ffaaff";
      case "Medium":
        return "#ffa724ff";
      case "High":
        return "#ff0040ff";
      default:
        return "#00ffaaff";
    }
  };

  return (
    <div className="bg-white/5 mt-4 pt-2  rounded-lg border border-white/10 ">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />

          <XAxis
            dataKey="priority"
            tick={{ fontSize: 13, fill: "#f4f4f4ff" }}
            stroke="none"
          />

          <YAxis
            tick={{ fontSize: 13, fill: "#f4f4f4ff" }}
            stroke="none"
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />

          <Bar
            dataKey="count"
            nameKey="priority"
            fill="#ff7c3bff"
            radius={[10, 10, 0, 0]}
            activeDot={{ r: 8, fill: "yellow" }}
            activeStyle={{ fill: "green" }}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
