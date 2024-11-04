const User = require('../models/User');
const FileBased = require('../config/file_based_db');

// For file_base approach
const fileBasedConnection = FileBased.getInstance();
fileBasedConnection.printConnect();

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
