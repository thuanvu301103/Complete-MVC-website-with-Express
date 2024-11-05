# Complete-MVC-Website-With-Express
Build a Complete MVC Website With Express

## Set up Express
Using the command-line tool ```npx express-generator```. The Express Generator is a tool that helps you quickly scaffold an Express.js application structure with some built-in options. This is especially useful for setting up a project with a consistent and organized structure right from the beginning 
- Step 1: Install Express Generator globally
```npm install -g express-generator```
- Step 2: Create a New Express App with Options
```express your-app-name```  
	+ Available options:
		```
		$ express -h

		  Usage: express [options] [dir]

		  Options:

		    -h, --help          output usage information
		        --version       output the version number
		    -e, --ejs           add ejs engine support
		        --hbs           add handlebars engine support
		        --pug           add pug engine support
		    -H, --hogan         add hogan.js engine support
		        --no-view       generate without view engine
		    -v, --view <engine> add view <engine> support (ejs|hbs|hjs|jade|pug|twig|vash) (defaults to jade)
		    -c, --css <engine>  add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)
		        --git           add .gitignore
		    -f, --force         force on non-empty directory
		```
	+ Example:
		* Create an API-only app (no views)
			```express my-api --no-view```
		* Create an app using Handlebars as the view engine
			```express my-app -hbs```
		* Create an app with EJS view engine and SASS for CSS
			```express my-app -e --css sass```
		* Create an app with a Git ignore file
			```express my-app --git```
	+ For our project, this is the setup command: ```express --session --css less --hbs app``` 
- Step 3: Install dependencies - Check out ```package.json``` file, all the dependencies are added but haven't been installed. On Terminal, cd to the folder that contains ```package.json``` file, which is also your application then run ```npm install``` 
Incase you want to uninstall dependencies:
```
npm uninstall <your_dependencies>
```

## Scaffold the Express Project

### Environment Variables
Environment variables are key-value pairs that are used to store configuration data outside of your code. They're especially useful for sensitive information (like API keys, database credentials, or settings that might differ between development and production environments) and are typically accessed by your application at runtime
- Step 1: Install ```dotenv``` package (in case the ```package.json``` does not specify this package)
	```
	npm install dotenv
	```
- Step 2: Set up ```.env``` file
	+ Create a ```.env``` file in the root directory of your project
	+ Add environment variables in the format ```KEY=VALUE```
		```
		MONGO_URI = "mongodb://localhost:27017/mydb"
		```
- Step 3: Load ```dotenv``` and access these variable using ```process.env.YOUR _VARIABLE```. For example:
	```javascript
	require("dotenv").config(); // Load environment variables
	console.log(process.env.MONGO_URI);

	```

### Configuration
- The settings that's flexible enough for every environment.
- Create a separate module ```/config/index.js```. The application uses different ports for different servers
- Update the entry point of site in the ```app.js```
	```javascript
	const config = require('./config')();
	process.env.PORT = config.port;
	```
- To switch between the configurations, just add the environment at the end. For example:
	```
	npm start production
	```
will run the server at port 5000.

### Data

#### Database approach
- The database connect setup is built in ```/config/db.js```
- The following steps is built using ```MongoDB```
- Steps:
	+ Step 1: Install ```mongoose``` (in case the ```package.json``` does not specify this package)
		```
		npm install mongoose
		```
	+ Step 2: Connect to MongoDB
		```javascript
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
		```
- Import sample data to MongoDB: In ```/data/database_data/mydb.users.json```, I have prepare a *json file that contain data for user. Please import this *json file to MongoDB server under database named ```mydb``` and collection ```users``` 

#### File-based approach
- The database connect setup is built in ```/config/file_based_db.js```
- Steps:
	+ Step 1: Build file_based_database class using ```Singleton``` pattern
		```javascript
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
			
			// Object method	
			printConnect() {
        			console.log("File Based Connection");
    			}

		}
		```
	+ Step 2: Initial file_based_database object in ```/app.js```
		```javascript
		var fileBasedLoader = require("./config/file_based_db"); // Import the file_based_db function
    		var fileBasedData = new fileBasedLoader(path.join(__dirname, process.env.FILE_BASED_DATA_DIR));
		```
	+ Step 3: Use the object in other module in the project
		```javascript
		// /controllers/userController.js
		const FileBased = require('../config/file_based_db');

		const fileBasedConnection = FileBased.getInstance();
		fileBasedConnection.printConnect();
		```

