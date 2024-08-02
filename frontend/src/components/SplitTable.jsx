// Importing necessary dependencies
import React from "react";
import axios from "axios"; // For making HTTP requests to the backend API
import { useStateContext } from "../contexts/ContextProvider"; // For accessing the state context

// Defining SplitTable component
const SplitTable = ({ setSplitExpense, splitExpense, modalRefSplit }) => {
  // Destructuring necessary state and context from useStateContext custom hook
  const { showToastHandler, setExpenses } = useStateContext();

  // Defining statusToggleHandler function
  // This function is called when the user clicks the "Mark Paid/Unpaid" button
  // It sends a POST request to the backend API with the splitId and the new status
  // It also updates the state of the expenses by toggling the paid status of the split object
  const statusToggleHandler = async (sp) => {
    try {
      // Sending toggle request to backend API
      await axios.post("/api/v1/expenses/toggle-split", {
        splitId: sp._id, // Sending the splitId of the split object
        status: !sp.paid, // Sending the new status of the split object
      });

      // Closing the modal
      modalRefSplit.current.checked = false;

      // Updating splitExpenses state by toggling the paid status of the split object
      setExpenses((prev) => {
        return prev.map(
          (exp) =>
            exp._id === splitExpense._id // Checking if the expense is the same as the splitExpense
              ? {
                  ...exp, // Cloning the expense object
                  split: exp.split.map(
                    (s) =>
                      s._id === sp._id // Checking if the split object is the same as the clicked split object
                        ? {
                            ...s, // Cloning the split object
                            paid: !s.paid, // Toggling the paid status of the split object
                          }
                        : s // If not the same, keeping the split object as it is
                  ),
                }
              : exp // If not the same expense, keeping the expense object as it is
        );
      });

      // Showing success toast message
      showToastHandler("Toggle successful", "success");
    } catch (error) {
      // Showing error toast message
      showToastHandler("Toggle failed", "error");
      console.log(error);
    }
  };

  // Returning JSX for rendering the split table
  return (
    <tbody>
      {splitExpense.split.map((sp, i) => (
        // Mapping over the split array of the splitExpense object
        // Rendering a table row for each split object
        <tr key={i}>
          <td>{sp?.name}</td> {/* Rendering the name of the split object */}
          <td>{sp?.email}</td> {/* Rendering the email of the split object */}
          <td>
            {sp?.hasOwnProperty("_id") ? (
              <button
                className="btn btn-sm btn-primary"
                onClick={() => statusToggleHandler(sp)}
              >
                Mark {sp?.paid ? "Unpaid" : "Paid"}
              </button>
            ) : (
              <div />
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

// Exporting SplitTable component
export default SplitTable;
