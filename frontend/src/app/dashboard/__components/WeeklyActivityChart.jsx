"use client";

import React from "react";
import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WeeklyActivityChart = ({ data }) => {
  const formatted = data.map((item) => ({
    day: new Date(item.date).toLocaleDateString("en-US", { weekday: "short" }),
    reviewed: item.count,
  }));
  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg font-semibold">Flashcards Reviewed</h1>
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={formatted} barSize={24}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis
            dataKey="day"
            axisLine={false}
            tick={{ fill: "#9ca3af" }}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            axisLine={false}
            tick={{ fill: "#9ca3af" }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ borderRadius: "8px", borderColor: "#e5e7eb" }}
            labelStyle={{ color: "#4b5563" }}
            formatter={(value) => [`${value} cards`, "Reviewed"]}
          />
          <Bar dataKey="reviewed" fill="#93C5FD" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyActivityChart;
