"use client";

import { useRouter } from "next/navigation";

export default function DeckOptionButton({ label, path, color, icon }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(path)}
      className={`flex items-center gap-4 justify-center px-10 py-6 text-xl font-medium text-white ${color} rounded-xl shadow-md hover:brightness-110 transition duration-300`}
    >
      {icon}
      {label}
    </button>
  );
}
