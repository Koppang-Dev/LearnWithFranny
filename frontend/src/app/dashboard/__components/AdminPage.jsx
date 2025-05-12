// Page displaying the Analystics and the calender
import ActivityChart from "@/components/ActivityChart";
import Announcements from "@/components/Announcements";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import NotesChart from "@/components/NotesChart";
import UserCard from "./UserCard";
// User card metrics
const metrics = [
  "Flashcards Created",
  "Flashcards Reviewed",
  "Study Streak (Days)",
  "Flashcards Mastered",
];

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          {metrics.map((metricsText, index) => (
            <UserCard key={index} type={metricsText} />
          ))}
        </div>
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          {/* ACTIVITY CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <ActivityChart />
          </div>
        </div>
        {/* BOTTOM CHARTS */}
        <div className="w-full h-[500px]">
          <NotesChart />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        {/* EVENT CALENDAR */}
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
