import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  format,
} from "date-fns";

export default function MonthView({
  currentDate,
  tasks,
  openModal,
  handleDelete,
}) {
  const start = startOfWeek(startOfMonth(currentDate));
  const end = endOfWeek(endOfMonth(currentDate));
  const days = [];

  for (let day = start; day <= end; day = addDays(day, 1)) {
    days.push(day);
  }

  const getTasksForDay = (date) =>
    tasks.filter((task) => task.date === format(date, "yyyy-MM-dd"));

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day, idx) => (
        <div
          key={idx}
          className={`border rounded p-2 h-32 overflow-auto text-sm ${
            isSameMonth(day, currentDate)
              ? "bg-white"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          <div className="flex justify-between items-center mb-1">
            <div
              className={`font-semibold ${
                isSameDay(day, new Date()) ? "text-blue-600" : ""
              }`}
            >
              {format(day, "d")}
            </div>
            <button
              onClick={() => openModal({ date: day })}
              className="text-blue-500 text-xs hover:underline"
            >
              + Add
            </button>
          </div>

          <ul className="text-xs space-y-1">
            {getTasksForDay(day).map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center truncate text-gray-700"
              >
                <span className="truncate">{task.title}</span>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 text-xs ml-2"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
