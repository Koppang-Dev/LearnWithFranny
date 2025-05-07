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
      const error = await response.json();
      console.error("Failed adding payment method:", error);
      throw new Error("Failed adding payment method");
    }

    const id = await response.json();
    return id;
  } catch (err) {
    throw new Error("Failed adding payment method", err);
  }
};

// Adding payment method
export const removePaymentMethod = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/billing/remove-payment-method`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(id),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error("Failed deleting payment method", error);
    }

    const data = await response.text();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed deleting payment method");
  }
};

// Changing subscription
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
