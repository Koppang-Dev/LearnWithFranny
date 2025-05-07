// "use client";
// import { useState } from "react";
// // import { fetchPaymentMethods } from "@/app/utils/BillingServerApi";
// // import AddPaymentMethod from "./_billingComponents/AddPaymentMethod";
// import AddPaymentMethod from "./_billingComponents/PaymentModal";
// const BillingContent = () => {
//   // State for Payment Methods
//   const [paymentMethods, setPaymentMethods] = useState([
//     { id: 1, type: "Visa", last4: "1234", expiry: "12/25" },
//     { id: 2, type: "MasterCard", last4: "5678", expiry: "06/24" },
//   ]);

//   // State for Billing History
//   const [billingHistory, setBillingHistory] = useState([
//     { id: 1, date: "2023-10-01", amount: "$49.99", status: "Paid" },
//     { id: 2, date: "2023-09-01", amount: "$49.99", status: "Paid" },
//   ]);

//   // State for Subscription Plan
//   const [subscriptionPlan, setSubscriptionPlan] = useState("Pro Plan");

//   // Handle Add Payment Method
//   const handleAddPaymentMethod = () => {
//     // Logic to add a new payment method
//     alert("Add Payment Method functionality goes here.");
//   };

//   // Handle Change Subscription Plan
//   const handleChangeSubscriptionPlan = () => {
//     // Logic to change subscription plan
//     alert("Change Subscription Plan functionality goes here.");
//   };

//   return (
//     <div className="flex flex-col gap-10">
//       {/* Payment Methods Section */}
//       <div className="flex flex-col gap-8">
//         <h1 className="text-xl font-bold text-black">Payment Methods</h1>

//         {/* Payment Methods List */}
//         <div className="flex flex-col gap-4">
//           {paymentMethods.map((method) => (
//             <div
//               key={method.id}
//               className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200"
//             >
//               <div>
//                 <h2 className="text-lg font-semibold text-black">
//                   {method.type} ending in {method.last4}
//                 </h2>
//                 <p className="text-sm text-gray-500">Expires {method.expiry}</p>
//               </div>
//               <div className="flex justify-end items-center">
//                 <button className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-purple-400 hover:text-black transition-colors w-20">
//                   Edit
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Add Payment Method Button */}
//         <div className="flex justify-end">
//           <button
//             onClick={handleAddPaymentMethod}
//             className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Add Payment Method
//           </button>
//         </div>
//       </div>

//       {/* Billing History Section */}
//       <div className="flex flex-col gap-8">
//         <h1 className="text-xl font-bold text-black">Billing History</h1>

//         {/* Billing History List */}
//         <div className="flex flex-col gap-4">
//           {billingHistory.map((bill) => (
//             <div
//               key={bill.id}
//               className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200"
//             >
//               <div>
//                 <h2 className="text-lg font-semibold text-black">
//                   {bill.date}
//                 </h2>
//                 <p className="text-sm text-gray-500">{bill.status}</p>
//               </div>
//               <p className="text-lg text-gray-600">{bill.amount}</p>
//               <div className="flex justify-end items-center">
//                 <button className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-purple-400 hover:text-black transition-colors w-20">
//                   View
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Subscription Plan Section */}
//       <div className="flex flex-col gap-8">
//         <h1 className="text-xl font-bold text-black">Subscription Plan</h1>

//         {/* Current Plan */}
//         <div className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200">
//           <h2 className="text-lg font-semibold text-black">Current Plan</h2>
//           <p className="text-lg text-gray-600">{subscriptionPlan}</p>
//           <div className="flex justify-end items-center">
//             <button
//               onClick={handleChangeSubscriptionPlan}
//               className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-purple-400 hover:text-black transition-colors w-20"
//             >
//               Change
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BillingContent;
