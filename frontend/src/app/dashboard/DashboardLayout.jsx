import Sidebar from "./__components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      {/* Sidebar fixed and takes full height */}
      <Sidebar />

      {/* Main content with margin-left to account for the sidebar */}
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
