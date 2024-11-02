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