#### Switch between database type
- Create a variable in ```.env``` file ```DATABASE_OPTION = "file_based"```
- In ```/app.js```, implement a mechanism to switch between database type:
	```javascript
	// Database connect
	if (process.env.DATABASE_OPTION == "server") {
    		console.log("Database Server connection:")
    		connectDB();    // Connect to Database: MongoDB
	}
	else if (process.env.DATABASE_OPTION == "file_based") {
    		console.log("File based Data is loading:")
    		var fileBasedData = new fileBasedLoader(path.join(__dirname, process.env.FILE_BASED_DATA_DIR));
	}
	```

## Set Up an MVC Pattern with Express

### Models
- The Model is responsible to manage the data or perform specific operations
- Set up model for database approach (using MongoDb): Create a ```User``` model using ```Mongoose```
	```javascript
	// /models/User.js
	const mongoose = require('mongoose');

	const userSchema = new mongoose.Schema({
  		name: {
    			type: String,
    			required: true,
  		},
  		email: {
    			type: String,
    			required: true,
    			unique: true,
  		},
	});

	const User = mongoose.model('User', userSchema);
	module.exports = User;

	```
 
### Controllers
- The Controller handles the model and view layers to work together
- Set up controller for database approach (using MongoDb): Create a ```userController``` controller that handles the logic for interact with the ```User``` model
	```javascript
	// /controllers/userController.js
	const User = require('../models/User');

	// Display all users
	exports.getAllUsers = async (req, res) => {
  		try {
    			const users = await User.find();
    			res.render('users', { users });
  		} catch (error) {
    			res.status(500).send('Server Error');
  		}
	};

	// Create a new user
	exports.createUser = async (req, res) => {
  		const { name, email } = req.body;
  		const user = new User({ name, email });
  		try {
    			await user.save();
    			res.redirect('/users');
  		} catch (error) {
    			res.status(400).send('Error creating user');
  		}
	};

	```

### Routers
- Define routes that map to the controller methods
- Set up router: Create a ```userRouter``` router thet map to ```userController```
	```javascript
	const express = require('express');
	const router = express.Router();
	const userController = require('../controllers/userController');

	// Routes
	router.get('/', userController.getAllUsers);
	router.post('/', userController.createUser);

	module.exports = router;

	```

### Views
- The View (Presentation) is responsible to display the data provided by the model in a specific format
- Create a main layout and the user view using ```Handlebars```: ```/views/layout.hbs```
	```html
	<!DOCTYPE html>
	<html lang="en">
		<head>
  		<meta charset="UTF-8">
  		<meta name="viewport" content="width=device-width, initial-scale=1.0">
  		<title>User List</title>
  		<link rel="stylesheet" href="/styles.css">
	</head>
	<body>
  		<div class="container">
    		{{{body}}} <!-- This is where the content of views will be injected -->
  		</div>
	</body>
	</html>

	```
- Create users view: ```/views/users.hbs```
	```html
	<h1>User List</h1>
	<form action="/users" method="POST">
  		<input type="text" name="name" placeholder="Name" required>
  		<input type="email" name="email" placeholder="Email" required>
  		<button type="submit">Add User</button>
	</form>
	<ul>
  		{{#each users}}
    		<li>{{this.name}} - {{this.email}}</li>
  		{{/each}}
	</ul>

	```

### Set Up the Express Application ```app.js```
```javascript
// app.js
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRouter');

// Register Routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
```

## About API Endpoints
Router handles API Endpoints (which is actually map API Endpoint to Controller's method)

## Appendix
### Kill process (server) running on specific port:
- Find PID of server running on port:
	```
	netstat -ano | findstr :<Port number>
	```
- Kill that process:
	```
	taskkill /F /PID <PID>
	```
