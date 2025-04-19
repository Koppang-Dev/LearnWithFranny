// Main page that shows the analytics and the tab bar on the left for the options
"use client";
import AdminPage from "@/components/AdminPage";
import Navbar from "@/components/Navbar";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import { getUserContext } from "../utils/ProfileApi";
import { useEffect } from "react";
const DashboardPage = () => {
  const { user, setUser } = useUser();
  const router = useRouter();

  // Fetching user info if they logged in through OAuth2
  useEffect(() => {
    // const fetchUser = async () => {
    //   try {
    //     const res = await getUserContext();
    //     // Set the user context
    //     setUser({
    //       email: res.email,
    //       username: res.username,
    //       name: res.name,
    //     });
    //     // Saving in local storage
    //     localStorage.setItem("email", res.email);
    //     localStorage.setItem("username", res.username);
    //   } catch (error) {
    //     console.error("user not logged in");
    //     router.push("/login");
    //   }
    // };
    // // Only call if the user is not set
    // if (!user?.email) {
    //   console.log("Fetching users context");
    //   fetchUser();
    // } else {
    //   console.log("Did not fetch");
    // }
  }, []);

  return (
    <div className="h-screen flex">
      {/* LEFT: Sidebar */}
      <div className="">
        {/* Sidebar content (could be your Menu or other content) */}
      </div>

      {/* RIGHT: AdminPage */}
      <div className="flex-1 bg-[#F7F8FA] overflow-auto">
        <Navbar />
        <AdminPage />
      </div>
    </div>
  );
};

export default DashboardPage;
