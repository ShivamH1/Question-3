// This file exports a ContextProvider component and a useStateContext hook.
// The ContextProvider component is a wrapper component that provides state and
// functions to its child components through the React Context API.
// The useStateContext hook allows child components to access the state and
// functions provided by the ContextProvider component.

// Import necessary dependencies and components
import React, { createContext, useContext, useState } from "react";

// Create a new context using the createContext function
const StateContext = createContext();

// Define the ContextProvider component
export const ContextProvider = ({ children }) => {
  // Define state variables using the useState hook
  const [expenses, setExpenses] = useState([]); // State for expenses
  const [splitExpenses, setSplitExpenses] = useState([]); // State for split expenses
  const [toast, setToast] = useState({ // State for toast notifications
    show: false, // Indicates if the toast is visible
    desc: "", // Description of the toast
    type: "success", // Type of the toast (success, error, etc.)
  });

  // Define state variables using the useState hook and retrieve the values from localStorage
  const [loginUser, setLoginUser] = useState(() =>
    JSON.parse(localStorage.getItem("user")) // User login information
  );
  const [userSetting, setUserSetting] = useState(
    JSON.parse(localStorage.getItem("setting")) // User settings
  );

  // Define a function to set user settings and update localStorage
  const setUserSettingHandler = (arg) => {
    localStorage.setItem("setting", JSON.stringify(arg)); // Update localStorage with new user settings
    setUserSetting(arg); // Update the userSetting state variable
  };

  // Define a function to show toast notifications and hide them after a certain time
  const showToastHandler = (desc, type) => {
    setToast({ show: true, desc, type }); // Show toast with provided description and type
    setTimeout(() => {
      setToast({ show: false, desc: "", type: "success" }); // Hide toast after 3.5 seconds
    }, 3500);
  };

  // Render the ContextProvider component and provide the state and functions to its child components
  return (
    <StateContext.Provider
      value={{
        loginUser, // User login information
        setLoginUser, // Function to update user login information
        expenses, // Expenses state
        setExpenses, // Function to update expenses state
        userSetting, // User settings state
        setUserSettingHandler, // Function to update user settings
        setUserSetting, // Function to update user settings state
        toast, // Toast notifications state
        showToastHandler, // Function to show toast notifications
        splitExpenses, // Split expenses state
        setSplitExpenses, // Function to update split expenses state
      }}
    >
      {children} // Render child components
    </StateContext.Provider>
  );
};

// Define the useStateContext hook to access the state and functions provided by the ContextProvider component
export const useStateContext = () => useContext(StateContext);

