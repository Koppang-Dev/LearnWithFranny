"use client";
import { removePaymentMethod } from "@/app/utils/BillingApi";
import { useState } from "react";
import toast from "react-hot-toast";
import PaymentModal from "./PaymentModal";
import { useRouter } from "next/navigation";

export default function BillingContent({
  paymentMethods,
  billingHistory,
  subscriptionPlan,
}) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const [methods, setMethods] = useState(paymentMethods);

  const handleAdd = () => {
    setEditingMethod(null);
    setShowModal(true);
  };

  const handleAddMethod = (newMethod) => {
    setMethods((prev) => [...prev, newMethod]);
  };

  const handleChangeSubscriptionPlan = () => {
    router.push("/subscription");
  };

  const deletePaymentMethod = async (id) => {
    try {
      await removePaymentMethod(id);
      setMethods((prev) => prev.filter((m) => m.id !== id));
      toast.success("Successfully removed payment method");
    } catch (err) {
      console.log(err);
      toast.error("Error deleting payment method");
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Payment Methods Section */}
      <div className="flex flex-col gap-8">
        <h1 className="text-xl font-bold text-black">Payment Methods</h1>

        {/* Payment Methods List */}
        <div className="flex flex-col gap-4">
          {/* No Payment Methods */}
          {paymentMethods.length === 0 ? (
            <p className="text-gray-500 italic">
              No payment methods added yet.
            </p>
          ) : (
            methods.map((method) => (
              <div
                key={method.id}
                className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200"
              >
                <div>
                  <h2 className="text-lg font-semibold text-black">
                    {method.cardType} ending in {method.last4}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Expires {method.expiryDate}
                  </p>
                </div>
                <div className="flex justify-end items-center">
                  <button
                    className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-purple-400 hover:text-black transition-colors w-20"
                    onClick={() => deletePaymentMethod(method.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Payment Method Button */}
        <div className="flex justify-end">
          <button
            onClick={handleAdd}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Payment Method
          </button>
        </div>
      </div>

      {/* Billing History Section */}
      <div className="flex flex-col gap-8">
        <h1 className="text-xl font-bold text-black">Billing History</h1>

        {/* Billing History List */}
        <div className="flex flex-col gap-4">
          {billingHistory.length === 0 ? (
            <p className="text-gray-500 italic">No billing history</p>
          ) : (
            billingHistory.map((bill, index) => (
              <div
                key={index}
                className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200"
              >
                <div>
                  <h2 className="text-lg font-semibold text-black">
                    {bill.date}
                  </h2>
                  <p className="text-sm text-gray-500">{bill.status}</p>
                </div>
                <p className="text-lg text-gray-600">{bill.amount}</p>
                <div className="flex justify-end items-center"></div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Subscription Plan Section */}
      <div className="flex flex-col gap-8">
        <h1 className="text-xl font-bold text-black">Subscription Plan</h1>

        {/* Current Plan */}
        <div className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-black">Current Plan</h2>
          <p className="text-lg text-gray-600">Free</p>
          <div className="flex justify-end items-center">
            <button
              onClick={handleChangeSubscriptionPlan}
              className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-purple-400 hover:text-black transition-colors w-20"
            >
              View Plans
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <PaymentModal
          method={editingMethod}
          onClose={() => setShowModal(false)}
          onAdd={handleAddMethod}
        />
      )}
    </div>
  );
}
