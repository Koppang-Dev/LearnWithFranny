"use client";

import React, { useMemo, useState } from "react";
import { format, eachDayOfInterval, startOfMonth, endOfMonth } from "date-fns";

const getColor = (count) => {
  if (count === 0) return "bg-gray-100";
  if (count === 1) return "bg-blue-100";
  if (count < 4) return "bg-blue-300";
  if (count < 6) return "bg-violet-400";
  return "bg-violet-600";
};

const DailyActivityChart = ({ data }) => {
  const [hovered, setHovered] = useState(null);

  const dataMap = useMemo(() => {
    const map = new Map();
    data.forEach((item) => {
      const key = format(new Date(item.date), "yyyy-MM-dd");
      map.set(key, item.count);
    });
    return map;
  }, [data]);

  const months = useMemo(() => {
    const year = new Date().getFullYear();
    const monthly = [];

    for (let month = 0; month < 12; month++) {
      const days = eachDayOfInterval({
        start: startOfMonth(new Date(year, month)),
        end: endOfMonth(new Date(year, month)),
      }).map((date) => ({
        date,
        count: dataMap.get(format(date, "yyyy-MM-dd")) || 0,
      }));

      while (days[0] && days[0].date.getDay() !== 0) days.unshift(null);
      while (days.length % 7 !== 0) days.push(null);

      const weeks = [];
      for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7));
      }

      monthly.push({
        label: format(new Date(year, month), "MMM"),
        weeks,
      });
    }

    return monthly;
  }, [dataMap]);

  return (
    <div className="bg-white p-4 rounded-xl w-full h-full flex flex-col overflow-hidden mb-10">
      <h2 className="text-lg font-semibold mb-4">Review Activity</h2>

      <div className="flex-grow overflow-auto">
        <div className="flex flex-wrap gap-6 justify-center min-h-full">
          {months.map((month, i) => (
            <div key={i} className="flex flex-col items-center w-[160px]">
              <p className="text-sm font-bold mb-3 text-gray-700">
                {month.label}
              </p>
              <div className="flex">
                {month.weeks.map((week, j) => (
                  <div key={j} className="flex flex-col gap-[5px]">
                    {week.map((day, k) => (
                      <div
                        key={k}
                        className={`w-[18px] h-[18px] rounded-sm ${
                          day ? getColor(day.count) : "bg-transparent"
                        }`}
                        onMouseEnter={(e) =>
                          day &&
                          setHovered({
                            ...day,
                            x: e.clientX,
                            y: e.clientY,
                          })
                        }
                        onMouseLeave={() => setHovered(null)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {hovered && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            top: hovered.y + 12,
            left: hovered.x + 12,
          }}
        >
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
  );
};

export default DailyActivityChart;
