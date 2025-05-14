"use client";

import Calendar from "react-calendar";
import { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import { format, isSameDay } from "date-fns";

const EventCalendar = ({ tasks = [] }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const filtered = tasks.filter((task) =>
      isSameDay(new Date(task.date), selectedDate)
    );
    setFilteredTasks(filtered);
  }, [selectedDate, tasks]);

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <Calendar onChange={setSelectedDate} value={selectedDate} />
      <h2 className="text-md font-semibold mt-4 mb-2">
        Tasks for {format(selectedDate, "PPP")}
      </h2>
      {filteredTasks.length === 0 ? (
        <p className="text-gray-400 italic text-sm">No tasks on this date.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="border-l-4 border-blue-500 bg-blue-50 px-3 py-2 rounded-md"
            >
              <div className="font-medium text-gray-800">{task.title}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventCalendar;
