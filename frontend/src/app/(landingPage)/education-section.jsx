import Image from "next/image";
import React from "react";

import { Lora } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Lora({
  subsets: ["latin"],
  weight: ["400"],
});

const logos = [
  "/images/duke.png",
  "/images/harvard.png",
  "/images/mit.png",
  "/images/texasa&m.png",
  "/images/ubc.svg",
  "/images/uofc.png",
  "/images/uoft.png",
];

const EducationCarousel = () => {
  const logosArray = logos; // Store the original logos array

  // Create a function to generate an array of logos with infinite repetition
  const generateInfiniteLogos = () => {
    const infiniteLogos = [];
    for (let i = 0; i < 3; i++) {
      infiniteLogos.push(...logosArray);
    }
    return infiniteLogos;
  };

  const infiniteLogos = generateInfiniteLogos();

  return (
    <div className="overflow-hidden w-full py-10 bg-white-50">
      {/* Infinite Scrolling Wrapper */}
      <div
        className="flex items-center space-x-6 animate-scroll gap-6"
        style={{ animationIterationCount: "infinite" }}
      >
        {infiniteLogos.map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-32 h-32 xl:w-40 xl:h-40 relative mx-4"
          >
            <Image
              src={logo}
              alt={`Logo ${index + 1}`}
              layout="fill"
              objectFit="contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const EducationSection = () => {
  return (
    <div className="xl:pt-32 pt-24 relative flex justify-center items-center flex-col">
      <div className="xl:text-5xl text-3xl 2xl:w-3/5 w-3/5 font-medium xl:w-1/3 mx-auto text-center">
        Transform the way you study. Simplify learning.
      </div>

      <EducationCarousel />

      <div
        className={cn(
          "flex items-center justify-center text-xl xl:text-2xl pt-10 pb-4 xl:py-10 px-8 text-center w-4/5",
          font.className
        )}
      >
        &quot;With Learn With Franny, I combined all my scattered notes and
        flashcards into one powerful tool. My grades improved instantly!&quot;
      </div>

      <div className="items-center flex justify-center flex-col">
        <Image
          src="/assets/meditatingDoodle.svg"
          alt="logo"
          width={200} // Adjust this value to your desired width
          height={200} // Adjust this value to maintain the aspect ratio
          className="pt-2 xl:pt-5 w-40 xl:w-80" // Tailwind classes for width control
        />

        <div className="text-center">
          <div className="text-sm font-medium pt-4">Alex Johnson Hernandez</div>
          <div className="text-sm">Graduate Student, Computer Science</div>
        </div>
      </div>
    </div>
  );
};

export default EducationSection;
