
// Import the Express module
const express = require("express");
// Create an Express application
const app = express();
// Define the port number where the server will run
const PORT = 8001;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Simple message when accessing the root URL
app.get("/", (req, res) => {
    return res.send("Calculator");
});

// POST route to perform addition
app.post("/add", (req, res) => {
    // Log the request body to the console
    console.log(req.body);

    // Destructure num1 and num2 from the request body
    const { num1, num2 } = req.body;

    // Check if either number is missing (null or undefined)
    if (!num1 || !num2) {
        return res.send(`Data is missing num1 = ${num1} and num2 = ${num2}`);
    }

    // Check if the types of num1 and num2 are numbers
    if (typeof num1 !== "number" || typeof num2 !== "number") {
        return res.send("Data type of numbers are incorrect");
    }

    // Perform addition
    const ans = num1 + num2;

    // Send the result as a JSON response
    return res.send({
        status: 200,
        message: "Addition is successfull",
        result: ans
    });
});

// GET route to perform subtraction
app.get("/sub", (req, res) => {
    console.log(req.query);

    const { num1, num2 } = req.query;

    // Check if either number is missing
    if (!num1 || !num2) {
        return res.send(`Data is missing: num1 = ${num1}, num2 = ${num2}`);
    }

    // Convert the numbers to actual Number types and perform subtraction
    const ans = Math.abs(Number(num1) - Number(num2));

    // Send the result as a JSON response
    return res.send({
        status: 200,
        message: "Subtraction is successfull",
        result: ans
    });
});

// Define a GET route for division with dynamic URL parameters :num and :den
app.get("/div/:num/:den", (req, res) => {
    // Log the URL parameters to the console for debugging
    console.log(req.params);

    // Destructure 'num' (numerator) and 'den' (denominator) from the URL parameters
    const { num, den } = req.params;

    // Check if either 'num' or 'den' is missing
    if (!num || !den) {
        return res.send(`Data is missing: num1 = ${num}, num2 = ${den}`);
    }

    // Check if the denominator is zero (as a string)
    if (den === "0") {
        return res.send("Denominator can not be zero");
    }

    // Convert the string values to integers and perform division
    const result = parseInt(num) / parseInt(den);

    // Return the division result in a JSON response
    return res.send({
        status: 200,
        message: "Div success",
        result: result,
    });
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
