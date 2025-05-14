export default function Announcements({ tasks = [] }) {
  console.log("Announcements tasks", tasks);
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-3">Upcoming Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-400 italic text-sm">No tasks due soon.</p>
      ) : (
        <ul className="space-y-3 text-sm">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="border-l-4 border-yellow-500 bg-yellow-50 px-3 py-2 rounded-md shadow-sm"
            >
              <div className="font-semibold text-gray-800">{task.title}</div>
              <div className="text-gray-500 text-xs">
                Due{" "}
                {new Date(task.date).toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
