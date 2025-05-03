"use client";
import { sendContactMessage } from "@/app/utils/ContactApi";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendContactMessage(formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.log(err);
      setStatus("error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="w-full  p-20 flex items-center justify-center bg-white-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Contact Us
        </h2>

        {status === "success" && (
          <div className="text-green-600 text-center text-sm">
            Your message has been sent!
          </div>
        )}

        {status === "error" && (
          <div className="text-red-600 text-center text-sm">
            Something went wrong. Please try again!
          </div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          name="message"
          placeholder="Please type your message"
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded w-full h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white font-medium px-6 py-3 rounded hover:bg-blue-700 transition duration-200"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
