import { getSecurityInformation } from "@/app/utils/SecurityApi";
import SecurityContent from "./_securityComponents/SecurityContent";

export default async function SecurityPage() {
  const securityData = await getSecurityInformation();
  return <SecurityContent data={securityData} />;
}
