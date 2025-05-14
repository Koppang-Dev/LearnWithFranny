// Page displaying the Analytics and the calendar
import { fetchUserStats } from "@/app/utils/UserStatsServerApi";
import WeeklyActivityChart from "./WeeklyActivityChart";
import Announcements from "./Announcements";
import EventCalendar from "./EventCalendar";
import UserCard from "./UserCard";
import DailyActivityChart from "./DailyActivityChart";
import DifficultyChart from "./DifficultyChart";
import Loading from "@/components/loading";
import { Suspense } from "react";
import { getUpcomingTasks } from "@/app/utils/TaskServerApi";

// User card metrics
const metrics = [
  "Flashcards Created",
  "Flashcards Reviewed",
  "Study Streak (Days)",
  "Flashcards Mastered",
];

const AdminPage = async () => {
  const userStats = await fetchUserStats();
  const metricValues = [
    userStats.flashcardsCreated,
    userStats.flashcardsReviewed,
    userStats.studyStreak,
    userStats.flashcardsMastered,
  ];

  const upcomingTasks = (await getUpcomingTasks()).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  return (
    <div className="p-4 flex flex-col lg:flex-row gap-4 min-h-screen">
      {/* LEFT COLUMN */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8 flex-grow">
        {/* USER CARDS */}
        <Suspense fallback={<Loading />}>
          <div className="flex gap-4 justify-between flex-wrap">
            {metrics.map((metricsText, index) => (
              <UserCard
                key={index}
                type={metricsText}
                value={metricValues[index]}
              />
            ))}
          </div>
        </Suspense>

        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* DIFFICULTY CHART */}
          <Suspense fallback={<Loading />}>
            <div className="w-full lg:w-1/3 h-[450px]">
              <DifficultyChart data={userStats.masteryBreakdown} />
            </div>
          </Suspense>

          {/* WEEKLY ACTIVITY */}
          <Suspense fallback={<Loading />}>
            <div className="w-full h-[450px]">
              <WeeklyActivityChart data={userStats.recentWeekActivity} />
            </div>
          </Suspense>
        </div>

        {/* DAILY ACTIVITY */}
        <Suspense fallback={<Loading />}>
          <div className="flex-1">
            <DailyActivityChart data={userStats.yearActivity} />
          </div>
        </Suspense>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8 overflow-y-auto max-h-[calc(100vh-2rem)] pr-2">
        <EventCalendar tasks={upcomingTasks} />
        <Announcements tasks={upcomingTasks} />
      </div>
    </div>
  );
};

export default AdminPage;
