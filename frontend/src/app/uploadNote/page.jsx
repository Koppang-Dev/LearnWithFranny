"use client";

import { FolderProvider } from "../context/FolderProvider";
import DashboardLayout from "../dashboard/DashBoardLayout";
import FileHeader from "./_components/FileHeader";
import Header from "./_components/header";
import NoteDashboard from "./_components/note-dashboard";
import RecentlyModifiedSection from "./_components/RecentlyModified";
import Sidebar from "./_components/sidebar";
import { DocumentsProvider } from "../context/DocumentsContext";

const UploadNote = () => {
  return (
    <FolderProvider>
      <DocumentsProvider>
        <div className="flex flex-col gap-20">
          <h1 className="text-4xl font-semibold pt-10 pl-10">
            Study Documents
          </h1>
          <FileHeader />
          <RecentlyModifiedSection />
          <NoteDashboard />
        </div>
      </DocumentsProvider>
    </FolderProvider>
    //
    //   <div>
    //     <div className="md:w-64 h-screen fixed"></div>
    //     <div className="md:ml-64">
    //       <Header className=" flex p-5 shadow-sm" />
    //       <div className="m-20">
    //         <NoteDashboard />
    //       </div>
    //     </div>
    //   </div>
    // </FolderProvider>
  );
};
export default UploadNote;
