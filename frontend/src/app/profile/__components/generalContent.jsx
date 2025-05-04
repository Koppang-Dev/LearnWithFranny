"use client";
import {
  updateProfileImage,
  updateDateFormat,
  updateName,
  updateUserEmail,
  updateUserUsername,
  updateUserLanguage,
  updateTimeZone,
  fetchGeneralData,
  getUserContext,
} from "@/app/utils/ProfileApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import EditableField from "./EditableField";
import toast from "react-hot-toast";

const GeneralContent = () => {
  // User information
  const { user } = useUser();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // All of the general content data
  const [generalData, setGeneralData] = useState(null);
  const [isAutomaticTimeZone, setAutomaticTimeZone] = useState(true);
  const [language, setLanguage] = useState("English (US)");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  // Conditionals
  const [error, settError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Saving all the users changes
  const handleSavePreferences = async () => {
    try {
      if (generalData.language !== language) {
        await updateUserLanguage({ language });
      }
      if (generalData.dateFormat !== dateFormat) {
        await updateDateFormat({ dateFormat });
      }
      if (generalData.isAutomaticTimeZone !== isAutomaticTimeZone) {
        await updateTimeZone({ timeZone: isAutomaticTimeZone });
      }

      toast.success("Preferences updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update preferences");
    }
  };
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
      toast.success("Profile image updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload profile picture");
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
        // Fetching user information and their general data
        const userData = await getUserContext();
        const data = await fetchGeneralData();

        console.log("User Data:", userData);

        setGeneralData(data);
        setName(userData.name || "");
        setUsername(userData.username || "");
        setEmail(userData.email || "");
        setProfilePictureUrl(
          userData.profilePictureUrl || "/images/avatar.png"
        );

        // Setting Preferences
        setAutomaticTimeZone(data.isAutomaticTimeZone || true);
        setLanguage(data.language || "English (US)");
        setDateFormat(data.dateFormat || DD / MM / YYYY);
      } catch (error) {
        console.log(error);
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
              width={200}
              height={200}
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

        {/* Name*/}
        <EditableField
          label="Name"
          value={name}
          onSave={async (newVal) => {
            await updateName(newVal);
            setName(newVal);
          }}
        />

        {/* Username */}
        <EditableField
          label="Username"
          value={username}
          onSave={async (newVal) => {
            await updateUserUsername(newVal);
            setUsername(newVal);
          }}
        />

        {/* Email */}
        <EditableField
          label="Email"
          value={email}
          onSave={async (newVal) => {
            await updateUserEmail(newVal);
            setEmail(newVal);
          }}
        />
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
              className={`w-11 h-6 rounded-full transition-colors ${
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

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSavePreferences}
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default GeneralContent;
