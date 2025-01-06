// Main page that shows the analytics and the tab bar on the left for the options

import Menu from "@/components/Menu";
import Image from "next/image";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-1/6 md:w-[8%] lg:w-[16%] xl:w-[14%] bg-red-200 p-4">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/images/logo.png" alt="logo" width={32} height={32} />
        </Link>
        <Menu />
        <span className="hidden lg:block">LearnWithFranny</span>
      </div>
      {/* Right */}
      <div className="w-5/6 md:w-[92%] lg:w-[84%] xl:w-[86%] bg-blue-200">
        r
      </div>
    </div>
  );
};

export default DashboardPage;
