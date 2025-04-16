"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "../utils/ProfileApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    setLoading(true);

    try {
      const result = await resetPassword(email);

      // ✅ Success message from backend or a default
      setMessage(result.message || "A reset link has been sent to your email.");
    } catch (err) {
      console.error("Forgot password error:", err);
      setError("Failed to send reset email. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        <p className="text-sm text-gray-500 mb-6">
          Enter your email and we'll send you a reset link.
        </p>

        {message && (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#222A68] text-white py-2 rounded hover:bg-[#1a1a5a] transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <button
          onClick={() => router.push("/login")}
          className="text-sm text-blue-500 mt-4 hover:underline"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
