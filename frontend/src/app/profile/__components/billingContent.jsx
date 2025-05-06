import {
  fetchBillingHistory,
  fetchPaymentMethods,
  fetchSubscriptionPlan,
} from "@/app/utils/BillingServerApi";
import AddPaymentMethod from "./_billingComponents/AddPaymentMethod";
import ChangeSubscription from "./_billingComponents/ChangeSubscription";
const BillingContent = async () => {
  // Server side calls
  const paymentMethods = await fetchPaymentMethods();
  const billingHistory = await fetchBillingHistory();
  const subscriptionPlan = await fetchSubscriptionPlan();

  // Handle Add Payment Method
  const handleAddPaymentMethod = () => {
    // Logic to add a new payment method
    alert("Add Payment Method functionality goes here.");
  };

  // Handle Change Subscription Plan
  const handleChangeSubscriptionPlan = () => {
    // Logic to change subscription plan
    alert("Change Subscription Plan functionality goes here.");
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Payment Methods Section */}
      <div>
        <h1 className="text-xl font-bold">Payment Methods</h1>
        {paymentMethods.map((pm) => (
          <div key={pm.id}>
            {pm.type} ending in {pm.last4} (expires {pm.expiry})
          </div>
        ))}
        <AddPaymentMethod />
      </div>

      {/* Billing History */}
      <div>
        <h1 className="text-xl font-bold">Billing History</h1>
        {billingHistory.map((bill, index) => (
          <div key={index}>
            {bill.date} — {bill.amount} — {bill.status}
          </div>
        ))}
      </div>

      {/* Subscription Plan */}
      <div>
        <h1 className="text-xl font-bold">Subscription Plan</h1>
        <p>
          {subscriptionPlan.name} — {subscriptionPlan.price}
        </p>
        <p>Renews on {subscriptionPlan.renewalDate}</p>
        <ChangeSubscription />
      </div>
    </div>
  );
};

export default BillingContent;
