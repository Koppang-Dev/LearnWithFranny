// src/components/LayoutWrapper.js (Client Component)

"use client"; // Make sure this is a client component

import { useRouter } from "next/navigation";
import Menu from "@/components/navbar/_components/Menu";

const LayoutWrapper = ({ children }) => {
  const router = useRouter();
  const mainAppRoutes = ["/dashboard", "/notes", "/quizzes", "/analytics"];
  const showSidebar = mainAppRoutes.includes(router.pathname);

  return (
    <div className="flex">
      {showSidebar && <Menu />} {/* Sidebar appears only on these routes */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default LayoutWrapper;
