"use client";

import React, { useMemo, useState } from "react";
import { format, eachDayOfInterval, startOfYear, endOfYear } from "date-fns";

const getColor = (count) => {
  if (count === 0) return "bg-gray-100";
  if (count === 1) return "bg-blue-100";
  if (count < 4) return "bg-blue-300";
  if (count < 6) return "bg-violet-400";
  return "bg-violet-600";
};

const DailyActivityChart = ({ data }) => {
  const [hovered, setHovered] = useState(null);

  // Map date strings to counts
  const dataMap = useMemo(() => {
    const map = new Map();
    data.forEach((item) => {
      const key = format(new Date(item.date), "yyyy-MM-dd");
      map.set(key, item.count);
    });
    return map;
  }, [data]);

  // All days of the year
  const allDays = useMemo(() => {
    return eachDayOfInterval({
      start: startOfYear(new Date()),
      end: endOfYear(new Date()),
    }).map((date) => ({
      date,
      count: dataMap.get(format(date, "yyyy-MM-dd")) || 0,
    }));
  }, [dataMap]);

  // Build weekly columns (vertical)
  const columns = [];
  let week = [];

  allDays.forEach((day) => {
    if (week.length === 0 && day.date.getDay() !== 0) {
      for (let i = 0; i < day.date.getDay(); i++) {
        week.push(null);
      }
    }

    week.push(day);
    if (week.length === 7) {
      columns.push(week);
      week = [];
    }
  });

  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    columns.push(week);
  }

  // Month labels at start of each new month
  const monthLabels = Array(columns.length).fill("");
  const seenMonths = new Set();

  columns.forEach((week, i) => {
    const firstDay = week.find((d) => d);
    if (firstDay) {
      const month = format(firstDay.date, "MMM");
      if (!seenMonths.has(month)) {
        seenMonths.add(month);
        monthLabels[i] = month;
      }
    }
  });

  return (
    <div className="bg-white p-4 rounded-xl w-full h-[300px] relative overflow-hidden flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Review Activity</h2>

      <div className="overflow-x-auto overflow-y-hidden flex-1">
        <div className="flex flex-col relative h-full">
          {/* Month Labels */}
          <div className="flex mb-1 ml-6">
            <div className="w-4" /> {/* Spacer */}
            {monthLabels.map((label, i) => (
              <div
                key={i}
                className={`w-4 text-[10px] text-gray-600 text-center ${
                  label ? "font-semibold mr-[6px]" : "mr-[3px]"
                }`}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex">
            {/* Days of week labels */}
            <div className="flex flex-col justify-between mr-1 text-[10px] text-gray-500">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="h-4">
                  {d}
                </div>
              ))}
            </div>

            {/* Week columns */}
            <div className="flex">
              {columns.map((week, i) => {
                const isMonthStart = monthLabels[i] !== "";
                return (
                  <div
                    key={i}
                    className={`flex flex-col gap-[2px] ${
                      isMonthStart ? "mr-[6px]" : "mr-[3px]"
                    }`}
                  >
                    {week.map((day, j) => (
                      <div
                        key={j}
                        className={`w-4 h-4 rounded-sm ${
                          day ? getColor(day.count) : "bg-transparent"
                        }`}
                        onMouseEnter={() => day && setHovered(day)}
                        onMouseLeave={() => setHovered(null)}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tooltip */}
          {hovered && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full mt-4 z-50 pointer-events-none">
              <div className="bg-white border border-gray-300 shadow-md px-3 py-2 rounded text-xs text-gray-800">
                <p className="font-semibold">
                  {format(hovered.date, "MMM d, yyyy")}
                </p>
                <p>
                  {hovered.count} review{hovered.count !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyActivityChart;
