// Import necessary modules
require('dotenv').config()

const express = require("express"); // Express framework to handle HTTP requests and create the server
const mongoose = require("mongoose"); // Mongoose library to interact with MongoDB
const { userRouter } = require("./routes/user"); // Importing the user-specific routes
const { courseRouter } = require("./routes/course"); // Importing the course-specific routes
const { adminRouter } = require("./routes/admin"); // Importing the admin-specific routes

// Create an instance of the Express application
const app = express();
app.use(express.json());

// Set up route handling for the various API endpoints
app.use("/api/v1/user", userRouter); // All routes starting with /api/v1/user will be handled by userRouter
app.use("/api/v1/course", courseRouter); // All routes starting with /api/v1/course will be handled by courseRouter
app.use("/api/v1/admin", adminRouter); // All routes starting with /api/v1/admin will be handled by adminRouter

// Define an asynchronous main function for setting up the server and database connection
async function main() {
    // Connect to MongoDB database using the provided connection string
    await mongoose.connect(process.env.MONGO_URL);

    app.listen(3000);
    console.log("listening to port 3000");
}

// Call the main function to start the database connection and server
main();
