"use client";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGoogle,
  FaRegEnvelope,
} from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdLockOutline, MdVisibilityOff, MdVisibility } from "react-icons/md";
import React from "react";
import { useUser } from "../context/UserContext";
import { Result } from "postcss";

export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [requestError, setRequestError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();
  const { setUser } = useUser();

  // AbortController for cleanup
  useEffect(() => {
    const abortController = new AbortController();

    return () => {
      abortController.abort(); // Cancel the request if the component unmounts
    };
  }, []);

  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors({ ...errors, [name]: "" });
  }

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Form Validation
  function validateForm() {
    const newErrors = {};

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

  function handleSignupClicked() {
    router.push("/register");
  }
  async function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission

    // Stop form submission if errors occurred during form input
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setRequestError("");

    try {
      // Create a new AbortController for this request
      const abortController = new AbortController();

      // Send a POST request to the server with the user's credentials
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`,
        {
          method: "POST",
          body: JSON.stringify(state),
          headers: {
            "Content-Type": "application/json",
          },
          signal: abortController.signal,
        }
      );

      if (res.ok) {
        const response = await res.json();

        // Updating the user context
        setUser({
          email: response.email,
          username: response.username,
          name: response.name,
        });

        // Setting the local storage
        localStorage.setItem("email", state.email);

        // Redirect to the dashboard or home page after successful login
        router.push("/dashboard");
      } else {
        // Handle API errors (e.g., invalid credentials)
        const errorData = await res.json();
        setRequestError(errorData.message || "Login failed. Please try again.");
      }
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Request was aborted");
      } else {
        console.error("Login error:", err);
        setRequestError(
          "Failed to connect to the server. Please try again later."
        );
      }
    } finally {
      setLoading(false); // Stop loading
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
                Sign Into Account
              </h1>
              <div className="border-2 w-10 border-[#222A68] inline-block mb-2"></div>
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
              <p className="text-gray-400">or use your email to log in</p>
              {/* ENTER INFORMATION */}
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaRegEnvelope className="text-gray-400 m-2" />
                  <input
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="bg-gray-100 outline-none flex-1"
                    disabled={loading} // Disable input while loading
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
                    disabled={loading} // Disable input while loading
                  />
                  <button
                    type="button"
                    onClick={handleTogglePasswordVisibility}
                    className="ml-2 text-gray-400"
                    disabled={loading} // Disable button while loading
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
                      className="mr-1"
                      onChange={handleChange}
                      disabled={loading}
                    />
                    Remember me
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-blue-500 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="text-[#222A68] border-2 border-[#222A68] rounded-full px-12 py-2 inline-block font-semibold hover:bg-[#222A68] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </div>
          </div>
          {/* SIGN UP SECTION */}
          <div className="w-2/5 bg-[#222A68] rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl text-white font-bold mb-2">
              Welcome, Future Studier!
            </h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10 text-white">
              Create an account to unlock personalized learning tools and start
              your journey today.
            </p>
            <button
              onClick={handleSignupClicked}
              className="text-white border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-[#222A68]"
            >
              Sign Up Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
