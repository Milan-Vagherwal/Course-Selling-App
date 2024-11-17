// Import mongoose, which is the MongoDB object modeling tool for Node.js
const mongoose = require("mongoose");

// Log to confirm that we are connected to the database
console.log("connected to");

// Connect to MongoDB using Mongoose, here the connection string is to a MongoDB Atlas cluster
mongoose.connect("mongodb+srv://mickyrathormv:Name%40123@cluster0.5bo2u.mongodb.net/coursera-app");

// Create a reference to the Schema object for defining schemas for MongoDB collections
const Schema = mongoose.Schema;

// Use ObjectId for references between different collections (like users, courses, etc.)
const ObjectId = mongoose.Types.ObjectId;

// Define the schema for the 'user' collection
const userSchema = Schema({
    email : {type :String, unique: true },  // The email must be unique for each user
    password : String,                       // The user's password
    firstName: String,                       // The user's first name
    lastName: String                         // The user's last name
});

// Define the schema for the 'admin' collection
const adminSchema = Schema({
    email : {type :String, unique: true },  // The admin's email must also be unique
    password : String,                       // Admin's password
    firstName: String,                       // Admin's first name
    lastName: String                         // Admin's last name
});

// Define the schema for the 'course' collection
const courseSchema = Schema({
    title: String,                           // Title of the course
    description: String,                     // Description of the course
    price: Number,                           // Price of the course
    imgUrl: String,                          // Image URL for the course
    creatorId: ObjectId                      // The ObjectId of the user who created the course (reference to 'user' collection)
});

// Define the schema for the 'purchase' collection
const purchaseSchema = Schema({
    userId: ObjectId,                        // Reference to the user's ObjectId who made the purchase
    courseId: ObjectId                       // Reference to the course's ObjectId that was purchased
});

// Create models for each schema. Models are the main interface for interacting with the database.
const userModel = mongoose.model("user", userSchema);        // 'user' model to interact with the 'user' collection
const adminModel = mongoose.model("admin", adminSchema);      // 'admin' model to interact with the 'admin' collection
const courseModel = mongoose.model("course", courseSchema);   // 'course' model to interact with the 'course' collection
const purchaseModel = mongoose.model("purchase", purchaseSchema); // 'purchase' model to interact with the 'purchase' collection

// Export the models so they can be used in other parts of the application
module.exports = {
    userModel,       // Export user model
    adminModel,      // Export admin model
    courseModel,     // Export course model
    purchaseModel    // Export purchase model
}
