"use client";
import Link from "next/link";
import { useState } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGoogle,
  FaRegEnvelope,
} from "react-icons/fa";

import { MdLockOutline } from "react-icons/md";

// SignIn component handles user login
export default function Register() {
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl justify-between">
          {/* SIGN IN SECTION */}
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-lamaPurple">LearnWithFranny</span>
            </div>
            <div className="py-10">
              <h1 className="text-3xl font-bold text-lamaPurple mb-2">
                Sign Into Account
              </h1>
              <div className="border-2 w-10 border-lamaPurple inline-block mb-2"></div>
              {/* SOCIAL LOGIN */}
              <div className="flex justify-center my-2">
                <a
                  href="#"
                  className="border-2 border-gray-200 rounded-full p-3 mx-1"
                >
                  <FaFacebookF className="text-sm" />
                </a>
                <a
                  href="#"
                  className="border-2 border-gray-200 rounded-full p-3 mx-1"
                >
                  <FaLinkedinIn className="text-sm" />
                </a>
                <a
                  href="#"
                  className="border-2 border-gray-200 rounded-full p-3 mx-1"
                >
                  <FaGoogle className="text-sm" />
                </a>
              </div>
              <p className="text-gray-400">or use your email account</p>
              {/* ENTER INFORMATION */}
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaRegEnvelope className="text-gray-400 m-2" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="bg-gray-100 outline-none flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <MdLockOutline className="text-gray-400 m-2" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="bg-gray-100 outline-none flex-1"
                  />
                </div>
                {/* REMEMBER ME SECTION */}
                <div className="flex justify-between w-64 mb-5">
                  <label>
                    <input type="checkbox" name="remeber" className="mr-1" />
                    Remember me
                  </label>
                  <a href="#" className="text-xs">
                    Forgot Password?
                  </a>
                </div>
                <a
                  href="#"
                  className=" text-lamaPurple border-2 border-lamaPurple rounded-full px-12 py-2 inline-block font-semibold hover:bg-lamaPurple hover:text-white"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
          {/* SIGN UP SECTION */}
          <div className="w-2/5 bg-lamaPurple rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl text-white font-bold mb-2">
              Hello Studier!
            </h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">
              Fill up personal information and start the journey
            </p>
            <a
              href="#"
              className=" text-white border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-lamaPurple"
            >
              Register
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
