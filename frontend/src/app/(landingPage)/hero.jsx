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
];

const Hero = () => {
  return <div>Hero Section</div>;
};

export default Hero;
