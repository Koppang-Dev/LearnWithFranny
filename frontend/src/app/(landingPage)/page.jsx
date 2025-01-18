import Navbar from "@/components/navbar/Navbar";
import Hero from "./hero";
import UserStatsSection from "./user-stats-section";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <UserStatsSection />
    </div>
  );
};

export default LandingPage;
