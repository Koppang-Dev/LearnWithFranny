"use client";
import Image from "next/image";
import {
  LayoutDashboardIcon,
  NotebookIcon,
  FileIcon,
  Settings2Icon,
  HelpCircleIcon,
  TrashIcon,
  IdCardIcon,
  NotebookTabsIcon,
  NotepadTextIcon,
  BrainIcon,
  CalendarIcon,
  UserIcon,
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
    name: "Calendar",
    path: "/calendar",
    icon: CalendarIcon,
  },
  {
    name: "Documents",
    path: "/documents",
    icon: FileIcon,
    items: [
      {
        name: "Favourites",
        icon: FileIcon,
      },
      {
        name: "Trash",
        icon: TrashIcon,
      },
    ],
  },
  {
    name: "Flash Cards",
    path: "/flashcard",
    icon: NotepadTextIcon,
  },

  {
    name: "Study",
    path: "/study",
    icon: BrainIcon,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: UserIcon,
  },
  {
    name: "Help",
    path: "/help",
    icon: HelpCircleIcon,
  },
];

const Sidebar = () => {
  return (
    <div className="top-0 left-0 h-full w-72 bg-white shadow-lg z-20 text-black p-4">
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
