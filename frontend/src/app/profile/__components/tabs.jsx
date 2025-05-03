"use client";
import { useState } from "react";
import BillingContent from "./billingContent";
import GeneralContent from "./generalContent";
import NotificationContent from "./notificationContent";
import ReferFriendContent from "./ReferFriendContent";
import SecurityContent from "./securityContent";

// This component will render the selected tab for the user
const Tabs = () => {
  // Marking which tab is active
  const [activeTab, setActiveTab] = useState("General");

  // All of the available tabs
  const tabs = [
    {
      id: "General",
      label: "General",
    },
    {
      id: "Security",
      label: "Security",
    },
    {
      id: "Billing",
      label: "Billing",
    },
    {
      id: "Notifications",
      label: "Notification",
    },
    {
      id: "Refer a friend",
      label: "Refer a friend",
    },
  ];

  // Render selected tab content
  const renderContent = () => {
    switch (activeTab) {
      case "General":
        return <GeneralContent />;
      case "Security":
        return <SecurityContent />;
      case "Billing":
        return <BillingContent />;
      case "Notifications":
        return <NotificationContent />;
      case "Refer a friend":
        return <ReferFriendContent />;
      default:
        return null;
    }
  };

  return (
    <div className="w-2/3">
      {/* Displaying the tab buttons */}
      <div className="flex items-center justify-evenly mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-lg font-medium ${
              activeTab === tab.id
                ? "text-purple-300 border-b-2 border-purple-300"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Displaying the tab content */}
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
};

export default Tabs;
