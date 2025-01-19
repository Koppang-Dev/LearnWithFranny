"use client";

import Header from "./_components/header";
import Sidebar from "./_components/sidebar";

const UploadNote = () => {
  return (
    <div>
      <div className="md:w-64 h-screen fixed">
        <Sidebar />
      </div>
      <div className="md:ml-64">
        <Header className=" flex p-5 shadow-sm" />
      </div>
    </div>
  );
};

export default UploadNote;
