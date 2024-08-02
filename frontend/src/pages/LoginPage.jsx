// Importing necessary dependencies
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";

// Defining the LoginPage component
const LoginPage = () => {
  // Destructuring necessary functions from the context
  const { setLoginUser, setUserSetting, showToastHandler } = useStateContext();
  // Getting the navigate function from the react-router-dom
  const navigate = useNavigate();

  // Checking if there is a user in the localStorage, if yes, redirecting to the home page
  useEffect(() => {
    if (localStorage.getItem("user")) navigate("/");
  }, [navigate]);

  // Rendering the login page
  return (
    <div className="hero min-h-[80vh] bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login</h1>
          <p className="py-6">Track your expenses with ease!</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            {/* Using Formik for form handling */}
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validate={(values) => {
                const errors = {};
                // Checking if email field is empty
                if (!values.email) errors.email = "Required";

                // Checking if password field is empty or only contains spaces
                if (values.password.trim() === "")
                  errors.password = "Password cannot be empty";
                return errors;
              }}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  // Sending a POST request to the server to log in the user
                  const { data } = await axios.post(
                    "/api/v1/users/login",
                    values
                  );
                  // Sending a POST request to the server to get the user's settings
                  const { data: setting } = await axios.post(
                    "/api/v1/settings/get-setting",
                    { userid: values.email }
                  );
                  // Storing the user in the localStorage
                  localStorage.setItem(
                    "user",
                    JSON.stringify({
                      ...data.user,
                    })
                  );
                  // Storing the user's settings in the localStorage
                  localStorage.setItem("setting", JSON.stringify(setting));
                  // Setting the user in the context
                  setLoginUser({ ...data.user });
                  // Setting the user's settings in the context
                  setUserSetting(setting);
                  setSubmitting(false);
                  // Checking if the user has set their budget and categories, if not, redirecting to the settings page
                  if (setting.budget === 0) {
                    showToastHandler(
                      "Please set budget & categories",
                      "warning"
                    );
                    navigate("/settings");
                  } else {
                    showToastHandler("Login successful", "success");
                    // Redirecting to the home page
                    navigate("/");
                  }
                } catch (error) {
                  // Showing an error toast if login fails
                  showToastHandler("Login failed", "error");
                  console.log(error);
                  resetForm();
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  {/* Rendering the email input field */}
                  <div className="form-control">
                    <label className="label" htmlFor="email">
                      Email
                    </label>
                    <Field
                      id="email"
                      type="email"
                      name="email"
                      className="input input-bordered"
                    />
                    {/* Rendering the error message if the email field is empty */}
                    <ErrorMessage
                      name="email"
                      className="label text-sm text-red-500"
                      component={"div"}
                    />
                  </div>
                  {/* Rendering the password input field */}
                  <div className="form-control">
                    <label className="label">Password</label>
                    <Field
                      id="password"
                      type="password"
                      name="password"
                      className="input input-bordered"
                    />
                    {/* Rendering the error message if the password field is empty or only contains spaces */}
                    <ErrorMessage
                      name="password"
                      className="label text-sm text-red-500"
                      component={"div"}
                    />
                  </div>

                  {/* Rendering a link to the registration page if it's the user's first time */}
                  <div className="mt-6 mb-2">
                    <Link to="/register" className="link">
                      First time user? Click here to register
                    </Link>
                  </div>

                  {/* Rendering the login button */}
                  <div className="form-control">
                    {!isSubmitting ? (
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                    ) : (
                      // Rendering a loading spinner if the form is submitting
                      <div
                        className="radial-progress text-primary animate-spin"
                        style={{
                          "--value": 50,
                          "--size": "3rem",
                          "--thickness": "8px",
                        }}
                      ></div>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting the LoginPage component
export default LoginPage;

