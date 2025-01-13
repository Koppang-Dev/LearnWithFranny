"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

// SignUp component allows users to register an account
export default function SignUp() {
  const router = useRouter();

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Handles changes to form inputs and updates the state
  function handleChange(e) {
    const copy = { ...state };
    copy[e.target.name] = e.target.value;
    setState(copy);
  }

  async function handleSubmit() {
    // Send a POST request to the signup API endpoint
    const res = await fetch(
      "${process.env.REACT_APP_API_URL}/api/auth/signin",
      {
        method: "POST",
        body: JSON.stringify(state),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      alert("user registered success");
      router.push("/signin");
    }
  }

  return (
    <div className="">
      <h1 className="">Sign Up</h1>
      <div className="">
        {/* Username input */}
        <input
          className=""
          type="text"
          name="username"
          placeholder="username"
          value={state.username}
          onChange={handleChange}
          autoComplete="off"
        />
        {/* Email input */}
        <input
          className=""
          type="text"
          name="email"
          placeholder="email"
          value={state.email}
          onChange={handleChange}
          autoComplete="off"
        />
        {/* Password input */}
        <input
          className=""
          type="password"
          name="password"
          placeholder="password"
          value={state.password}
          onChange={handleChange}
        />
        <button className="" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
