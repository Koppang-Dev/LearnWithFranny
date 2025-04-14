"use client";
import { ChevronDown, Icon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

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
    <div>
      <div
        className={`flex items-center space-x-2 p-3 rounded-lg hover:bg-purple-50 cursor-pointer hover:text-purple-500 ${isActive && "text-purple-500 bg-purple-50"}`}
        onClick={onClick}
      >
        {icon && React.createElement(icon, { size: 30 })}
        <p className="text-black font-sm font-semibold">{name}</p>
      </div>

      {/* Render Nested Items when parent is active */}
      {isActive && items && (
        <div className="ml-4 mt-2">
          {items.map((nestedItem, index) => (
            <div key={index}>
              <button className=" text-black w-full text-left p-3 cursor-pointer hover:bg-purple-50 hover:text-purple-500">
                <p className="text-black font-sm font-semibold">
                  {nestedItem.name}
                </p>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
