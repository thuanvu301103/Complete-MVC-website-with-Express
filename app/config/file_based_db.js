const fs = require('fs');
//const path = require('path');
//const csv = require('csv-parser');
//require("dotenv").config(); // Load environment variables

class File_based_Data {

    // Static property to hold the singleton instance
    static instance;

    constructor(data_folder_path) {
        if (File_based_Data.instance) {
            return File_based_Data.instance;
        }
        fs.readdir(data_folder_path, (err, files) => {
            if (err) {
                return console.error('Unable to scan directory: ' + err);
            }
            console.log("Files: ")
            // Loop through each file and log the name
            files.forEach(file => {
                console.log(file); // This will log the name of each file
            });
        });
        File_based_Data.instance = this;

    }

    // Static method to get the instance
    static getInstance() {
        if (!File_based_Data.instance) {
            File_based_Data.instance = new File_based_Data(); // Create the instance if it doesn't exist
        }
        return File_based_Data.instance; // Return the singleton instance
    }


    printConnect() {
        console.log("File Based Connection");
    }
}

// Export
module.exports = File_based_Data;