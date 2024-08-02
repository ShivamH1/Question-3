// Importing necessary dependencies
import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";
import EditModal from "./EditModal";
import SplitModal from "./SplitModal";

// Defining ExpenseTable component
const ExpenseTable = () => {
  // Destructuring necessary state and context from useStateContext hook
  const {
    loginUser,
    expenses,
    setExpenses,
    showToastHandler,
    splitExpenses,
    setSplitExpenses,
  } = useStateContext();

  // Defining state variables
  const [editableExpense, setEditableExpense] = useState("");
  const [splitExpense, setSplitExpense] = useState("");

  // Defining deleteHandler function
  const deleteHandler = async (exp) => {
    try {
      // Sending delete request to backend API
      await axios.post("/api/v1/expenses/delete-expense", {
        expenseId: exp._id,
      });
      // Updating expenses state by filtering out the deleted expense
      setExpenses((prev) => {
        return prev.filter((p) => exp._id !== p._id);
      });
      // Showing success toast message
      showToastHandler("Expense Deleted", "success");
    } catch (error) {
      // Showing error toast message
      showToastHandler("Delete failed", "error");
      console.log(error);
    }
  };

  // Defining statusToggleHandler function
  const statusToggleHandler = async (sp) => {
    try {
      // Finding the split object corresponding to the current user
      const spl = sp.split.filter((e) => e.email === loginUser.email)[0];
      // Sending toggle request to backend API
      await axios.post("/api/v1/expenses/toggle-split", {
        splitId: spl._id,
        status: !spl.paid,
      });
      // Updating splitExpenses state by toggling the paid status of the split object
      setSplitExpenses((prev) => {
        return prev.map((exp) =>
          exp._id === sp._id
            ? {
                ...exp,
                split: exp.split.map((s) =>
                  s._id === spl._id
                    ? {
                        ...s,
                        paid: !s.paid,
                      }
                    : s
                ),
              }
            : exp
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

  return (
    // Rendering ExpenseTable component
    <div className="overflow-x-auto my-8">
      <h2 className="font-bold text-2xl text-center my-4 text-secondary">
        Your Expenses
      </h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          {/* Rendering table rows for individual expenses */}
          {expenses?.map((exp, i) => (
            <tr key={i}>
              <td>
                {/* Displaying the amount of the expense */}
                {exp.split.length > 0
                  ? `${(exp.amount / exp.split.length).toFixed(2)} (${
                      exp.amount
                    })`
                  : `${exp.amount}`}
              </td>
              <td>{exp.category}</td>
              <td>{exp.description}</td>
              <td>
                {/* Rendering split button */}
                <label
                  htmlFor="my-modal-3"
                  className="btn btn-sm btn-info m-1"
                  onClick={() => setSplitExpense(exp)}
                >
                  Split
                </label>
                {/* Rendering delete button */}
                <button
                  className="btn btn-sm btn-error m-1"
                  onClick={() => deleteHandler(exp)}
                >
                  Delete
                </button>
                {/* Rendering edit button */}
                <label
                  htmlFor="my-modal-2"
                  className="btn btn-sm btn-warning m-1"
                  onClick={() => setEditableExpense(exp)}
                >
                  Edit
                </label>
              </td>
            </tr>
          ))}
          {/* Rendering table rows for split expenses */}
          {splitExpenses?.map((exp, i) => (
            <tr key={i}>
              <td>
                {/* Displaying the amount of the split expense */}
                {`${(exp.amount / exp.split.length).toFixed(2)} (${
                  exp.amount
                })`}
              </td>
              <td>{exp.category}</td>
              <td>{exp.description}</td>
              <td>
                {/* Rendering mark paid button only if the split is not marked as paid */}
                {exp.split.filter((e) => e.email === loginUser.email)[0]
                  .paid ? (
                  <div />
                ) : (
                  <button
                    className="btn btn-sm btn-info m-1"
                    onClick={() => statusToggleHandler(exp)}
                  >
                    mark paid
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Rendering EditModal and SplitModal components */}
      <EditModal editableExpense={editableExpense} />
      <SplitModal
        splitExpense={splitExpense}
        setSplitExpense={setSplitExpense}
      />
    </div>
  );
};

// Exporting ExpenseTable component
export default ExpenseTable;

