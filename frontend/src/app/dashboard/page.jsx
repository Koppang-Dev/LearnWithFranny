// Main page that shows the analytics and the tab bar on the left for the options

import Menu from "@/components/Menu";
import AdminPage from "@/components/AdminPage";

import Navbar from "@/components/Navbar";

import Image from "next/image";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-1/6 md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 bg-black">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image
            src="/images/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="filter invert brightness-100 grayscale"
          />
          <span className=" hidden lg:block text-3xl text-white font-bold">
            LearnWithFranny
          </span>
        </Link>

        <Menu />
      </div>
      {/* Right */}
      <div className="w-5/6 md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll">
        <Navbar />
        <AdminPage />
      </div>
    </div>
  );
};

export default DashboardPage;
