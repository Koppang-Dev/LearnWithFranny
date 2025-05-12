import AdminPage from "./__components/AdminPage";
import DashboardClientWrapper from "./DashboardClientWrapper";

const DashboardPage = () => {
  return (
    <DashboardClientWrapper>
      <div className="h-screen flex bg-[#F7F8FA] overflow-auto">
        <AdminPage />
      </div>
    </DashboardClientWrapper>
  );
};

export default DashboardPage;
