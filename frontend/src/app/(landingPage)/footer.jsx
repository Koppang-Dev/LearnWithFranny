import Image from "next/image";
import {
  PiFacebookLogoFill,
  PiInstagramLogo,
  PiInstagramLogoFill,
  PiLinkedinLogoFill,
  PiTwitterLogoFill,
  PiYoutubeLogoFill,
} from "react-icons/pi";

const Footer = () => {
  return (
    <div className=" flex lg:items-center pb-10 flex-col px-8 lg:px-0 xl:w-3/4 mx-auto 2xl:w-[55%] ">
      <div className="lg:flex  lg:space-x-32 md:px-0 ">
        <div className="pt-4">
          <Image
            src="/images/logo.png"
            width={1025}
            height={500}
            alt="logo"
            className=" w-28 "
          />
          <p className="text-sm text-gray-600 mt-2">
            Your ultimate AI-powered learning assistant.
          </p>
          <div className="flex  space-x-2">
            <PiInstagramLogoFill className="text-2xl text-gray-500" />
            <PiTwitterLogoFill className="text-2xl text-gray-500" />
            <PiFacebookLogoFill className="text-2xl text-gray-500" />
            <PiYoutubeLogoFill className="text-2xl text-gray-500" />
            <PiLinkedinLogoFill className="text-2xl text-gray-500" />
          </div>
        </div>

        {/* Product Selection */}
        <div className="flex-col space-y-6 ">
          <div className="pt-10 font-medium">PRODUCT</div>
          <ul className="font-light space-y-4 text-sm">
            <li className="cursor-pointer hover:text-gray-700 transition">
              Dashboard
            </li>
            <li className="cursor-pointer hover:text-gray-700 transition">
              Study Tools
            </li>
            <li className="cursor-pointer hover:text-gray-700 transition">
              AI Quiz Generator
            </li>
            <li className="cursor-pointer hover:text-gray-700 transition">
              Flashcards
            </li>
            <li className="cursor-pointer hover:text-gray-700 transition">
              Progress Tracking
            </li>
          </ul>
        </div>

        {/* Feature Section */}
        <div className="flex-col space-y-6 flex ">
          <div className="pt-10 font-medium">FEATURES</div>
          <ul className="font-light space-y-4 text-sm">
            <li className="cursor-pointer hover:text-gray-700 transition">
              Note Organization
            </li>
            <li className="cursor-pointer hover:text-gray-700 transition">
              AI Recommendations
            </li>
            <li className="cursor-pointer hover:text-gray-700 transition">
              Collaborative Workspaces
            </li>
            <li className="cursor-pointer hover:text-gray-700 transition">
              Time Management
            </li>
            <li className="cursor-pointer hover:text-gray-700 transition">
              Gamified Learning
            </li>
          </ul>
        </div>

        {/* Education Section  */}
        <div className="flex-col space-y-6 flex ">
          <div className="pt-10 font-medium">FOR LEARNERS</div>
          <ul className="font-light space-y-4 text-sm">
            <li className="cursor-pointer hover:text-gray-700 transition">
              Study Techniques
            </li>
            <li className="cursor-pointer hover:text-gray-700 transition">
              Boost Memory Retention
            </li>
            <li className="cursor-pointer hover:text-gray-700 transition">
              Build Effective Habits
            </li>
            <li className="cursor-pointer hover:text-gray-700 transition">
              Personalized Learning
            </li>
            <li className="cursor-pointer hover:text-gray-700 transition">
              Master Complex Concepts
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
