"use client";
import React, { PureComponent } from "react";
import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Total",
    count: 100,
    fill: "white",
  },
  {
    name: "Quizzes",
    count: 45,
    fill: "#FAE27C",
  },
  {
    name: "Tests",
    count: 55,
    fill: "#C3EBFA",
  },
];

const style = {
  top: "50%",
  right: 0,
  transform: "translate(0, -50%)",
  lineHeight: "24px",
};
const CountChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full px-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Quizzes</h1>
        <Image src="/images/more.png" alt="" width={30} height={30} />
      </div>

      {/* CHART */}
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/images/completed.png"
          alt=""
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap -1">
          <div className="w-5 h-5 bg-lamaSky rounded-full"></div>
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-500">Quizzes (45%)</h2>
        </div>
        <div className="flex flex-col gap -1">
          <div className="w-5 h-5 bg-lamaYellow rounded-full"></div>
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-500">Tests (55%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
