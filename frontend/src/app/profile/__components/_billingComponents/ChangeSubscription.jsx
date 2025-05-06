"use client";

import { useState } from "react";

const plans = [
  { name: "Free Plan", price: "$0" },
  { name: "Pro Plan", price: "$49.99" },
  { name: "Premium Plan", price: "$99.99" },
];

const ChangeSubscription = () => {
  const [selected, setSelected] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);

    try {
      //   Call function
      const res = await changeSubscription();
      setSuccess(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleChange} className="flex flex-col gap-4">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="p-2 border rounded"
          required
        >
          <option value="">Select a plan</option>
          {plans.map((plan) => (
            <option key={plan.name} value={plan.name}>
              {plan.name} — {plan.price}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
        >
          {isSubmitting ? "Changing..." : "Change Plan"}
        </button>

        {success && (
          <p className="text-green-600 text-sm">Subscription updated!</p>
        )}
      </form>
    </div>
  );
};

export default ChangeSubscription;
