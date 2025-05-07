"use client";
import { addPaymentMethod } from "@/app/utils/BillingApi";
import { useState } from "react";
import toast from "react-hot-toast";

const PaymentModal = () => {
  const [form, setForm] = useState({ type: "", last4: "", expiry: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);

    //   Add to the DB
    try {
      const res = await addPaymentMethod(form);
      setSuccess(true);
      setForm({ type: "", last4: "", expiry: "" });
      toast.success("Added payment method");
    } catch (err) {
      toast.error("Error adding payment method");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add New Payment Method</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="type"
          placeholder="Card Type (e.g., Visa)"
          value={form.type}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          name="last4"
          placeholder="Last 4 Digits"
          value={form.last4}
          onChange={handleChange}
          className="p-2 border rounded"
          maxLength="4"
          required
        />
        <input
          name="expiry"
          placeholder="Expiry (MM/YY)"
          value={form.expiry}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? "Saving..." : "Add Payment Method"}
        </button>
        {success && (
          <p className="text-green-600 text-sm">Payment method added!</p>
        )}
      </form>
    </div>
  );
};

export default PaymentModal;
