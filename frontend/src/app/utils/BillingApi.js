// Adding payment method
export const addPaymentMethod = async (form) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/billing/add-payment-method`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      }
    );

    if (!response.ok) {
      throw new Error("Failed adding payment method");
    }

    const data = await response.text();
    return data;
  } catch (err) {
    throw new Error("Failed adding payment method");
  }
};

// Changing subscription
// Adding payment method
export const changeSubscription = async (newPlan) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/billing/changeSubscription`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newPlan),
      }
    );

    if (!response.ok) {
      throw new Error("Failed changing subscription");
    }

    const data = await response.text();
    return data;
  } catch (err) {
    throw new Error("Failed changing subscription");
  }
};
