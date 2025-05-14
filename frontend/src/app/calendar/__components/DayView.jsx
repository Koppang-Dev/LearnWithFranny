import { format, isSameDay } from "date-fns";

export default function DayView({ currentDate, tasks }) {
  const getTasksForDay = tasks.filter((task) =>
    isSameDay(new Date(task.date), currentDate)
  );

  return (
    <div className="border rounded p-4 h-64 overflow-auto bg-white">
      <h2 className="text-lg font-semibold mb-2">
        {format(currentDate, "EEEE, MMMM d")}
      </h2>
      {getTasksForDay.length > 0 ? (
        <ul className="space-y-2 text-sm">
          {getTasksForDay.map((task) => (
            <li key={task.id} className="text-gray-800">
              • {task.title}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No tasks for this day.</p>
      )}
    </div>
  );
}
