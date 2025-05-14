import { startOfWeek, addDays, format, isSameDay } from "date-fns";

export default function WeekView({
  currentDate,
  tasks,
  openAddModal,
  openEditModal,
  handleDelete,
}) {
  const start = startOfWeek(currentDate);
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

  const getTasksForDay = (day) => {
    const formattedDay = format(day, "yyyy-MM-dd");
    return tasks.filter((task) => task.date === formattedDay);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 h-[calc(100vh-160px)]">
      {days.map((day, idx) => (
        <div
          key={idx}
          className="border border-gray-200 rounded-lg p-4 bg-white flex flex-col min-h-full overflow-hidden shadow-sm"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <div className="font-semibold text-sm text-gray-800 flex items-center gap-2">
              {format(day, "EEE, MMM d")}
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

          {/* Task list */}
          <ul className="flex-1 overflow-y-auto space-y-2 text-xs">
            {getTasksForDay(day).length === 0 ? (
              <li className="text-gray-400 italic text-center pt-4">
                No tasks
              </li>
            ) : (
              getTasksForDay(day).map((task) => (
                <li
                  key={task.id}
                  className="bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2 flex justify-between items-center text-gray-800 shadow-sm transition-all"
                >
                  <span className="truncate">{task.title}</span>
                  <div className="flex items-center space-x-2 ml-2">
                    <button
                      onClick={() => openEditModal(task)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-red-500 hover:text-red-700"
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
