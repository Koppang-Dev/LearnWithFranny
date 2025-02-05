"use client";

import { FolderProvider } from "../context/FolderProvider";
import DashboardLayout from "../dashboard/DashBoardLayout";
import Header from "./_components/header";
import NoteDashboard from "./_components/note-dashboard";
import Sidebar from "./_components/sidebar";

const UploadNote = () => {
  return (
    <FolderProvider>
      <div>
        <div className="md:w-64 h-screen fixed"></div>
        <div className="md:ml-64">
          <Header className=" flex p-5 shadow-sm" />
          <div className="m-20">
            <NoteDashboard />
          </div>
        </div>
      </div>
    </FolderProvider>
  );
};
export default UploadNote;
