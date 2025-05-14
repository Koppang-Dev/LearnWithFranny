import { format, isSameDay } from "date-fns";

export default function DayView({
  currentDate,
  tasks,
  openAddModal,
  openEditModal,
  handleDelete,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm min-h-[calc(100vh-160px)] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {format(currentDate, "EEEE, MMMM d")}
          {isSameDay(currentDate, new Date()) && (
            <span className="ml-2 text-sm bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
              Today
            </span>
          )}
        </h2>
        <button
          onClick={() => openAddModal(currentDate)}
          className="text-sm text-blue-600 font-medium hover:underline"
        >
          + Add Task
        </button>
      </div>

      {/* Task List */}
      {tasks.length > 0 ? (
        <ul className="flex-1 overflow-y-auto space-y-3 text-sm">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-gray-100 hover:bg-gray-200 rounded-md px-4 py-3 flex justify-between items-center text-gray-800 transition-all shadow-sm"
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
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 italic text-center mt-10">
          No tasks for this day.
        </p>
      )}
    </div>
  );
}
