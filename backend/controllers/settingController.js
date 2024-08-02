// Import the settingModel from the models directory
const settingModel = require("../models/settingModel");

// Define an asynchronous function to get a setting
// This function takes in a request object and a response object
// It attempts to find a setting in the settingModel with the userid from the request body
// If successful, it sends a JSON response with the setting
// If there is an error, it logs the error and sends a JSON response with the error
const getSetting = async (req, res) => {
  try {
    // Attempt to find a setting in the settingModel with the userid from the request body
    const setting = await settingModel.findOne({
      // The userid property in the settingModel is set to the userid property in the request body
      userid: req.body.userid,
    });
    // Send a JSON response with the setting
    res.status(200).json(setting);
  } catch (error) {
    // Log the error
    console.log(error);
    // Send a JSON response with the error
    res.status(500).json(error);
  }
};

// Define an asynchronous function to update a setting
// This function takes in a request object and a response object
// It attempts to find a setting in the settingModel with the userid from the request body and update it with the payload from the request body
// If successful, it sends a plain text response with a success message
// If there is an error, it logs the error and sends a JSON response with the error
const updateSetting = async (req, res) => {
  try {
    // Attempt to find a setting in the settingModel with the userid from the request body and update it with the payload from the request body
    await settingModel.findOneAndUpdate(
      // The userid property in the settingModel is set to the userid property in the request body
      { userid: req.body.userid },
      // The payload property in the request body is set to the payload property in the request body
      req.body.payload
    );
    // Send a plain text response with a success message
    res.status(200).send("Edit successful");
  } catch (error) {
    // Log the error
    console.log(error);
    // Send a JSON response with the error
    res.status(500).json(error);
  }
};

// Define an asynchronous function to add a new setting
// This function takes in a request object and a response object
// It creates a new setting with the properties from the request body
// It attempts to save the new setting to the settingModel
// If successful, it sends a JSON response with the new setting
// If there is an error, it logs the error and sends a JSON response with the error
const addSetting = async (req, res) => {
  try {
    // Create a new setting with the properties from the request body
    const newSetting = new settingModel(req.body);
    // Attempt to save the new setting to the settingModel
    await newSetting.save();
    // Send a JSON response with the new setting
    res.status(201).json(newSetting);
  } catch (error) {
    // Log the error
    console.log(error);
    // Send a JSON response with the error
    res.status(500).json(error);
  }
};

// Export the functions for use in other files
module.exports = {
  // Export the addSetting function
  addSetting,
  // Export the getSetting function
  getSetting,
  // Export the updateSetting function
  updateSetting,
};

