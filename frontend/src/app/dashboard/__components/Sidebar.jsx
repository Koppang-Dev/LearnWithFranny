"use client";
import Image from "next/image";
import {
  LayoutDashboardIcon,
  NotebookIcon,
  FileIcon,
  Settings2Icon,
  HelpCircleIcon,
} from "lucide-react";
import SidebarItem from "./item";

// Defining sidebar items
const items = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    name: "Documents",
    path: "/uploadNote",
    icon: FileIcon,
    items: [
      {
        name: "Upload Document",
        icon: FileIcon,
      },
      {
        name: "Create Folder",
        icon: FileIcon,
      },
      {
        name: "Favourites",
        icon: FileIcon,
      },
    ],
  },
  {
    name: "Quizzes",
    path: "/quiz",
    icon: NotebookIcon,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings2Icon,
  },
  {
    name: "Help",
    path: "/help",
    icon: HelpCircleIcon,
  },
];

const Sidebar = () => {
  return (
    <div className="top-0 left-0 h-screen w-72 bg-white shadow-lg z-20 text-black p-4">
      {/* Logo and Title */}
      <div className="flex flex-col space-y-10 w-full">
        <div className="flex items-center space-x-2">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={60}
            height={60}
            className="w-fit h-10"
          />
          <h1 className="font-semibold text-lg">LearnWithFranny</h1>
        </div>
        <div className="flex flex-col space-y-5">
          {items.map((item) => {
            return <SidebarItem key={item.path} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
