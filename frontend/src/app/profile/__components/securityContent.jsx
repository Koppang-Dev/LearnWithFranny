import { revokeSessions } from "@/app/utils/UserSettings";
import { useState } from "react";

const SecurityContent = () => {
  // State for Two-Factor Authentication
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

  // State for Active Sessions
  const [activeSessions, setActiveSessions] = useState([]);

  // Toggle Two-Factor Authentication
  const toggleTwoFactor = () => {
    setIsTwoFactorEnabled(!isTwoFactorEnabled);
  };

  // Handle Logout from All Devices
  const handleLogoutAll = async () => {
    try {
      await revokeSessions();
      setActiveSessions([]);
    } catch (err) {}
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Password Section */}
      <div className="flex flex-col gap-8">
        <h1 className="text-xl font-bold text-black">Password</h1>

        {/* Change Password Section */}
        <div className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-black">Change Password</h2>
          <p className="text-lg text-gray-600">Last changed 3 months ago</p>
          <div className="flex justify-end items-center">
            <button className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-purple-400 hover:text-black transition-colors w-20">
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication Section */}
      <div className="flex flex-col gap-8 pt-3 border-t border-gray-200">
        <h1 className="text-xl font-bold text-black">
          Two-Factor Authentication
        </h1>

        {/* Enable 2FA Section */}
        <div className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-black">
            Enable Two-Factor Authentication
          </h2>
          {/* Switch */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isTwoFactorEnabled}
              onChange={toggleTwoFactor}
              className="sr-only" // Hide the default checkbox
            />
            <div
              className={`w-11 h-6 bg-gray-200 rounded-full transition-colors ${
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

      {/* Active Sessions Section */}
      <div className="flex flex-col gap-8 pt-3 border-t border-gray-200">
        <h1 className="text-xl font-bold text-black">Active Sessions</h1>

        {/* Active Sessions List */}
        <div className="flex flex-col gap-4">
          {activeSessions.map((session) => (
            <div
              key={session.id}
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

        {/* Logout All Sessions Button */}
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
