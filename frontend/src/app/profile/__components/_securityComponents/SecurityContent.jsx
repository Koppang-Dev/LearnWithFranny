"use client";
import { useUser } from "@/app/context/UserContext";
import { resetPassword } from "@/app/utils/ProfileApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { revokeSessions, toggle2FA } from "@/app/utils/UserSettings";

const SecurityContent = ({ data }) => {
  // User information
  const { user } = useUser();

  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(
    data.twoFactorEnabled
  );
  const [activeSessions, setActiveSessions] = useState(data.activeSessions);

  const passwordChangedAt = new Date(data.passwordChangedAt).toLocaleString(
    "en-US",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  );

  const toggleTwoFactor = async () => {
    try {
      setIsTwoFactorEnabled(!isTwoFactorEnabled);
      const response = await toggle2FA();
      toast.success("2FA Updated");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // Handle Logout from All Devices
  const handleLogoutAll = async () => {
    try {
      await revokeSessions();
      setActiveSessions([]);
      toast.success("Successfully removed devices");
    } catch (err) {
      console.error(err);
      toast.error("Failed revoking sessions");
    }
  };

  // Sending password reset link
  const handlePasswordReset = async () => {
    try {
      const res = await resetPassword(user.email);
      toast.success("Password Reset Sent To Email");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Password */}
      <div className="flex flex-col gap-8">
        <h1 className="text-xl font-bold text-black">Password</h1>
        <div className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-black">Change Password</h2>
          <p className="text-lg text-gray-600">
            Last changed {passwordChangedAt}
          </p>
          <div className="flex justify-end items-center">
            <button
              className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-purple-400 hover:text-black transition-colors w-20"
              onClick={handlePasswordReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* 2FA Toggle */}
      <div className="flex flex-col gap-8 pt-3 border-t border-gray-200">
        <h1 className="text-xl font-bold text-black">
          Two-Factor Authentication
        </h1>
        <div className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-black">
            Enable Two-Factor Authentication
          </h2>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isTwoFactorEnabled}
              onChange={toggleTwoFactor}
              className="sr-only"
            />
            <div
              className={`w-11 h-6 rounded-full transition-colors ${
                isTwoFactorEnabled ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${
                  isTwoFactorEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </label>
        </div>
      </div>

      {/* Sessions */}
      <div className="flex flex-col gap-8 pt-3 border-t border-gray-200">
        <h1 className="text-xl font-bold text-black">Active Sessions</h1>
        <div className="flex flex-col gap-4">
          {activeSessions.map((session, index) => (
            <div
              key={index}
              className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200"
            >
              <div>
                <h2 className="text-lg font-semibold text-black">
                  {session.device}
                </h2>
                <p className="text-sm text-gray-500">{session.location}</p>
              </div>
              <p className="text-lg text-gray-600">{session.lastActive}</p>
              <div className="flex justify-end items-center">
                <button className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-purple-400 hover:text-black transition-colors w-20">
                  Logout
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleLogoutAll}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout All Devices
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityContent;
