import { useState } from "react";

const ReferFriendContent = () => {
  // State for Referral Link
  const [referralLink, setReferralLink] = useState(
    "https://example.com/refer/12345"
  );

  // State for Referral History
  const [referralHistory, setReferralHistory] = useState([
    { id: 1, name: "John Doe", date: "2023-10-01", status: "Signed Up" },
    { id: 2, name: "Jane Smith", date: "2023-09-15", status: "Completed" },
  ]);

  // Handle Copy Referral Link
  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied to clipboard!");
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Referral Link Section */}
      <div className="flex flex-col gap-8">
        <h1 className="text-xl font-bold text-black">Referral Link</h1>

        {/* Referral Link Box */}
        <div className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-black">
            Your Referral Link
          </h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="px-3 py-2 text-sm text-gray-800 bg-gray-100 border border-gray-300 rounded-lg w-full"
            />
            <button
              onClick={handleCopyReferralLink}
              className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-purple-400 hover:text-black transition-colors"
            >
              Copy
            </button>
          </div>
        </div>
      </div>

      {/* Referral Rewards Section */}
      <div className="flex flex-col gap-8">
        <h1 className="text-xl font-bold text-black">Referral Rewards</h1>

        {/* Rewards Information */}
        <div className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-black">Earn Rewards</h2>
          <p className="text-lg text-gray-600">
            Earn a free month free for every friend who subscribes!
          </p>
        </div>
      </div>

      {/* Referral History Section */}
      <div className="flex flex-col gap-8">
        <h1 className="text-xl font-bold text-black">Referral History</h1>

        {/* Referral History List */}
        <div className="flex flex-col gap-4">
          {referralHistory.map((referral) => (
            <div
              key={referral.id}
              className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200"
            >
              <div>
                <h2 className="text-lg font-semibold text-black">
                  {referral.name}
                </h2>
                <p className="text-sm text-gray-500">{referral.date}</p>
              </div>
              <p className="text-lg text-gray-600">{referral.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReferFriendContent;
