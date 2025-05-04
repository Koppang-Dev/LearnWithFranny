import Tabs from "./__components/tabs";
import GeneralContent from "./__components/generalContent";
import SecurityContent from "./__components/securityContent";
import BillingContent from "./__components/billingContent";
import NotificationContent from "./__components/notificationContent";
import ReferFriendContent from "./__components/ReferFriendContent";

const Profile = async ({ searchParams }) => {
  const tab = searchParams.tab || "General";

  // Rendering specific page
  const renderContent = () => {
    switch (tab) {
      case "General":
        return <GeneralContent />;
      case "Security":
        return <SecurityContent />;
      case "Billing":
        return <BillingContent />;
      case "Notifications":
        return <NotificationContent />;
      case "Refer":
        return <ReferFriendContent />;
      default:
        return <GeneralContent />;
    }
  };

  return (
    <div className="m-10 w-full h-full bg-white">
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
        <div className="mt-4 w-2/3">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Profile;
