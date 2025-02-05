"use client";
import { ChevronDown, Icon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo } from "react";

const SidebarItem = ({ item }) => {
  // Destructoring items
  const { name, path, icon, items } = item;

  const router = useRouter();
  const pathname = usePathname();

  // When the div is clicked
  const onClick = () => {
    router.push(path);
  };

  // A hook than runs when the state changes
  const isActive = useMemo(() => {
    return path === pathname;
  }, [path.pathname]);

  return (
    <div
      className={`flex items-center space-x-2 p-3 rounded-lg hover:bg-purple-50 cursor-pointer hover:text-purple-500 ${isActive && "text-purple-500 bg-purple-50"}`}
      onClick={onClick}
    >
      {icon && React.createElement(icon, { size: 30 })}
      <p className="text-black font-sm font-semibold">{name}</p>
    </div>
  );
};

export default SidebarItem;
