"use client";
import Link from "next/link";
import { useState } from "react";

// SignIn component handles user login
export default function SignIn() {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  // Updates state with form input values
  function handleChange(e) {
    const copy = { ...state };
    copy[e.target.name] = e.target.value;
    setState(copy);
  }

  async function handleSubmit() {
    // Send a POST request to the server with the user's credentials
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
      // Store the token in localStorage on successful login
      const json = await res.json();
      localStorage.setItem("token", json.token);
    } else {
      alert("Bad Credentials");
    }
  }

  return (
    <div className="">
      <h1 className="">Sign In</h1>
      <div className="">
        <input
          className=""
          type="text"
          name="username"
          placeholder="username"
          value={state.username}
          onChange={handleChange}
          autoComplete="off"
        />
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
