import httpStatus from "http-status"
import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"

export const SignUp = async (req, res, next) => {
        const {username, email, password} = req.body

    if (!username || !email || !password) { 
        return next(errorHandler(httpStatus.BAD_REQUEST, "Missing field(s)"))
    }
    
    const newUser = new User({
    username,
    email,
    password

})
    try {
        await newUser.save();
        res.status(httpStatus.OK).json({ message: 'Signup successful', data: newUser })
    } catch (error) {
        next(error)
    }
}