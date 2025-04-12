const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    const { name, email, address, password,role="Normal User" } = req.body;
    try {
        const newUser = await User.create({
            name,
            email,
            address,
            password,
            role
        });
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = (password===user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        req.user = user ;
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};
const updatePassword = async(req,res)=>{
    const { currentPassword, newPassword } = req.body;
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = (currentPassword===user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        user.password = newPassword;
        req.user = user;
        await user.save();
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating password", error });
    }
}
const logout = (req,res)=>{
    res.clearCookie("authToken");
    res.status(200).json({ message: "Logout successful" });
}
module.exports= {login,signup,getCurrentUser,logout,updatePassword}