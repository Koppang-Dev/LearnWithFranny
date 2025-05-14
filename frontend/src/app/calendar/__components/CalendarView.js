"use client";

import React, { useEffect, useState } from "react";
import {
  addDays,
  addWeeks,
  addMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  format,
} from "date-fns";

import TaskModal from "./TaskModal";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import DayView from "./DayView";
import {
  getTasksInRange,
  createTask,
  deleteTask,
} from "@/app/utils/CalanderApi";
import toast from "react-hot-toast";
export default function CalendarView() {
  const [view, setView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch tasks based on the current view and date
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      let start, end;

      // Format the current date range selected
      if (view === "month") {
        start = format(startOfMonth(currentDate), "yyyy-MM-dd");
        end = format(endOfMonth(currentDate), "yyyy-MM-dd");
      } else if (view === "week") {
        start = format(startOfWeek(currentDate), "yyyy-MM-dd");
        end = format(endOfWeek(currentDate), "yyyy-MM-dd");
      } else {
        start = end = format(currentDate, "yyyy-MM-dd");
      }

      // Fetch the tasks for this date
      try {
        setTasks(await getTasksInRange(start, end));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [view, currentDate]);

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

  const openModal = (taskOrDate) => {
    if (taskOrDate.date) {
      setSelectedTask({
        title: "",
        date: format(taskOrDate.date, "yyyy-MM-dd"),
      });
    } else {
      setSelectedTask(taskOrDate);
    }
    setModalOpen(true);
  };

  const handleSave = async (task) => {
    try {
      // Creating the payload
      const payload = {
        title: task.title,
        date: task.date,
      };

      await createTask(payload);
      const refreshed = await getTasksInRange(
        startOfMonth(currentDate),
        endOfMonth(currentDate)
      );
      setTasks(refreshed);
      toast.success("Task Added!");
    } catch (err) {
      toast.error("Error adding task");
      console.error("Error saving task:", err);
    }
  };

  const handleDelete = async (task) => {
    try {
      await deleteTask(task);
      toast.success("Deleted Taks");
    } catch (err) {
      toast.error("Error deleting task");
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="space-x-2">
          <button onClick={goToPrevious}>←</button>
          <span>{format(currentDate, "PPP")}</span>
          <button onClick={goToNext}>→</button>
        </div>
        <div className="space-x-2">
          {["month", "week", "day"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1 rounded ${
                view === v ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main View */}
      {loading ? (
        <div className="text-center text-gray-500 italic">Loading tasks...</div>
      ) : view === "month" ? (
        <MonthView
          currentDate={currentDate}
          tasks={tasks}
          openModal={openModal}
          handleDelete={handleDelete}
        />
      ) : view === "week" ? (
        <WeekView
          currentDate={currentDate}
          tasks={tasks}
          openModal={openModal}
          handleDelete={handleDelete}
        />
      ) : (
        <DayView
          currentDate={currentDate}
          tasks={tasks}
          openModal={openModal}
          handleDelete={handleDelete}
        />
      )}

      {/* Task Modal */}
      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        task={selectedTask}
      />
    </div>
  );
}
