"use client";

import { useUser } from "../context/UserContext";
import { getUserContext } from "../utils/generalServerApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardClientWrapper = ({ children }) => {
  const { user, setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserContext();
        setUser({
          email: res.email,
          username: res.username,
          name: res.name,
        });
      } catch (error) {
        console.error("User not logged in");
        router.push("/login");
      }
    };

    if (!user?.email) {
      fetchUser();
    }
  }, []);

  return <>{children}</>;
};

export default DashboardClientWrapper;
