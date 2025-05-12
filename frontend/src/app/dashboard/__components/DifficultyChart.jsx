"use client";

import React from "react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Custom tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const { name, count } = payload[0].payload;
    return (
      <div className="bg-white shadow-md border px-3 py-2 rounded text-sm">
        <p className="font-medium text-gray-800">{name}</p>
        <p className="text-gray-600">{count} cards</p>
      </div>
    );
  }
  return null;
};

const DifficultyChart = ({ data }) => {
  const formattedData = [
    { name: "New", count: data.newCards, fill: "#C7D2FE" },
    { name: "Learning", count: data.learning, fill: "#A5B4FC" },
    { name: "Reviewed", count: data.reviewing, fill: "#E9D5FF" },
    { name: "Mastered", count: data.mastered, fill: "#C084FC" },
  ];

  return (
    <div className="bg-white rounded-xl w-full h-full px-4 py-2 shadow-md">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg font-semibold text-gray-800">
          Flashcards by Difficulty
        </h1>
      </div>

      {/* RADIAL CHART */}
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={18}
            data={formattedData}
          >
            <RadialBar background dataKey="count" />
            <Tooltip content={<CustomTooltip />} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      {/* LEGEND */}
      <div className="flex justify-center gap-6 mt-2 text-sm">
        {formattedData.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            <span className="font-bold text-gray-800">{item.count}</span>
            <span className="text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DifficultyChart;
