"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpenIcon,
  SparklesIcon,
  ClipboardDocumentListIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

const modes = [
  {
    title: "Feynman Technique",
    description:
      "Teach the concept back to Franny (your AI cat assistant) to reinforce understanding.",
    icon: LightBulbIcon,
    href: "/study/feynman",
  },
  {
    title: "Spaced Repetition",
    description:
      "Review flashcards intelligently based on your memory strength.",
    icon: SparklesIcon,
    href: "/flashcard/study",
  },
  {
    title: "Quiz Mode",
    description: "Test your knowledge with AI-generated quizzes.",
    icon: ClipboardDocumentListIcon,
    href: "/quiz",
  },
  {
    title: "Free Review",
    description: "Browse and review any deck freely without scheduling.",
    icon: BookOpenIcon,
    href: "/flashcard",
  },
];

export default function StudyPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🧠 Study Your Way</h1>
      <p className="text-gray-600 mb-10">
        Choose a learning technique that fits your mood or your goal today.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modes.map((mode) => (
          <Link key={mode.title} href={mode.href}>
            <div className="flex items-start gap-4 p-5 rounded-xl border hover:shadow-md transition bg-white cursor-pointer">
              <mode.icon className="h-8 w-8 text-blue-600 mt-1" />
              <div>
                <h2 className="text-lg font-semibold">{mode.title}</h2>
                <p className="text-sm text-gray-600">{mode.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
