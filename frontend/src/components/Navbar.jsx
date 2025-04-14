"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  // User avatar is clicked
  const [activeProfileDropdown, setProfileDropDown] = useState(false);
  const router = useRouter();

  return (
    <div className="flex items-center justify-between p-4">
      {/* User Profile Image and Name */}

      {/* Notifications Symbol */}

      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full mr-20">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <Image
            src="/images/announcement.png"
            alt=""
            width={20}
            height={20}
            className="bg-none"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">John Doe</span>
          <span className="text-[10px] text-gray-500 text-right">Student</span>
        </div>

        {/* Avatar + Dropdown */}
        <div className="relative">
          <div
            onClick={() => setProfileDropDown(!activeProfileDropdown)}
            className="cursor-pointer"
          >
            <Image
              src="/images/avatar.png"
              alt="profileImage"
              width={36}
              height={36}
              className="rounded-full"
            />
          </div>

          {/* profile dropdown menu */}
          {activeProfileDropdown && (
            <div className="absolute left-1/2 mt-2 transform -translate-x-1/2 w-40 bg-white rounded-md shadow-lg z-50">
              {/* Settings */}
              <button
                className="block w-full px-4 py-4 text-left text-md text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  // Pushing the settings page
                  router.push("/profile");
                }}
              >
                Settings
              </button>

              {/* Logout */}
              <button
                className="block w-full px-4 py-2 text-left text-md text-red-500 hover:bg-gray-100"
                onClick={() => {
                  // Log user out
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
