"use client";
// UserContext.js
import React, { createContext, useState, useContext } from "react";

// Create the context
const UserContext = createContext(null);

// Provide the context to the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the context
export const useUser = () => useContext(UserContext);
