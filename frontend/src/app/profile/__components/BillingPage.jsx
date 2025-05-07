import BillingContent from "./_billingComponents/BillingContent";
import { fetchBillingHistory } from "@/app/utils/BillingServerApi";
import { fetchSubscriptionPlan } from "@/app/utils/BillingServerApi";
import { fetchPaymentMethods } from "@/app/utils/BillingServerApi";

export default async function BillingPage() {
  const paymentMethods = await fetchPaymentMethods();
  const billingHistory = await fetchBillingHistory();
  const subscriptionPlan = await fetchSubscriptionPlan();

  console.log(paymentMethods);

  return (
    <BillingContent
      paymentMethods={paymentMethods}
      billingHistory={billingHistory}
      subscriptionPlan={subscriptionPlan}
    />
  );
}
