
// Import the necessary dependencies and components
import React, { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";

// Define the SummaryChart component
const SummaryChart = () => {

  // Destructure the expenses and userSetting variables from the useStateContext hook
  const { expenses, userSetting } = useStateContext();

  // Initialize the state variable spent with an initial value of 0
  const [spent, setSpent] = useState(0);

  // useEffect hook to calculate the total spent amount
  useEffect(() => {

    // Initialize the sum variable with an initial value of 0
    let sum = 0;

    // Iterate over each expense in the expenses array
    expenses.forEach((e) => {

      // Add the amount of the expense to the sum variable
      sum += e.amount;
    });

    // Set the spent state variable with the calculated sum
    setSpent(sum);

    // Specify the dependencies for the useEffect hook
  }, [expenses, userSetting]);

  // Render the SummaryChart component
  return (

    // Wrap the component in a div element
    <div>

      {/* Render a radial progress bar with dynamic styles */}
      <div
        className="radial-progress text-secondary"
        style={{

          // Set the value of the radial progress bar based on the spent amount and userSetting.budget
          "--value": (spent / userSetting.budget) * 100,

          // Set the size of the radial progress bar
          "--size": "12rem",

          // Set the thickness of the radial progress bar
          "--thickness": "15px",
        }}
      >

        {/* Display the percentage of spent amount */}
        {`${((spent / userSetting.budget) * 100).toFixed(2)}% spent`}
      </div>

      {/* Render a div element with text centered and in bold font */}
      <div className="text-center mt-4 font-bold">

        {/* Render two headings with the total spent amount and remaining amount */}
        <h2>{`Total Spent: ${spent}`}</h2>
        <h2>{`Amount remaining: ${userSetting.budget - spent}`}</h2>
      </div>
    </div>
  );
};

// Export the SummaryChart component
export default SummaryChart;

