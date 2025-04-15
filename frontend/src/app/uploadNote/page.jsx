"use client";

import { FolderProvider } from "../context/FolderProvider";
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
        <div className="flex flex-col gap-10 h-full mb-10">
          <div className="flex flex-col pl-20 pt-8 gap-10">
            <h1 className="text-4xl font-semibold">Study Files</h1>
            <FileHeader />
            <RecentlyModifiedSection />
            <NoteDashboard />
          </div>
        </div>
      </DocumentsProvider>
    </FolderProvider>
  );
};
export default UploadNote;
