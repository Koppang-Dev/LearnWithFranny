import { startOfWeek, addDays, format, isSameDay } from "date-fns";

export default function WeekView({ currentDate, tasks }) {
  const start = startOfWeek(currentDate);
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

  const getTasksForDay = (date) =>
    tasks.filter(
      (task) =>
        format(new Date(task.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day, idx) => (
        <div key={idx} className="border rounded p-2 h-40 overflow-auto">
          <div
            className={`font-semibold text-sm ${
              isSameDay(day, new Date()) ? "text-blue-600" : ""
            }`}
          >
            {format(day, "EEE, MMM d")}
          </div>
          <ul className="mt-1 text-xs space-y-1">
            {getTasksForDay(day).map((task) => (
              <li key={task.id} className="truncate text-gray-700">
                • {task.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
