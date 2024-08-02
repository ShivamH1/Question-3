
// Import the necessary dependencies
import React from "react";
import { useStateContext } from "../contexts/ContextProvider";

// Define a functional component called Toast
const Toast = () => {
  // Destructure the toast object from the state context
  const { toast } = useStateContext();

  // Return the JSX code for the toast component based on the value of the show property in the toast object
  return toast.show ? (
    // If the show property is true, render the toast
    <div className="toast toast-top toast-end z-[1500]">
      {/* Add the appropriate class names for the toast */}
      <div
        className={`alert alert-${toast.type} shadow-lg text-white font-bold`}
      >
        {/* Add the appropriate class names for the alert */}
        <div>
          {/* Render the appropriate SVG icon based on the value of the type property in the toast object */}
          {toast.type === "success" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          {toast.type === "error" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          {toast.type === "warning" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          )}
          {/* Render the description of the toast */}
          <span>{toast.desc}</span>
        </div>
      </div>
    </div>
  ) : (
    // If the show property is false, render an empty div
    <div />
  );
};

// Export the Toast component as the default export
export default Toast;

