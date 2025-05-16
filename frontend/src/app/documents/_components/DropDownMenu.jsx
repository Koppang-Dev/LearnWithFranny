import React from "react";

const DropDownMenu = ({ actions }) => (
  <div className="z-50 absolute top-8 right-0 bg-white border shadow-md rounded-md w-40 pointer-events-auto">
    <ul className="list-none p-2">
      {actions.map((action, index) => (
        <li
          key={index}
          className="p-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700"
          onClick={action.onClick}
        >
          {action.label}
        </li>
      ))}
    </ul>
  </div>
);

export default DropDownMenu;
