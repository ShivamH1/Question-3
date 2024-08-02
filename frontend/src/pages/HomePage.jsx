
// Importing necessary React and other dependencies
import React, { useEffect } from "react";

// Importing components from the '../components' directory
import AddNew from "../components/AddNew";
import SummaryChart from "../components/SummaryChart";
import ExpenseTable from "../components/ExpenseTable";

// Importing the 'useStateContext' custom hook from the '../contexts/ContextProvider' file
import { useStateContext } from "../contexts/ContextProvider";

// Importing axios for making HTTP requests
import axios from "axios";

// The HomePage component is the main component for the home page
const HomePage = () => {
  // Using the 'useStateContext' custom hook to get the necessary states and functions
  const { loginUser, setExpenses, setSplitExpenses } = useStateContext();

  // The 'getAllExpenses' function is used to fetch all the expenses for the logged in user
  const getAllExpenses = async () => {
    try {
      // Getting the user id from the logged in user's email
      const userid = loginUser.email;

      // Making a POST request to the '/api/v1/expenses/get-expense' endpoint with the user id to get the expenses
      const res1 = await axios.post("/api/v1/expenses/get-expense", {
        userid,
      });

      // Making a POST request to the '/api/v1/expenses/get-split-expense' endpoint with the user id to get the split expenses
      const res2 = await axios.post("/api/v1/expenses/get-split-expense", {
        userid,
      });

      // Setting the fetched expenses using the 'setExpenses' function from the 'useStateContext' custom hook
      setExpenses(res1.data);

      // Setting the fetched split expenses using the 'setSplitExpenses' function from the 'useStateContext' custom hook
      setSplitExpenses(res2.data);

      // console.log(res.data)
    } catch (error) {
      // Displaying an alert if fetching expenses fails
      alert("Fetching expenses failed");

      // Logging the error to the console for debugging purposes
      console.log(error);
    }
  };

  // Using the 'useEffect' hook to call the 'getAllExpenses' function when the component mounts
  useEffect(() => {
    getAllExpenses();
  }, []);

  // Returning the JSX for the home page
  return (
    <div className="p-8">
      {/* Displaying the 'AddNew' and 'SummaryChart' components side by side */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-around">
        <AddNew />
        <SummaryChart />
      </div>

      {/* Displaying the 'ExpenseTable' component */}
      <ExpenseTable />
    </div>
  );
};

// Exporting the 'HomePage' component as the default export
export default HomePage;

