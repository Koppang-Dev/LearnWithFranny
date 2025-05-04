"use client";
import Router, { useRouter } from "next/navigation";

// This component will render the selected tab for the user
const Tabs = ({ activeTab }) => {
  const router = useRouter();
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
      id: "Refer",
      label: "Refer a friend",
    },
  ];

  const handleTabClick = (tabId) => {
    router.push(`?tab=${tabId}`, { scroll: false });
  };

  return (
    <div className="flex items-center justify-evenly mb-6 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
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
  );
};
export default Tabs;
