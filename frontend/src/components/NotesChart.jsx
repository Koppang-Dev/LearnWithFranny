"use client";
import Image from "next/image";
import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    quizzes: 4000,
    tests: 2400,
  },
  {
    name: "Feb",
    quizzes: 3000,
    tests: 1398,
  },
  {
    name: "Mar",
    quizzes: 2000,
    tests: 9800,
  },
  {
    name: "Apr",
    quizzes: 2780,
    tests: 3908,
  },
  {
    name: "May",
    quizzes: 1890,
    tests: 4800,
  },
  {
    name: "Jun",
    quizzes: 2390,
    tests: 3800,
  },
  {
    name: "Jul",
    quizzes: 3490,
    tests: 4300,
  },
  {
    name: "Aug",
    quizzes: 2390,
    tests: 3800,
  },
  {
    name: "Sep",
    quizzes: 3490,
    tests: 4300,
  },
  {
    name: "Oct",
    quizzes: 2390,
    tests: 3800,
  },
  {
    name: "Nov",
    quizzes: 3490,
    tests: 4300,
  },
  {
    name: "Dec",
    quizzes: 2390,
    tests: 3800,
  },
];

const NotesChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <hi className="text-lg font-semibold">Notes Completed</hi>
        <Image src="/images/more.png" alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={50}
          />
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "20px" }}
          />
          <Line
            type="monotone"
            dataKey="quizzes"
            stroke="#C3EBFA"
            strokeWidth={5}
          />
          <Line
            type="monotone"
            dataKey="tests"
            stroke="#CFCEFF"
            strokeWidth={5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NotesChart;
