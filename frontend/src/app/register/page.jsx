"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGoogle,
  FaRegEnvelope,
} from "react-icons/fa";
import Link from "next/link";
import { IoPersonCircle } from "react-icons/io5";
import React from "react";
import { useUser } from "../context/UserContext";
import { MdLockOutline, MdVisibilityOff, MdVisibility } from "react-icons/md";

// SignIn component handles user login
export default function Register() {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [requestError, setRequestError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setUser } = useUser();
  const router = useRouter();

  // Updates state with form input values
  function handleChange(e) {
    const copy = { ...state };
    copy[e.target.name] = e.target.value;
    setState(copy);
  }

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Form Validation
  function validateForm() {
    const newErrors = {};

    // Username is empty
    if (!state.username.trim()) {
      newErrors.username = "Username is required.";
    }

    // Email is empty or not a valid email
    if (!state.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(state.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password is empty or too short
    if (!state.password.trim()) {
      newErrors.password = "Password is required";
    } else if (state.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Setting the possible errors
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleLoginClicked() {
    router.push("/login");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Stop form submission if errors occured during form input
    if (!validateForm()) {
      setRequestError("Form is wrong");
    }

    console.log("Clicked Sign up");

    try {
      // Send a POST request to the server with the user's credentials
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
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
        const response = await res.text();
        console.log(response);

        // Updating the user context
        setUser({
          username: state.username,
          email: state.email,
          token: response.token,
        });

        // Setting the local storage
        localStorage.setItem("token", response.token); // Store the token
        localStorage.setItem("username", state.username); // Store the username
        localStorage.setItem("email", state.email); // Store the email

        router.push("/dashboard");
      } else {
        // Extract error
        const errorData = await res.json();
        setRequestError(errorData.message || "An unexpected error occured");
      }
    } catch (err) {
      console.log("Signup Error", err);
      setRequestError(
        "Failed to connect to the server. Please try again later."
      );
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-7xl justify-between">
          {/* SIGN IN SECTION */}
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <Link href="/">
                <span className="text-[#444054]">LearnWithFranny</span>
              </Link>
            </div>
            <div className="py-10">
              <h1 className="text-3xl font-bold text-[#444054] mb-2">
                Create Account
              </h1>
              <div className="border-2 w-20 border-[#222A68] inline-block mb-2"></div>
              {/* Display the error message */}
              {requestError && (
                <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
                  {requestError}
                </div>
              )}
              {/* SOCIAL LOGIN */}
              <div className="flex justify-center my-2">
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/facebook`}
                  className="border-2 border-gray-200 rounded-full p-3 mx-1"
                >
                  <FaFacebookF className="text-sm" />
                </a>
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/linkedin`}
                  className="border-2 border-gray-200 rounded-full p-3 mx-1"
                >
                  <FaLinkedinIn className="text-sm" />
                </a>
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`}
                  className="border-2 border-gray-200 rounded-full p-3 mx-1"
                >
                  <FaGoogle className="text-sm" />
                </a>
              </div>
              <p className="text-gray-400">or create account with your email</p>
              {/* ENTER INFORMATION */}
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <IoPersonCircle accumulate="" className="text-gray-400 m-2" />
                  <input
                    type="username"
                    name="username"
                    value={state.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="bg-gray-100 outline-none flex-1"
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-sm mb-2">{errors.username}</p>
                )}
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaRegEnvelope className="text-gray-400 m-2" />
                  <input
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="bg-gray-100 outline-none flex-1"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mb-2">{errors.email}</p>
                )}
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <MdLockOutline className="text-gray-400 m-2" />
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="bg-gray-100 outline-none flex-1"
                  />
                  <button
                    type="button"
                    onClick={handleTogglePasswordVisibility}
                    className="ml-2 text-gray-400"
                  >
                    {passwordVisible ? (
                      <MdVisibilityOff className="text-xl" />
                    ) : (
                      <MdVisibility className="text-xl" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mb-2">{errors.password}</p>
                )}
                {/* REMEMBER ME SECTION */}
                <div className="flex justify-between w-64 mb-5">
                  <label>
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={state.rememberMe}
                      onChange={(e) =>
                        setState({ ...state, rememberMe: e.target.checked })
                      }
                      className="mr-1"
                    />
                    Remember me
                  </label>
                </div>
                <button
                  onClick={handleSubmit}
                  className=" text-[#222A68] border-2 border-[#222A68] rounded-full px-12 py-2 inline-block font-semibold hover:bg-[#222A68] hover:text-white"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
          {/* SIGN UP SECTION */}
          <div className="w-2/5 bg-[#222A68] rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl text-white font-bold mb-2">
              Welcome Back, Studier!
            </h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="text-white mb-10">
              Already have an account? Log in and continue your learning
              journey.
            </p>
            <button
              onClick={handleLoginClicked}
              className=" text-white border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-[#222A68]"
            >
              Log In
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
