import User from "../models/User.js";
import bcrypt from "bcryptjs"
import asyncHandler from "../middleware/asyncHandler.js";
import createToken from "../utils/createToken.js"

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        throw new Error("please enter all the field")
    }

    const userExist = await User.findOne({ username })
    if (userExist) throw new Error("user is already existed")

    // Hash the user password 
    const salt = await bcrypt.genSalt(10)
    const hasedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({ username, email, password: hasedPassword })

    try {
        newUser.save()
        createToken(res, newUser._id)

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        })
    } catch (error) {
        res.status(400)
        throw new Error(`details are invaild : ${error} `)
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const existedUser = await User.findOne({ email });

    if (existedUser) {
        const isPasswordValid = await bcrypt.compare(password, existedUser.password)

        if (isPasswordValid) {
            createToken(res, existedUser._id)

            res.status(201).json({
                _id: existedUser._id,
                username: existedUser.username,
                email: existedUser.email,
                isAdmin: existedUser.isAdmin,
            })
        } else {
            res.status(401).json({ message: "password is invaild" })
        }
    } else {
        res.status(401).json({ message: "User not found" })
    }
})

const logoutCurrentUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ massage: "Logged out successfully" })
})

const getAllUser = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findOne(req._id)
    console.log(user)

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hasedPassword = await bcrypt.hash(req.body.password, salt)
            user.password = hasedPassword
        }

        const updatedUser = await user.save();
        console.log("done");

        res.status(201).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error("User not found")
    }
})

export { createUser, loginUser, logoutCurrentUser, getAllUser, getCurrentUserProfile, updateCurrentUserProfile }