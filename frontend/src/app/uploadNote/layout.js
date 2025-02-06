// app/uploadNote/layout.js
import DashboardLayout from "../dashboard/DashBoardLayout"; // Import your global dashboard layout

const UploadNoteLayout = ({ children }) => {
  return (
    <DashboardLayout>
      <div className="flex justify-center w-full pt-20 ml-72">{children}</div>
    </DashboardLayout>
  );
};

export default UploadNoteLayout;
