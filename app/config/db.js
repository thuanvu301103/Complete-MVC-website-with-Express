// Set up Database Connection Module

const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Load MongoDB URI from environment variable
        const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/mydb";

        // Connect to MongoDB
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        process.exit(1); // Exit process with failure
    }
};

// Export the connection function
module.exports = connectDB;