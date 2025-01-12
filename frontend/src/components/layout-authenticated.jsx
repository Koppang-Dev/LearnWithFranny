import { userRouter } from "next/router";
import { useState, useEffect } from "react";

export default function LayoutAuthenticated(props) {
  const [profile, setProfile] = useState();
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const res = await fetch("https//:localhost:3001", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    // Sucessfully fetched profile
    if (res.ok) {
      const json = await res.json();
      setProfile(json);
    } else {
      //   Unsucessfully fetched profile
      router.push("/signin");
    }
  }

  // Authenticated User Logs out
  function logout() {
    localStorage.removeItem("token");
    router.push("/");
  }
}
