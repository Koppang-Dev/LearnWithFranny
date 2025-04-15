// app/uploadNote/layout.js
"use client";

import Sidebar from "../dashboard/__components/Sidebar";
export default function Layout({ children }) {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
