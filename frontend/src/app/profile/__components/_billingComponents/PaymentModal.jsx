"use client";
import { addPaymentMethod } from "@/app/utils/BillingApi";
import { useState } from "react";
import toast from "react-hot-toast";

const PaymentModal = ({ onClose, method, onAdd }) => {
  const [form, setForm] = useState(
    method ?? { type: "", last4: "", expiry: "" }
  );
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

    // Validation
    const last4Valid = /^\d{4}$/.test(form.last4);
    const expiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry);
    const cardTypeValid = form.type.trim().length > 0;

    if (!cardTypeValid) {
      toast.error("Card type is required");
      setIsSubmitting(false);
      return;
    }

    if (!last4Valid) {
      toast.error("Last 4 digits must be exactly 4 numbers");
      setIsSubmitting(false);
      return;
    }

    if (!expiryValid) {
      toast.error("Expiry must be in MM/YY format");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      cardType: form.type.trim(),
      last4: form.last4,
      expiryDate: form.expiry,
    };

    try {
      const id = await addPaymentMethod(payload);

      const newMethod = {
        id: id,
        cardType: payload.cardType,
        last4: payload.last4,
        expiryDate: payload.expiryDate,
      };

      onAdd?.(newMethod);
      toast.success("Added payment method");
      setForm({ type: "", last4: "", expiry: "" });
      setSuccess(true);
      onClose();
    } catch (err) {
      toast.error("Error adding payment method");
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Payment Method</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            &times;
          </button>
        </div>
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
    </div>
  );
};

export default PaymentModal;
