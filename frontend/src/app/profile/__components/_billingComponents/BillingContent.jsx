"use client";
import { useState } from "react";
import PaymentModal from "./PaymentModal";

export default function BillingContent({
  paymentMethods,
  billingHistory,
  subscriptionPlan,
}) {
  const [showModal, setShowModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);

  const handleAdd = () => {
    setEditingMethod(null);
    setShowModal(true);
  };

  const handleEdit = (method) => {
    setEditingMethod(method);
    setShowModal(true);
  };
}
