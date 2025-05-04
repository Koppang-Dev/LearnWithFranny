import { CopyButton } from "@/components/button/CopyButton";

export const ReferralLinkSection = ({ referralLink }) => {
  //
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl font-bold text-black">Referral Link</h1>

      {/* Referral Link Box */}
      <div className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200">
        <h2 className="text-lg font-semibold text-black">Your Referral Link</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="px-3 py-2 text-sm text-gray-800 bg-gray-100 border border-gray-300 rounded-lg w-full"
          />
          <CopyButton copyText={referralLink} />
        </div>
      </div>
    </div>
  );
};
