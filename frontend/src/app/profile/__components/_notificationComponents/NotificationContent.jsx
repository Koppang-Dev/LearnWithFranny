"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import NotificationToggle from "./NotificationToggle";
import { updateNotificationPreferences } from "@/app/utils/NotificationApi";

// Notification Types
const notificationTypes = [
  { key: "news", label: "News and Updates" },
  { key: "updates", label: "Product Updates" },
  { key: "reminders", label: "Reminders" },
];

// Notification Content Page
export default function NotificationContent({ preferences }) {
  const [emailNotifications, setEmailNotifications] = useState({
    news: preferences.emailNews,
    updates: preferences.emailUpdates,
    reminders: preferences.emailReminders,
  });

  const [pushNotifications, setPushNotifications] = useState({
    news: preferences.pushNews,
    updates: preferences.pushUpdates,
    reminders: preferences.pushReminders,
  });

  const [notificationFrequency, setNotificationFrequency] = useState(
    preferences.notificationFrequency
  );

  const toggle = (setter) => (key) => {
    setter((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleEmail = toggle(setEmailNotifications);
  const togglePush = toggle(setPushNotifications);

  const savePreferences = async () => {
    const payload = {
      emailNews: emailNotifications.news,
      emailUpdates: emailNotifications.updates,
      emailReminders: emailNotifications.reminders,
      pushNews: pushNotifications.news,
      pushUpdates: pushNotifications.updates,
      pushReminders: pushNotifications.reminders,
      notificationFrequency: notificationFrequency,
    };
    try {
      updateNotificationPreferences(payload);
      toast.success("Updated Preferences");
    } catch (err) {
      toast.error("Error updating preferences");
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Email Notifications */}
      <div>
        <h1 className="text-xl font-bold">Email Notifications</h1>
        <div className="flex flex-col gap-4">
          {notificationTypes.map(({ key, label }) => (
            <NotificationToggle
              key={key}
              label={label}
              checked={emailNotifications[key]}
              onChange={() => toggleEmail(key)}
            />
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div>
        <h1 className="text-xl font-bold">Push Notifications</h1>
        <div className="flex flex-col gap-4">
          {notificationTypes.map(({ key, label }) => (
            <NotificationToggle
              key={key}
              label={label}
              checked={pushNotifications[key]}
              onChange={() => togglePush(key)}
            />
          ))}
        </div>
      </div>

      {/* Frequency */}
      <div>
        <h1 className="text-xl font-bold">Notification Preferences</h1>
        <div className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-black">
            Notification Frequency
          </h2>
          <select
            value={notificationFrequency}
            onChange={(e) => setNotificationFrequency(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="immediate">Immediate</option>
            <option value="daily">Daily Summary</option>
            <option value="weekly">Weekly Summary</option>
          </select>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={savePreferences}
          className="px-5 py-3 bg-purple-600 text-white font-medium rounded-xl shadow-sm hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
