
// Importing necessary dependencies
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

// Defining the Header component
const Header = () => {
  // Getting the navigate function from react-router-dom
  const navigate = useNavigate();

  // Destructuring necessary functions from the state context
  const { loginUser, setLoginUser, setUserSetting, showToastHandler } =
    useStateContext();

  // Defining the logoutHandler function
  const logoutHandler = () => {
    // Removing user and setting data from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("setting");

    // Resetting the loginUser and userSetting in the state context
    setLoginUser("");
    setUserSetting("");

    // Showing a toast notification for logout success
    showToastHandler("Logout successful", "success");

    // Navigating to the login page
    navigate("/login");
  };

  // Rendering the Header component
  return (
    // Defining the navbar
    <div className="navbar bg-base-100 py-4 sticky top-0 backdrop-blur bg-opacity-50 z-50">
      {/* Defining the navbar start */}
      <div className="navbar-start">
        {/* Defining the dropdown */}
        <div className="dropdown">
          {/* Defining the dropdown toggle button */}
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            {/* Defining the dropdown toggle button icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {/* Defining the dropdown toggle button icon path */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>

          {/* Conditionally rendering the dropdown menu */}
          {loginUser && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow-2xl bg-base-100 rounded-box w-52 gap-4"
            >
              {/* Defining the settings link */}
              <li>
                <Link
                  to="/settings"
                  className="btn btn-outline btn-secondary"
                >
                  Settings
                </Link>
              </li>

              {/* Defining the logout button */}
              <li>
                <button
                  className="btn btn-outline btn-primary"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>

        {/* Defining the Expense Tracker link */}
        <Link to="/" className="btn glass normal-case sm:text-xl">
          Expense Tracker
        </Link>
      </div>

      {/* Defining the navbar center */}
      <div className="navbar-center hidden lg:flex">
        {/* Conditionally rendering the settings and logout links */}
        {loginUser && (
          <ul className="menu menu-horizontal px-1 gap-3">
            {/* Defining the settings link */}
            <li>
              <Link
                to="/settings"
                className="btn btn-outline btn-secondary"
              >
                Settings
              </Link>
            </li>

            {/* Defining the logout button */}
            <li>
              <button
                className="btn btn-outline btn-primary"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>

      {/* Defining the navbar end */}
      <div className="navbar-end">
        {/* Defining the welcome message */}
        <div className="btn btn-ghost normal-case sm:text-xl text-accent">
          {loginUser
            ? `Welcome ${loginUser.name.replace(/ .*/, "")}`
            : "Hello there"}
        </div>
      </div>
    </div>
  );
};

// Exporting the Header component
export default Header;

