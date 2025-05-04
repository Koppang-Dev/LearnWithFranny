"use client";
import { useState } from "react";

const NotificationContent = () => {
  // State for Email Notifications
  const [emailNotifications, setEmailNotifications] = useState({
    news: true,
    updates: false,
    reminders: true,
  });

  // State for Push Notifications
  const [pushNotifications, setPushNotifications] = useState({
    news: false,
    updates: true,
    reminders: true,
  });

  // Toggle Email Notifications
  const toggleEmailNotification = (type) => {
    setEmailNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Toggle Push Notifications
  const togglePushNotification = (type) => {
    setPushNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Email Notifications Section */}
      <div className="flex flex-col gap-8">
        <h1 className="text-xl font-bold text-black">Email Notifications</h1>

        {/* Email Notification Preferences */}
        <div className="flex flex-col gap-4">
          {/* News */}
          <div className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-black">
              News and Updates
            </h2>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications.news}
                onChange={() => toggleEmailNotification("news")}
                className="sr-only" // Hide the default checkbox
              />
              <div
                className={`w-11 h-6 bg-gray-200 rounded-full transition-colors ${
                  emailNotifications.news ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${
                    emailNotifications.news ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </div>
            </label>
          </div>

          {/* Updates */}
          <div className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-black">
              Product Updates
            </h2>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications.updates}
                onChange={() => toggleEmailNotification("updates")}
                className="sr-only" // Hide the default checkbox
              />
              <div
                className={`w-11 h-6 bg-gray-200 rounded-full transition-colors ${
                  emailNotifications.updates ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${
                    emailNotifications.updates
                      ? "translate-x-5"
                      : "translate-x-0"
                  }`}
                />
              </div>
            </label>
          </div>

          {/* Reminders */}
          <div className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-black">Reminders</h2>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications.reminders}
                onChange={() => toggleEmailNotification("reminders")}
                className="sr-only" // Hide the default checkbox
              />
              <div
                className={`w-11 h-6 bg-gray-200 rounded-full transition-colors ${
                  emailNotifications.reminders ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${
                    emailNotifications.reminders
                      ? "translate-x-5"
                      : "translate-x-0"
                  }`}
                />
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Push Notifications Section */}
      <div className="flex flex-col gap-8">
        <h1 className="text-xl font-bold text-black">Push Notifications</h1>

        {/* Push Notification Preferences */}
        <div className="flex flex-col gap-4">
          {/* News */}
          <div className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-black">
              News and Updates
            </h2>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={pushNotifications.news}
                onChange={() => togglePushNotification("news")}
                className="sr-only" // Hide the default checkbox
              />
              <div
                className={`w-11 h-6 bg-gray-200 rounded-full transition-colors ${
                  pushNotifications.news ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${
                    pushNotifications.news ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </div>
            </label>
          </div>

          {/* Updates */}
          <div className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-black">
              Product Updates
            </h2>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={pushNotifications.updates}
                onChange={() => togglePushNotification("updates")}
                className="sr-only" // Hide the default checkbox
              />
              <div
                className={`w-11 h-6 bg-gray-200 rounded-full transition-colors ${
                  pushNotifications.updates ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${
                    pushNotifications.updates
                      ? "translate-x-5"
                      : "translate-x-0"
                  }`}
                />
              </div>
            </label>
          </div>

          {/* Reminders */}
          <div className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-black">Reminders</h2>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={pushNotifications.reminders}
                onChange={() => togglePushNotification("reminders")}
                className="sr-only" // Hide the default checkbox
              />
              <div
                className={`w-11 h-6 bg-gray-200 rounded-full transition-colors ${
                  pushNotifications.reminders ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${
                    pushNotifications.reminders
                      ? "translate-x-5"
                      : "translate-x-0"
                  }`}
                />
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Notification Preferences Section */}
      <div className="flex flex-col gap-8">
        <h1 className="text-xl font-bold text-black">
          Notification Preferences
        </h1>

        {/* Notification Frequency */}
        <div className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-black">
            Notification Frequency
          </h2>
          <select className="px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="immediate">Immediate</option>
            <option value="daily">Daily Summary</option>
            <option value="weekly">Weekly Summary</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default NotificationContent;
