import React, { useState } from "react";
import Image from "next/image";
import { FaEllipsisV } from "react-icons/fa";
import DropdownMenu from "./DropdownMenu";

const FileCard = ({ file }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDelete = async () => {
    // Add delete file logic here
    console.log(`Deleting file: ${file.fileName}`);
  };

  return (
    <div
      className="relative flex p-5 shadow-md rounded-md flex-col items-center justify-center border cursor-pointer hover:scale-105 transition-all"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <Image src="/images/pdf-file.png" alt="" width={50} height={50} />
      <div className="absolute top-2 right-2">
        <FaEllipsisV
          className="cursor-pointer"
          onClick={() => setShowDropdown((prev) => !prev)}
        />
      </div>
      {showDropdown && (
        <DropdownMenu
          actions={[
            { label: "Rename", onClick: () => console.log("Rename clicked") },
            { label: "Delete", onClick: handleDelete },
            { label: "Share", onClick: () => console.log("Share clicked") },
          ]}
        />
      )}
      <h2 className="mt-3 font-medium text-xl">{file.fileName}</h2>
    </div>
  );
};

export default FileCard;
