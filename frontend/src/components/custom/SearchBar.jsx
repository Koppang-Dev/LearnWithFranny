import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search Documents"
      className="w-1/3 max-w-full py-2 pl-2 border border-black rounded-lg shadow-md focus:outline-1 focus:first-letter focus:ring-red-500 font-medium text-lg"
    />
  );
};

export default SearchBar;
