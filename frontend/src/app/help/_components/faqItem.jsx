"use client";
import { useState } from "react";

export default function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between w-full text-left text-2xl font-medium p-5"
      >
        {question}
        {/* Button Toggle */}
        <span>{open ? "-" : "+"}</span>
      </button>
      {open && <p className="mt-5 text-xl text-gray-600">{answer}</p>}
    </div>
  );
}
