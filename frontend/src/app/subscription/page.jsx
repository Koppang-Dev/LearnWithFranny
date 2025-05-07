"use client";

import { useRouter } from "next/navigation";

export default function SubscriptionPlans() {
  const router = useRouter();

  const plans = [
    {
      name: "Free",
      price: "$0/month",
      description:
        "Basic access to features. Suitable for individuals just getting started.",
      features: ["Limited quizzes", "No AI support", "Community access only"],
    },
    {
      name: "Pro",
      price: "$9.99/month",
      description: "Advanced tools and AI support for dedicated learners.",
      features: [
        "Unlimited quizzes",
        "AI-generated flashcards",
        "Priority support",
      ],
    },
    {
      name: "Ultimate",
      price: "$19.99/month",
      description: "All features unlocked with premium perks for power users.",
      features: [
        "Everything in Pro",
        "Custom AI tutoring",
        "Early access to new features",
      ],
    },
  ];

  const handleSelect = (planName) => {
    alert(`You selected the ${planName} plan.`);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-2">Choose Your Plan</h1>
      <p className="text-center text-purple-600 font-medium mb-8">
        Subscription system coming soon!
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="border rounded-xl p-6 shadow hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <ul className="mb-4 list-disc list-inside text-sm text-gray-700">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-lg font-bold mb-2">{plan.price}</p>
              {plan.name !== "Free" && (
                <button
                  onClick={() => handleSelect(plan.name)}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Select
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
