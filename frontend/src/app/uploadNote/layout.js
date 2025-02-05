// app/uploadNote/layout.js
import DashboardLayout from "../dashboard/DashBoardLayout"; // Import your global dashboard layout

const UploadNoteLayout = ({ children }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default UploadNoteLayout;
