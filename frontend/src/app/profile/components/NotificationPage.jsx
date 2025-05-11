import { fetchNotificationPreferences } from "@/app/utils/NotificationServerApi";
import NotificationContent from "./_notificationComponents/NotificationContent";
export default async function NotificationPage() {
  const preferences = await fetchNotificationPreferences();

  // Rendering client component
  return <NotificationContent preferences={preferences} />;
}
