import { Suspense } from "react";
import Loading from "@/components/loading";
import Tabs from "../components/Tabs";
import TabRenderer from "../components/TabRenderer";

export default function ProfileTabPage({ params }) {
  const tab = params.tab || "General";

  return (
    <div className="m-0 w-full h-full bg-white p-20">
      <div className="flex flex-col gap-10">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-black">Riley Koppang</h1>
          <h2 className="text-lg text-gray-500">
            Manage your details and personal preferences here
          </h2>
        </div>

        {/* Tabs */}
        <Tabs activeTab={tab} />

        {/* Tab Content */}
        <div className="mt-4 w-2/3 pb-20">
          <Suspense fallback={<Loading />}>
            <TabRenderer tab={tab} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
