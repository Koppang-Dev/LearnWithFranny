"use client";
import { Button } from "@/components/navbar/_components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import {
  PiArrowRight,
  PiBookOpenTextLight,
  PiFileThin,
  PiSparkleLight,
  PiTargetLight,
} from "react-icons/pi";

// Icon Images
const tabs = [
  {
    icon: (
      <PiSparkleLight className="text-3xl mr-2 text-purple-600 bg-purple-100 rounded-full p-1" />
    ),
    name: "AI",
    feature: "Now with Voice",
    description: "Build notes and tests with AI",
    LearnMore: (
      <div className="text-purple-600 flex items-center">
        Learn More <PiArrowRight className="text-sm ml-1" />
      </div>
    ),
    image: "/assets/GroovyDoodle.svg",
  },
  {
    icon: (
      <PiBookOpenTextLight className="text-3xl mr-2 text-red-600 bg-red-100 rounded-full p-1" />
    ),
    name: "Quizzes",
    description: "Test yourself with built in Anki templates",
    LearnMore: (
      <div className="text-purple-600 flex items-center">
        Learn More <PiArrowRight className="text-sm ml-1" />
      </div>
    ),
    image: "/assets/PlantDoodle.svg",
  },
  {
    icon: (
      <PiSparkleLight className="text-3xl mr-2 text-blue-600 bg-blue-100 rounded-full p-1" />
    ),
    name: "Docs",
    description:
      "Use the file-share system to have all of your notes in one place",
    LearnMore: (
      <div className="text-blue-600 flex items-center">
        Learn More <PiArrowRight className="text-sm ml-1" />
      </div>
    ),
    image: "/assets/CoffeeDoddle.svg",
  },
  {
    icon: (
      <PiSparkleLight className="text-3xl mr-2 text-yellow-600 bg-yellow-100 rounded-full p-1" />
    ),
    name: "Fenman",
    description: "Use study techniques such as fenyman",
    LearnMore: (
      <div className="text-yellow-600 flex items-center">
        Learn More <PiArrowRight className="text-sm ml-1" />
      </div>
    ),
    image: "/assets/FloatDoodle.svg",
  },
];

const Hero = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Conditionally render screens
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="md:items-center flex flex-col">
      <div className="font-medium 2xl:w-1/3 md:w-2/3 xl:w-1/2 lg:px-0 px-8 xl:text-6xl flex justify-center xl:pt-14 text-center pt-6">
        Write, plan, share. <br /> With AI at your side
      </div>
      <p className="text-2xl pt-4 text-center w-2/3 mx-auto">
        LearnWithFranny is the Note AI assistance app to improve study habbits
        and proven to increase grades.
      </p>
      <div className="flex gap-4 pt-6 items-center justify-center">
        <Link href={"/"}>
          <Button className="py-1">
            <div className="flex items-center justify-center">
              <div className="text-lg">Get Franny's Techniques for free</div>
              <div>
                <PiArrowRight className="ml-2" />
              </div>
            </div>
          </Button>
        </Link>
      </div>

      <div className="pt-10 xl:pt-20 items-center justify-center">
        <Image
          src={"/assets/ReadingSideDoodle.svg"}
          alt="Hero"
          width={1000}
          height={1000}
          className="flex items-center justify-center mx-auto w-60 xl:w-80"
        />
      </div>

      {isSmallScreen ? (
        <div className="px-8">
          <div className="grid grid-cols-4 md:row-span-1 gap-4 xl:gap-6 mt-8 xl:px-0">
            {tabs.map((tab) => {
              return (
                <motion.div
                  key={tab.name}
                  className={`
                          flex p-1 md:p-8 cursor-pointer
                           
                          ${
                            activeTab.name === tab.name
                              ? "rounded-md md:rounded-xl bg-[#f6f5f4] md:bg-white border-gray-200 md:border items-center justify-center flex p-1"
                              : "md:bg-[#f6f5f4] rounded-md xl:rounded-xl p-1 items-center justify-center hover:bg-[#eae7ec]"
                          }`}
                  onClick={() => setActiveTab(tab)}
                >
                  <div className="flex flex-col items-center md:justify-center mx-auto">
                    <div className="hidden md:flex text-4xl">{tab.icon}</div>
                    <div className="font-medium text-sm xl:text-lg mt-1">
                      {tab.name}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Content based on which tab is active */}
          <div className="pt-6 md:py-10 lg:px-16 xl:px-0 w-full">
            {activeTab && (
              <div className="flex justify-center items-center flex-col">
                <Image
                  src={activeTab.image}
                  alt="hero"
                  width={1000}
                  height={1000}
                  className="w-full
                  border p-20 xl:p-40 rounded-xl"
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Hero;
