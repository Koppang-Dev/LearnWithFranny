// Page displaying the Analystics and the calender
import ActivityChart from "./ActivityChart";
import CountChart from "./CountChart";
import EventCalendar from "./EventCalendar";
import NotesChart from "./NotesChart";
import UserCard from "./UserCard";

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="Notes" />
          <UserCard type="Quizzes Completed" />
          <UserCard type="Tests Completed" />
          <UserCard type="Hours Studying" />
        </div>
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg-w-1/3 h-[450px]">
            <CountChart />
          </div>
          {/* ACTIVITY CHART */}
          <div className="w-full lg-w-2/3 h-[450px]">
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
      </div>
    </div>
  );
};

export default AdminPage;
