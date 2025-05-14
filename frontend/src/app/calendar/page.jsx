// app/calendar/page.jsx
import CalendarView from "./__components/CalendarView";

export default function CalendarPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Calendar</h1>
      <CalendarView />
    </div>
  );
}
