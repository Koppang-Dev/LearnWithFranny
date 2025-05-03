const ReferralHistorySection = ({ referralHistory }) => {
  return (
    <div className="flex flex-col gap-8">
      {/* Referral History Section */}
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
  );
};

export default ReferralHistorySection;
