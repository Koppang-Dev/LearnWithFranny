import React from "react";

const DropDownMenu = ({ actions }) => (
  <div className="absolute top-8 right-0 bg-white border shadow-md rounded-md w-40">
    <ul className="list-none p-2">
      {actions.map((action, index) => (
        <li
          key={index}
          className="p-2 cursor-pointer hover:bg-gray-200"
          onClick={action.onClick}
        >
          {action.label}
        </li>
      ))}
    </ul>
  </div>
);

export default DropDownMenu;
