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
    images: [
      {
        title: "Record Lectures and Transform them into notes",
        picture: "/assets/DogJumpDoodle.svg",
      },
      {
        title: "Share Notes and Folders with your friends",
        picture: "/assets/DoogieDoodle.svg",
      },
      {
        title:
          "Use various different study methods to achieve the grade you deserve",
        picture: "/assets/FloatDoodle.svg",
      },
    ],
  },
  {
    profile: "assets/DoogieDoodle.svg",
    userName: "Carlos Hernandez",
    userHandle: "@carlos",
    userText: (
      <div className="md:mt-6">
        <span className="text-sky-500">@LearnWithFranny</span>
        it is definitely the best tool I have ever used
      </div>
    ),
  },
  {
    profile: "assets/DoogieDoodle.svg",
    userName: "John Wright",
    userHandle: "@jwright",
    userText: (
      <div className="md:mt-6">
        <span className="text-sky-500">@LearnWithFranny</span>
        It helped sooo much with studying!
      </div>
    ),
  },
  {
    profile: "assets/DoogieDoodle.svg",
    userName: "Makayla Palmer",
    userHandle: "@Makalayaya",
    userText: (
      <div className="md:mt-6">
        <span className="text-sky-500">@LearnWithFranny</span>
        It saved me contless hours having all of this into one!
      </div>
    ),
  },
];

const UserStatsSection = () => {
  const ref = useRef(null);

  // Setting Active Image
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const handleDotClick = (index) => {
    setActiveImageIndex(index);
  };

  return <div></div>;
};

export default UserStatsSection;
