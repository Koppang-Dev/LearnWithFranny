// Main page that shows the analytics and the tab bar on the left for the options

import Menu from "@/components/Menu";
import AdminPage from "@/components/AdminPage";

import Navbar from "@/components/Navbar";

import Image from "next/image";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <div className="h-screen flex">
      {/* LEFT: Sidebar */}
      <div className="">
        {/* Sidebar content (could be your Menu or other content) */}
      </div>

      {/* RIGHT: AdminPage */}
      <div className="flex-1 bg-[#F7F8FA] overflow-auto">
        <Navbar />
        <AdminPage />
      </div>
    </div>
  );
};

export default DashboardPage;
