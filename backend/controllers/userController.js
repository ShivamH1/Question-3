// Import the userModel from the ../models/userModel.js file
const userModel = require("../models/userModel");

// Define an asynchronous function to handle user login
const loginController = async (req, res) => {
  try {
    // Destructure the email and password from the request body
    const { email, password } = req.body;

    // Find a user in the userModel with the given email and password
    const user = await userModel.findOne({ email, password });

    // If no user is found, send a "User Not Found" message with a status code of 404
    if (!user) {
      return res.status(404).send("User Not Found");
    }

    // Remove the password property from the user object to prevent it from being sent in the response
    user.password = undefined;

    // Send the user object as a JSON response with a status code of 200
    res.status(200).json({ success: true, user });
  } catch (error) {
    // If there is an error, send the error as a JSON response with a status code of 400
    res.status(400).json({ success: false, error });
  }
};

// Define an asynchronous function to handle user registration
const registerController = async (req, res) => {
  try {
    // Create a new user object with the properties from the request body
    const newUser = new userModel(req.body);

    // Save the new user to the userModel
    await newUser.save();

    // Send the new user object as a JSON response with a status code of 201
    res.status(201).json({ success: true, newUser });
  } catch (error) {
    // If there is an error, send the error as a JSON response with a status code of 400
    res.status(400).json({ success: false, error });
  }
};

// Define an asynchronous function to get a user by email
const getUserByEmailController = async (req, res) => {
  try {
    // Destructure the email from the request body
    const { email } = req.body;

    // Find a user in the userModel with the given email
    const user = await userModel.findOne({ email });

    // If no user is found, send a success: false message as a JSON response with a status code of 200
    if (!user) {
      return res.status(200).json({ success: false });
    }

    // Remove the password property from the user object to prevent it from being sent in the response
    user.password = undefined;

    // Send the user object as a JSON response with a status code of 200
    return res.status(200).json({ success: true, user });
  } catch (error) {
    // If there is an error, send the error as a JSON response with a status code of 400
    res.status(400).json({ success: false, error });
  }
};

// Export the loginController, registerController, and getUserByEmailController functions
module.exports = {
  loginController,
  registerController,
  getUserByEmailController,
};

