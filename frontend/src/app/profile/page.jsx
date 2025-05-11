import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/loading";
import Tabs from "./components/tabs";

// Tab mapping
const tabComponents = {
  General: dynamic(() => import("./components/GeneralPage"), {
    suspense: true,
  }),
  Billing: dynamic(() => import("./components/BillingPage"), {
    suspense: true,
  }),
  Security: dynamic(() => import("./components/SecurityPage"), {
    suspense: true,
  }),
  Notifications: dynamic(() => import("./components/NotificationPage"), {
    suspense: true,
  }),
  Refer: dynamic(() => import("./components/ReferFriendContent"), {
    suspense: true,
  }),
};

export default function Profile({ searchParams }) {
  const tab = searchParams.tab || "General";
  const TabComponent = tabComponents[tab] || tabComponents["General"];

  return (
    <div className="m-0 w-full h-full bg-white p-20">
      <div className="flex flex-col gap-10">
        <div>
          <h1 className="text-2xl font-semibold text-black">Riley Koppang</h1>
          <h2 className="text-lg text-gray-500">
            Manage your details and personal preferences here
          </h2>
        </div>

        <Tabs activeTab={tab} />

        <div className="mt-4 w-2/3 pb-20">
          <Suspense fallback={<Loading />}>
            <TabComponent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
