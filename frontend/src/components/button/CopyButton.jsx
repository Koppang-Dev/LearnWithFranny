"use client";

export const CopyButton = () => {
  // Copying Link to dashboard
  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied to clipboard!");
  };
  return (
    <button
      onClick={handleCopyReferralLink}
      className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-purple-400 hover:text-black transition-colors"
    >
      Copy
    </button>
  );
};
