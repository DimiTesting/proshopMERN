import asynchHandler from "./asynchHandler.js";
import jwt from 'jsonwebtoken'
import User from "../models/userModel.js";

const protect = asynchHandler(async(req, res, next) => {
    const token = req.cookies.jwt

    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            console.log(error)
            throw new Error('Not authorized, token failed')
        }
    } else {
        res.status(401)
        throw new Error('Not authorized, token not found')
    }
})

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized, not admin')
    }
}

export {protect, admin}
