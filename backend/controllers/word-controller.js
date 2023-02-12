import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import asyncHandler from 'express-async-handler';
import Word

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Required fields not provided.");
    }

    // check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists.");
    }

    // hash the password - 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create the user 
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201);
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error("Failed to create User.");
    }
});

// @desc Authenticate user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {

    const {email, password} = req.body;

    //check user exists
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200);
        res.json({
            message: "login successful", 
            token: generateToken(user._id),
            _id: user.id,
            name: user.name,
            email: user.email,});
    } else {
        res.status(400);
        res.json({message: "Invalid credentials"});
    }
});

// @desc Get user data
// @route POST /api/users/me
// @access Private
const getUserData = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

// @route POST /api/internal/word
// @access Private




const generateToken = (id) =>
{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
}

export {
    registerUser,
    loginUser,
    getUserData

};