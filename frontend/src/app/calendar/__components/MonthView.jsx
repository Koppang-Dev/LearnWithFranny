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
  openAddModal,
  openEditModal,
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {days.map((day, idx) => (
        <div
          key={idx}
          className={`rounded-lg p-4 h-64 overflow-auto shadow-sm transition-all duration-150 flex flex-col ${
            isSameMonth(day, currentDate)
              ? "bg-white border border-gray-200"
              : "bg-gray-50 border border-gray-100 text-gray-400"
          }`}
        >
          {/* Header with date and Add button */}
          <div className="flex justify-between items-center mb-2">
            <div className="font-semibold text-sm text-gray-800 flex items-center gap-2">
              {format(day, "d")}
              {isSameDay(day, new Date()) && (
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                  Today
                </span>
              )}
            </div>
            <button
              onClick={() => openAddModal(day)}
              className="text-blue-600 text-xs font-medium hover:underline"
            >
              + Add
            </button>
          </div>

          {/* Task List */}
          <ul className="flex-1 overflow-y-auto space-y-2 text-xs">
            {getTasksForDay(day).length === 0 ? (
              <li className="text-gray-300 italic text-center pt-6">
                No tasks
              </li>
            ) : (
              getTasksForDay(day).map((task) => (
                <li
                  key={task.id}
                  className="bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2 flex justify-between items-center text-gray-800 shadow-sm transition-all duration-150"
                >
                  <span className="truncate">{task.title}</span>
                  <div className="flex items-center space-x-2 ml-2">
                    <button
                      onClick={() => openEditModal(task)}
                      className="text-blue-600 hover:text-blue-800 transition"
                      title="Edit"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Delete"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
