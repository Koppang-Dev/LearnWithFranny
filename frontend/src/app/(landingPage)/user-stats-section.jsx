"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { TbSwitch3 } from "react-icons/tb";
import { PiArrowRight } from "react-icons/pi";
import { Lora } from "next/font/google";

const font = Lora({
  subsets: ["latin"],
  weight: ["400"],
});

const tabs = [
  {
    text: "1M+",
    subtext: "Community Members",
  },
  {
    text: "100+",
    subtext: "Study Groups",
  },
  {
    text: "5M+",
    subtext: "Quizzes Made",
  },
  {
    header: "Customize the info you track",
    subheading:
      "Create quizzes and tests and share them with your friends. Includes every feature you could possibly need",
    image: "/assets/DumpingDoodle.svg",
  },
  {
    header: "Use the voice feature to auto-generate notes",
    subheading: "You can create quizzes or tests in any way you can think of",
    image: "/assets/DumpingDoodle.svg",
  },
  {
    icon: <TbSwitch3 className="text-3xl mr-2 text-sky-600 rounded-md" />,
    title: "Visualize, filter and sort any way you want",
    description: "Mark tasks for your study group and assign readings",

    //   Stopped at 4:12
  },
];

const UserStatsSection = () => {
  return <div></div>;
};

export default UserStatsSection;
