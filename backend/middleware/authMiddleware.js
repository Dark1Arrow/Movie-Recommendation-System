import jwt, { decode } from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/User.js'

const authenticate = asyncHandler(async (req, res, next) => {

    let token
    token = req.cookies.jwt
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error("Not authorized, token failed.")
        }
    } else {
        res.status(401)
        throw new Error("Not authorized, no token.")
    }
})

// Check if the user is Authorized Admin or not 

const authorizeAdmin = (req, res, next) => {
    // console.log(req)
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).send("Not authorized as admin")
    }
}

export { authenticate, authorizeAdmin }