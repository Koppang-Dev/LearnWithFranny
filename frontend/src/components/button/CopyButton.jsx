"use client";

export const CopyButton = ({ copyText }) => {
  // Copying Link to dashboard
  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(copyText);
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
