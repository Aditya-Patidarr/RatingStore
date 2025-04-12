
const User = require("../models/userModel.js");
const getAllUsers = async (req, res) => {
    try {
        console.log("Fetching all users");
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users.", error });
    }
};

module.exports ={getAllUsers}