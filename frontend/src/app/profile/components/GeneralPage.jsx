import GeneralContent from "./_generalComponents/GeneralContent";
import { fetchGeneralData } from "@/app/utils/generalServerApi";
import { getUserContext } from "@/app/utils/generalServerApi";
export default async function GeneralPage() {
  const generalData = await fetchGeneralData();
  const userData = await getUserContext();

  return <GeneralContent generalData={generalData} userData={userData} />;
}
