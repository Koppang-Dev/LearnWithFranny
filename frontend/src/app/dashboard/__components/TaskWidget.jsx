"use client";

import { useEffect, useState } from "react";
import { format, isToday, isTomorrow } from "date-fns";

const UpcomingTaskWidget = ({ tasks = [] }) => {
  const [todayTasks, setTodayTasks] = useState([]);
  const [tomorrowTasks, setTomorrowTasks] = useState([]);

  useEffect(() => {
    const today = new Date();
    const filteredToday = tasks.filter((task) => isToday(new Date(task.date)));
    const filteredTomorrow = tasks.filter((task) =>
      isTomorrow(new Date(task.date))
    );

    setTodayTasks(filteredToday);
    setTomorrowTasks(filteredTomorrow);
  }, [tasks]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <h2 className="text-lg font-bold mb-3">Upcoming Tasks</h2>

      {/* Today */}
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Today</h3>
        {todayTasks.length === 0 ? (
          <p className="text-gray-400 italic text-sm mb-4">No tasks today.</p>
        ) : (
          <ul className="space-y-2 mb-4">
            {todayTasks.map((task) => (
              <li
                key={task.id}
                className="border-l-4 border-blue-500 bg-blue-50 px-3 py-2 rounded-md text-sm"
              >
                <div className="font-medium text-gray-800">{task.title}</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Tomorrow */}
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Tomorrow</h3>
        {tomorrowTasks.length === 0 ? (
          <p className="text-gray-400 italic text-sm">No tasks tomorrow.</p>
        ) : (
          <ul className="space-y-2">
            {tomorrowTasks.map((task) => (
              <li
                key={task.id}
                className="border-l-4 border-yellow-500 bg-yellow-50 px-3 py-2 rounded-md text-sm"
              >
                <div className="font-medium text-gray-800">{task.title}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UpcomingTaskWidget;
