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
		```javascript
		npm install mongoose
		```
	+ Step 2: Connect to MongoDB
		```
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

#### File-based approach