import Tabs from "./__components/tabs";
import GeneralContent from "./__components/generalContent";
import SecurityPage from "./__components/securityPage";
import BillingContent from "./__components/billingContent";
import ReferFriendContent from "./__components/ReferFriendContent";
import NotificationPage from "./__components/NotificationPage";

const Profile = async ({ searchParams }) => {
  const tab = searchParams.tab || "General";

  // Rendering specific page
  const renderContent = () => {
    switch (tab) {
      case "General":
        return <GeneralContent />;
      case "Security":
        return <SecurityPage />;
      case "Billing":
        return <BillingContent />;
      case "Notifications":
        return <NotificationPage />;
      case "Refer":
        return <ReferFriendContent />;
      default:
        return <GeneralContent />;
    }
  };

  return (
    <div className="m-0 w-full h-full bg-white p-20">
      {/* Displaying the users name and title */}
      <div className="flex flex-col gap-10">
        {/* users name */}
        <div className="">
          <div>
            <h1 className="text-2xl font-semibold text-black">Riley Koppang</h1>
            <h2 className="text-lg text-gray-500">
              Manage your details and personal preferences here
            </h2>
          </div>
        </div>
        {/* Displaying tabs */}
        <Tabs activeTab={tab} />
        <div className="mt-4 w-2/3 pb-20">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Profile;
