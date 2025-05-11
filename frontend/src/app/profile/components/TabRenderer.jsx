import GeneralPage from "./GeneralPage";
import BillingPage from "./BillingPage";
import SecurityPage from "./SecurityPage";
import NotificationPage from "./NotificationPage";
import ReferFriendContent from "./ReferFriendContent";

const tabMap = {
  General: GeneralPage,
  Billing: BillingPage,
  Security: SecurityPage,
  Notifications: NotificationPage,
  Refer: ReferFriendContent,
};

export default function TabRenderer({ tab }) {
  const Component = tabMap[tab] || tabMap["General"];
  return <Component />;
}
