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
### Configuration
- The settings that's flexible enough for every environment.
- Create a separate module ```/config/index.js```. The application uses different ports for different servers
- Update the entry point of site in the ```app.js```
```
const config = require('./config')();
process.env.PORT = config.port;
```
- To switch between the configurations, just add the environment at the end. For example:
```
npm start production
```
will run the server at port 5000.