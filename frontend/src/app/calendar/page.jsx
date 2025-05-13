"use client";

import React, { useState } from "react";
import {
  CalendarDaysIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { format, addDays, addWeeks, addMonths } from "date-fns";

export default function CalendarPage() {
  const [view, setView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  const goToPrevious = () => {
    setCurrentDate((prev) =>
      view === "day"
        ? addDays(prev, -1)
        : view === "week"
        ? addWeeks(prev, -1)
        : addMonths(prev, -1)
    );
  };

  const goToNext = () => {
    setCurrentDate((prev) =>
      view === "day"
        ? addDays(prev, 1)
        : view === "week"
        ? addWeeks(prev, 1)
        : addMonths(prev, 1)
    );
  };

  const renderView = () => {
    if (view === "day") {
      return (
        <div className="h-full flex flex-col items-start justify-start">
          <p className="text-xl font-semibold mb-2">
            {format(currentDate, "EEEE, MMMM d")}
          </p>
          <div className="w-full border rounded p-4 text-gray-500 italic">
            No events for today.
          </div>
        </div>
      );
    }

    if (view === "week") {
      const start = currentDate;
      const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
      return (
        <div className="grid grid-cols-7 gap-2 h-full">
          {days.map((day, idx) => (
            <div
              key={idx}
              className="border rounded p-2 text-sm text-gray-800 flex flex-col"
            >
              <span className="font-semibold">{format(day, "EEE, MMM d")}</span>
              <div className="flex-1 text-gray-400 italic mt-2">No events</div>
            </div>
          ))}
        </div>
      );
    }

    if (view === "month") {
      return (
        <div className="grid grid-cols-7 gap-2 h-full">
          {Array.from({ length: 35 }, (_, i) => (
            <div
              key={i}
              className="border rounded p-2 text-xs text-gray-600 h-24"
            >
              <div className="font-semibold">{i + 1}</div>
              <div className="mt-1 text-[11px] italic text-gray-400">
                No events
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6 h-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevious}
            className="p-1 rounded hover:bg-gray-200"
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          <p className="text-gray-700 font-medium">
            {format(currentDate, view === "month" ? "MMMM yyyy" : "PPP")}
          </p>
          <button onClick={goToNext} className="p-1 rounded hover:bg-gray-200">
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          </button>
          <div className="ml-4 flex gap-1">
            {["month", "week", "day"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  view === v
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border"
                }`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendar View */}
        <div className="flex-1 bg-white rounded-xl shadow p-6 h-[700px] overflow-y-auto">
          {renderView()}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/4 bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Upcoming Events
          </h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-gray-400" />
              AI Midterm — <span className="font-medium">May 20</span>
            </li>
            <li className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-gray-400" />
              Submit Proposal — <span className="font-medium">May 22</span>
            </li>
            <li className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-gray-400" />
              Final Presentation — <span className="font-medium">June 10</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
