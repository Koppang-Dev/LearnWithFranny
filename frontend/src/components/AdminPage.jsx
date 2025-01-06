// Page displaying the Analystics and the calender
import UserCard from "./UserCard";
const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3"></div>
      {/* USER CARDS */}
      <div className="flex gap-4 justify-between">
        <UserCard type="Notes" />
        <UserCard type="Quizzes Completed" />
        <UserCard type="Tests Completed" />
        <UserCard type="Hours Studying" />
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w1/3"></div>
    </div>
  );
};

export default AdminPage;
