import {
  updateProfileImage,
  updateDateFormat,
  updateName,
  updateUserLanguage,
  updateUserUsername,
  updateTimeZone,
  fetchGeneralData,
} from "@/app/utils/ProfileApi";
import Image from "next/image";
import { useEffect, useState } from "react";

const GeneralContent = () => {
  // All of the general content data
  const [generalData, setGeneralData] = useState(null);

  // Time zone useState
  const [isAutomaticTimeZone, setAutomaticTimeZone] = useState(true);

  // Language Preference
  const [language, setLanguage] = useState("English (US)");

  // Date format
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");

  // Users profile picture
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  // Errors
  const [error, settError] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Changing the users profile picture
  const handleProfileImageUpload = async (event) => {
    // Getting the file
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    // Calling backend to change profile image
    try {
      const newProfilePictureUrl = await updateProfileImage(file);
      setProfilePictureUrl(newProfilePictureUrl);
      alert("Profile image updated successfully");
    } catch (error) {
      alert("Failed to upload profile picture");
    }
  };
  // Toggle time zone on/off
  const toggleTimeZone = () => {
    setAutomaticTimeZone(!isAutomaticTimeZone);
  };

  // Handling language preference
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  // Handling data format change
  const handleDateFormatChange = (event) => {
    setDateFormat(event.target.value);
  };

  // Fetching the General Content from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGeneralData();
        setGeneralData(data);

        // Populating states with the fetched data
        setAutomaticTimeZone(data.isAutomaticTimeZone || true);
        setLanguage(data.language || "English (US)");
        setDateFormat(data.dateFormat || DD / MM / YYYY);
        setProfilePictureUrl(data.profilePictureUrl);
      } catch (error) {
        settError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handling loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handling Errors
  if (error) {
    return (
      <div>
        {error}
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Basics Section */}
      <div className="flex flex-col gap-8">
        <h1 className="text-xl font-bold text-black">Basics</h1>

        {/* Photo Section */}
        <div className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200 ">
          <h2 className="text-lg font-semibold text-black">Photo</h2>
          <div className="flex justify-start">
            <Image
              src={profilePictureUrl || "/images/avatar.png"}
              alt="ProfileImage"
              width={75}
              height={75}
              className="border rounded-full p-2"
            />
          </div>
          <div className="flex justify-end items-center">
            <label className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-purple-400 hover:text-black transition-colors w-20">
              Edit
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Name Section */}
        <div className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200 ">
          <h2 className="text-lg font-semibold text-black">Name</h2>
          <h2 className="text-lg f text-black">{generalData?.name || "N/A"}</h2>
          <div className="flex justify-end items-center">
            <button className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-purple-400 hover:text-black transition-colors w-20">
              Edit
            </button>
          </div>
        </div>

        {/* Username Section */}
        <div className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200 ">
          <h2 className="text-lg font-semibold text-black">Username</h2>
          <h2 className="text-lg f text-black">
            {generalData?.username || "N/A"}
          </h2>
          <div className="flex justify-end items-center">
            <button className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-purple-400 hover:text-black transition-colors w-20">
              Edit
            </button>
          </div>
        </div>

        {/* Email Address Section */}
        <div className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200 ">
          <h2 className="text-lg font-semibold text-black">Email</h2>
          <h2 className="text-lg text-black">{generalData?.email || "N/A"}</h2>
          <div className="flex justify-end items-center">
            <button className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-purple-400 hover:text-black transition-colors w-20">
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="flex flex-col gap-5 pt-3 border-t border-gray-200 ">
        <h1 className="text-xl font-bold text-black">Preferences</h1>

        {/* Time Zone Section */}
        <div className="grid grid-cols-3 items-center gap-4 pt-10 border-t border-gray-200 ">
          <h2 className="text-lg font-semibold text-black">
            Automatic Time Zone
          </h2>
          {/* Switch */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isAutomaticTimeZone}
              onChange={toggleTimeZone}
              className="sr-only"
            />
            <div
              className={`w-11 h-6 bg-gray-200 rounded-full transition-colors ${
                isAutomaticTimeZone ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${
                  isAutomaticTimeZone ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </label>
        </div>

        {/* Language Preferences Section */}
        <div className="grid grid-cols-3 items-center gap-4 pt-10 border-t border-gray-200 ">
          <h2 className="text-lg font-semibold text-black">
            Language Preference
          </h2>
          {/* Dropdown */}
          <select
            value={language}
            onChange={handleLanguageChange}
            className="px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="English UK">English (UK)</option>
            <option value="English US">English (US)</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>

        {/* Date Format Section */}
        <div className="grid grid-cols-3 items-center gap-4 pt-10 border-t border-gray-200 ">
          <h2 className="text-lg font-semibold text-black">Date Format</h2>
          {/* Dropdown */}
          <select
            value={dateFormat}
            onChange={handleDateFormatChange}
            className="px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY/MM/DD">YYYY/MM/DD</option>
            <option value="YYYY/DD/MM">YYYY/DD/MM</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default GeneralContent;
