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

  return (
    <>
      <div className="pt-20  xl:pt-24 flex justify-center items-center flex-col ">
        <div className="text-3xl w-3/4 xl:text-5xl font-medium xl:w-1/2 text-center">
          Join a global movement. Unleash your creativity.
        </div>
        <div className="py-4 px-10  xl:w-1/2 2xl:w-1/3 md:w-2/3 text-center">
          Our vibrant community produces content, teaches courses, and leads
          events all over the world.
        </div>
        <div className="text-sky-500 flex items-center hover:underline hover:cursor-pointer">
          Learn more <PiArrowRight className="ml-3 text-sm " />
        </div>
        <div className="grid grid-cols-12 md:row-span-2 gap-4 xl:gap-6 mt-8 px-8  md:px-16 xl:px-0 xl:w-3/4 2xl:w-[55%] mx-auto md:w-full">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`
              col-span-12
              ${
                index <= 2
                  ? "md:col-span-6 lg:col-span-4 bg-[#f6f5f4] p-6 rounded-xl flex"
                  : index <= 4
                  ? "md:col-span-6 bg-[#f6f5f4] p-6 rounded-xl flex"
                  : index === 5
                  ? " md:col-span-6  lg:col-span-8  lg:row-span-3    bg-[#f6f5f4] p-6 rounded-xl "
                  : index > 5
                  ? "col-span-12 lg:col-span-4  md:col-span-4 bg-[#f6f5f4] p-6 rounded-xl flex-col "
                  : "l"
              }
            `}
            >
              {index <= 2 ? (
                <div className="flex flex-col">
                  <div className=" text-5xl font-medium text-sky-600">
                    {tab.text}
                  </div>
                  <div className="text-sm">{tab.subtext}</div>
                </div>
              ) : index <= 4 ? (
                <div>
                  <div className="text-2xl font-medium">{tab.header}</div>
                  <div className="text-sm mt-2">{tab.subheading}</div>
                  <div className="flex justify-center items-center flex-col">
                    <Image
                      src={tab.image || ""}
                      width={1025}
                      height={500}
                      alt="logo"
                      className="w-full  rounded-xl p-10 xl:p-20"
                    />
                  </div>
                </div>
              ) : index === 5 ? (
                <>
                  {tab.images && (
                    <div className="flex justify-center items-center flex-col ">
                      <Image
                        src={tab.images[activeImageIndex].picture}
                        alt={`${tab.images[activeImageIndex].title} Image`}
                        width={1025}
                        height={500}
                        className="w-full rounded-xl "
                      />

                      <div>
                        <div className="text-xl font-medium mt-10 md:mt-0  pb-4">
                          {tab.images[activeImageIndex].title}
                        </div>
                      </div>

                      <div className="flex space-x-2 xl:space-x-6 xl:mt-10">
                        {tab.images.map((image, index) => (
                          <div
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`${
                              index === activeImageIndex
                                ? "p-2 rounded-full bg-green-400 "
                                : "  p-2 rounded-full bg-blue-400"
                            }  `}
                          ></div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                index > 5 && (
                  <>
                    <div className="flex  flex-col">
                      <Image
                        src={tab.profile || ""}
                        width={500}
                        height={500}
                        alt="logo"
                        className="w-10 h-10 rounded-full border p-1"
                      />
                    </div>
                    <div className="text-xl font-normal ">{tab.userName}</div>
                    <div className="text-sm font-normal ">{tab.userHandle}</div>
                    <div className="text-sm font-normal mt-10 md:mt-0  pb-4">
                      {tab.userText}
                    </div>
                  </>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserStatsSection;
