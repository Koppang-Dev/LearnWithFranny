import Navbar from "@/components/navbar/Navbar";
import ActionSection from "./action-section";
import Hero from "./hero";
import UserStatsSection from "./user-stats-section";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <UserStatsSection />
      <ActionSection />
    </div>
  );
};

export default LandingPage;
