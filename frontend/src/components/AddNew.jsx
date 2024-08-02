// Importing necessary dependencies
import React from "react"; // Importing React
import { Formik, Form, Field, ErrorMessage } from "formik"; // Importing Formik, Form, Field, and ErrorMessage from formik
import axios from "axios"; // Importing axios for making HTTP requests
import { useStateContext } from "../contexts/ContextProvider"; // Importing useStateContext custom hook from ContextProvider

// Defining the AddNew component
const AddNew = () => {
  // Destructuring necessary variables from useStateContext custom hook
  const { loginUser, expenses, setExpenses, userSetting, showToastHandler } =
    useStateContext();

  // Returning the JSX for the AddNew component
  return (
    <div className="mt-4 md:mt-0">
      {/* Label for opening the modal */}
      <label htmlFor="my-modal" className="btn btn-lg btn-primary">
        add new expense
      </label>

      {/* Input checkbox for opening the modal */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />

      {/* Modal for adding new expense */}
      <div className="modal">
        <div className="modal-box">
          {/* Label for closing the modal */}
          <label
            htmlFor="my-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          {/* Heading for the modal */}
          <h3 className="font-bold text-lg">Add details of new expense</h3>

          {/* Formik component for handling form validation and submission */}
          <Formik
            initialValues={{
              amount: "", // Initial value for amount field
              category: "--", // Initial value for category field
              description: "", // Initial value for description field
            }}
            // Function to validate form fields
            validate={(values) => {
              const errors = {}; // Object to store validation errors
              let sum = 0; // Variable to store sum of expenses

              // Calculating the sum of expenses
              expenses.forEach((e) => (sum += e.amount));

              // Validating amount field
              if (parseInt(values.amount) <= 0)
                errors.amount = "Expense cannot be zero or less";
              else if (parseInt(values.amount) > userSetting.budget - sum)
                errors.amount = "Expense cannot be more than budget";

              // Validating category field
              if (values.category === "--")
                errors.category = "Select valid category";

              // Validating description field
              if (!values.description) errors.description = "Required";

              // Returning the object of validation errors
              return errors;
            }}
            // Function to handle form submission
            onSubmit={async (values, actions) => {
              try {
                // Making a POST request to add new expense
                const { data } = await axios.post(
                  "/api/v1/expenses/add-expense",
                  {
                    userid: loginUser.email, // User ID of the logged in user
                    ...values, // Other form field values
                  }
                );

                // Updating the expenses state with the new expense
                setExpenses((prev) => {
                  return [...prev, data];
                });

                // Showing success toast message
                showToastHandler("Expense Saved", "success");

                // Resetting the form
                actions.resetForm();
              } catch (error) {
                // Showing error toast message
                showToastHandler("Save failed", "error");

                // Logging the error to the console for debugging purposes
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
                  placeholder={0}
                />
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
                  <option value="--">--</option>

                  {/* Dynamically generating options for category field based on userSetting.categories */}
                  {userSetting.categories.map((cat, i) => (
                    <option key={i} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Field>
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
                <ErrorMessage
                  name="description"
                  className="label text-sm text-red-500"
                  component={"div"}
                />
              </div>

              {/* Form submit button */}
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  save
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

// Exporting the AddNew component
export default AddNew;
