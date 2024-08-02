// This is a React component that renders a modal for editing expense details
// It uses the Formik library for form handling and validation
// It also uses the axios library for making HTTP POST requests to the backend API

import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";

const EditModal = ({ editableExpense }) => {
  // This is a reference to the checkbox input that toggles the modal visibility
  const modalRefEdit = useRef();

  // Destructuring necessary variables from useStateContext custom hook
  const { userSetting, showToastHandler, setExpenses } = useStateContext();

  return (
    <div>
      {/* Input checkbox for opening the modal */}
      <input
        type="checkbox"
        id="my-modal-2"
        className="modal-toggle"
        ref={modalRefEdit}
      />

      {/* Modal for editing expense details */}
      <div className="modal">
        <div className="modal-box">
          {/* Label for closing the modal */}
          <label
            htmlFor="my-modal-2"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          {/* Heading for the modal */}
          <h3 className="font-bold text-lg">Update details of expense</h3>

          {/* Formik component for handling form validation and submission */}
          <Formik
            initialValues={{
              // Setting initial values for form fields based on the expense being edited
              amount: editableExpense.amount,
              category: editableExpense.category,
              description: editableExpense.description,
            }}
            enableReinitialize
            // Function to validate form fields
            validate={(values) => {
              const errors = {};
              // Validating amount field
              if (values.amount === 0)
                errors.amount = "Expense cannot be zero";
              // Validating category field
              if (values.category === "--")
                errors.category = "Select valid category";
              // Validating description field
              if (!values.description)
                errors.description = "Required";

              return errors;
            }}
            // Function to handle form submission
            onSubmit={async (values) => {
              try {
                // Sending a POST request to the backend API to edit the expense
                await axios.post("/api/v1/expenses/edit-expense", {
                  expenseId: editableExpense._id,
                  payload: {
                    ...values,
                    userid: editableExpense.userid,
                  },
                });

                // Updating the expenses state with the edited expense details
                setExpenses((prev) => {
                  return prev.map((exp) =>
                    exp._id === editableExpense._id
                      ? {
                          ...exp,
                          amount: values.amount,
                          category: values.category,
                          description: values.description,
                        }
                      : exp
                  );
                });

                // Showing a success toast
                showToastHandler("Expense updated", "success");

                // Closing the modal
                modalRefEdit.current.checked = false;
              } catch (error) {
                // Showing an error toast
                showToastHandler("Update failed", "error");
                console.log(error);
              }
            }}
          >
            <Form>
              {/* Form field for amount */}
              <div className="form-control">
                <label htmlFor="amount" className="label">
                  Amount
                </label>
                <Field
                  id="amount"
                  name="amount"
                  className="input input-bordered"
                  type="number"
                />
                {/* Error message for amount field */}
                <ErrorMessage
                  name="amount"
                  className="label text-sm text-red-500"
                  component={"div"}
                />
              </div>

              {/* Form field for category */}
              <div className="form-control">
                <label htmlFor="category" className="label">
                  Category
                </label>
                <Field
                  id="category"
                  name="category"
                  className="input input-bordered"
                  as="select"
                >
                  {/* Generating options for category field based on user settings */}
                  {userSetting.categories.map((cat, i) => (
                    <option key={i} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Field>
                {/* Error message for category field */}
                <ErrorMessage
                  name="category"
                  className="label text-sm text-red-500"
                  component={"div"}
                />
              </div>

              {/* Form field for description */}
              <div className="form-control">
                <label htmlFor="description" className="label">
                  Description
                </label>
                <Field
                  id="description"
                  name="description"
                  className="input input-bordered"
                />
                {/* Error message for description field */}
                <ErrorMessage
                  name="description"
                  className="label text-sm text-red-500"
                  component={"div"}
                />
              </div>

              {/* Form submit button */}
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-warning">
                  save edit
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

