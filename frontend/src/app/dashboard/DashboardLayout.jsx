import Sidebar from "./__components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar fixed and takes full height */}
      <Sidebar />

      {/* Main content with margin-left to account for the sidebar */}
      <main className="flex-1 ml-64">{children}</main>
    </div>
  );
};

export default DashboardLayout;
