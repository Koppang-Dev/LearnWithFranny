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
    description: "Have all your files in one place",
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
        <Link href={"/register"}>
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
        // Tab images for large and normal screens
        <div className="flex xl:space-x-4 items-center justify-between hover:cursor-pointer gap-4 w-4/5 xl:w-3/4 2xl:w-[55%]">
          {tabs.map((tab) => (
            <motion.div
              key={tab.name}
              className={`
              xl:flex
              justify-center
              space-x-4
              xl:pt-4
              sm:my-10
              xl:my-0
              w-60
              h-36

                ${
                  activeTab === tab
                    ? "border rounded-xl pt-2 bg-white"
                    : "shadow-md rounded-xl pt-2 bg-[#f6f5f4]"
                }`}
              onMouseEnter={() => setActiveTab(tab)}
            >
              <div className="px-4">
                <div className="flex items-center">
                  <div>{tab.icon}</div>
                  <div className="text-2xl font-medium">{tab.name}</div>
                  {/* Render The Feature tag only for the AI Tab */}
                  {tab.name === "AI" && (
                    <div className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full ml-2">
                      {tab.feature}
                    </div>
                  )}
                </div>
                <motion.div
                  className="flex flex-col text-sm"
                  initial={{ y: 0 }}
                  animate={{ y: activeTab === tab ? 10 : 25 }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <motion.div
                      inital={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {tab.description}
                    </motion.div>
                  </div>

                  {/* Conditionally Render the Learn More */}
                  {activeTab === tab && (
                    <div className="text-sm mt-2">{tab.LearnMore}</div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      {/* Conditionally render content based on medium screen and bigger */}
      <div className="hidden md:flex py-10 px-8 md:px-0 lg:w-3/4 2xl:w-[55%]">
        {activeTab && (
          <div className="md:flex items-center justify-center space-x-6 hover:cursor-pointer w-full">
            <Image
              src={activeTab.image}
              alt="hero"
              width={500}
              height={500}
              className="
           w-full
           p-20
           xl:p-40
           shadow-md
           rounded-xl
           bg-[#f6f5f4]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
