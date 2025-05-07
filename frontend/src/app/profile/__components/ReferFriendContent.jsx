import { ReferralLinkSection } from "./_referralComponents/ReferralLinkSection";
import { getReferralInformation } from "@/app/utils/ReferralApi";
import ReferralHistorySection from "./_referralComponents/ReferralHistorySection";

const ReferFriendContent = async () => {
  // Getting Referral Information
  const { referralLink, referralHistory } = await getReferralInformation();

  return (
    <div className="flex flex-col gap-10">
      {/* Referral Link Section */}
      <ReferralLinkSection referralLink={referralLink} />

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
        {/* Referral History List */}
        <ReferralHistorySection referralHistory={referralHistory} />
      </div>
    </div>
  );
};

export default ReferFriendContent;
