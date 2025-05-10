"use client";
import Navbar from "@/components/navbar/Navbar";
import ActionSection from "./action-section";
import EducationSection from "./education-section";
import Footer from "./footer";
import Hero from "./hero";
import UserStatsSection from "./user-stats-section";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LandingPage = () => {
  const router = useRouter();

  // Checking for authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/check`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        // Bring user to the dashboard if they are already logged in

        if (res.ok) {
          router.replace("/dashboard");
        }
      } catch (err) {}
    };
    checkAuth();
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />
      <EducationSection />
      <UserStatsSection />
      <ActionSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
