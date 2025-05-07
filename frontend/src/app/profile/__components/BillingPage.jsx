import BillingContent from "./billingContent";
import { fetchBillingHistory } from "@/app/utils/BillingServerApi";
import { fetchSubscriptionPlan } from "@/app/utils/BillingServerApi";
import { fetchPaymentMethods } from "@/app/utils/BillingServerApi";

export default async function BillingPage() {
  const paymentMethods = await fetchPaymentMethods();
  const billingHistory = await fetchBillingHistory();
  const subscriptionPlan = await fetchSubscriptionPlan();

  return (
    <BillingContent
      paymentMethods={paymentMethods}
      billingHistory={billingHistory}
      subscriptionPlan={subscriptionPlan}
    />
  );
}
