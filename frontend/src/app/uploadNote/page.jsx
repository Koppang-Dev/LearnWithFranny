"use client";

import Sidebar from "./_components/sidebar";

const UploadNote = () => {
  return (
    <div>
      <div className="md:w-64 h-screen fixed">
        <Sidebar />
      </div>
      <div className="md:ml-64">Upload Notes</div>
    </div>
  );
};

export default UploadNote;
