"use server";
import { getCookies } from "./headerUtil";

// Fetching all payment methods
export const fetchPaymentMethods = async () => {
  const token = await getCookies();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/billing/payment-methods`,
      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    //   Validation
    if (!response.ok) {
      const error = await response.text();
      console.error(error);
      throw new Error(error);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

// Fetching Billing history
export const fetchBillingHistory = async () => {
  const token = await getCookies();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/billing/billing-history`,
      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    //   Validation
    if (!response.ok) {
      const error = await response.json();
      console.error(error);
      throw new Error(error);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

// Fetching current subscription plan
export const fetchSubscriptionPlan = async () => {
  const token = await getCookies();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/billing/subscription-plan`,
      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    //   Validation
    if (!response.ok) {
      const error = await response.text();
      console.error(error);
      throw new Error(error);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
