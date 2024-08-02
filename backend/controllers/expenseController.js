// Import the expense model
const expenseModel = require("../models/expenseModel");

// Define an asynchronous function to get all expenses for a user
const getAllExpense = async (req, res) => {
  try {
    // Find all expenses for the user with the given userid
    const expenses = await expenseModel.find({
      userid: req.body.userid,
    });
    // Send the expenses as a JSON response with a status code of 200
    res.status(200).json(expenses);
  } catch (error) {
    // Log the error and send it as a JSON response with a status code of 500
    console.log(error);
    res.status(500).json(error);
  }
};

// Define an asynchronous function to delete an expense
const deleteExpense = async (req, res) => {
  try {
    // Find the expense with the given expenseId and delete it
    await expenseModel.findOneAndDelete({
      _id: req.body.expenseId,
    });
    // Send a success message as a plain text response with a status code of 200
    res.status(200).send("Expense deleted");
  } catch (error) {
    // Log the error and send it as a JSON response with a status code of 500
    console.log(error);
    res.status(500).json(error);
  }
};

// Define an asynchronous function to edit an expense
const editExpense = async (req, res) => {
  try {
    // Find the expense with the given expenseId and update it with the payload from the request body
    await expenseModel.findOneAndUpdate(
      { _id: req.body.expenseId },
      req.body.payload
    );
    // Send a success message as a plain text response with a status code of 200
    res.status(200).send("Edit successful");
  } catch (error) {
    // Log the error and send it as a JSON response with a status code of 500
    console.log(error);
    res.status(500).json(error);
  }
};

// Define an asynchronous function to add a new expense
const addExpense = async (req, res) => {
  try {
    // Create a new expense model with the data from the request body
    const newExpense = new expenseModel(req.body);
    // Save the new expense to the database
    await newExpense.save();
    // Send the new expense as a JSON response with a status code of 201
    res.status(201).json(newExpense);
  } catch (error) {
    // Log the error and send it as a JSON response with a status code of 500
    console.log(error);
    res.status(500).json(error);
  }
};

// Define an asynchronous function to split an expense
const splitExpense = async (req, res) => {
  try {
    // Find the expense with the given expenseId and add the split data from the request body to the "split" array in the expense model
    await expenseModel.findOneAndUpdate(
      { _id: req.body.expenseId },
      { $push: { split: req.body.payload } }
    );
    // Send a success message as a plain text response with a status code of 200
    res.status(200).send("Split successful");
  } catch (error) {
    // Log the error and send it as a JSON response with a status code of 500
    console.log(error);
    res.status(500).json(error);
  }
};

// Define an asynchronous function to toggle the paid status of a split expense
const splitStatusToggle = async (req, res) => {
  try {
    // Destructure the splitId and status from the request body
    const { splitId, status } = req.body;
    // Find the expense with a split with the given splitId and set the "paid" property of that split to the given status
    await expenseModel.findOneAndUpdate(
      { "split._id": splitId },
      { $set: { "split.$.paid": status } }
    );
    // Send a success message as a plain text response with a status code of 200
    return res.status(200).send("Status toggled");
  } catch (error) {
    // Log the error and send it as a JSON response with a status code of 500
    console.log(error);
    res.status(500).json(error);
  }
};

// Define an asynchronous function to get all unpaid splits for a user
const getAllSplitExpense = async (req, res) => {
  try {
    // Find all expenses for which the user with the given userid has an unpaid split
    const expenses = await expenseModel.find({
      "split.email": req.body.userid,
      "split.paid": false,
    });
    // Send the expenses as a JSON response with a status code of 200
    res.status(200).json(expenses);
  } catch (error) {
    // Log the error and send it as a JSON response with a status code of 500
    console.log(error);
    res.status(500).json(error);
  }
};

// Export the functions as an object for use in other modules
module.exports = {
  getAllExpense,
  addExpense,
  editExpense,
  deleteExpense,
  splitExpense,
  splitStatusToggle,
  getAllSplitExpense,
};

