"use client";

import Header from "./_components/header";
import NoteDashboard from "./_components/note-dashboard";
import Sidebar from "./_components/sidebar";

const UploadNote = () => {
  return (
    <div>
      <div className="md:w-64 h-screen fixed">
        <Sidebar />
      </div>
      <div className="md:ml-64">
        <Header className=" flex p-5 shadow-sm" />
        <div className="m-20">
          <NoteDashboard />
        </div>
      </div>
    </div>
  );
};

export default UploadNote;
