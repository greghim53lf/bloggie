import httpStatus from "http-status"
import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import { jwtToken } from "../utils/generateToken.js"

export const SignUp = async (req, res, next) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return next(errorHandler(httpStatus.BAD_REQUEST, "Missing field(s)"))
    }

    try {
        const newUser = await User.create({
            username,
            email,
            password

        })
        res.status(httpStatus.OK).json({ message: 'Signup successful', data: newUser })
    } catch (error) {
        next(error)
    }
}

export const SignIn = async (req, res, next) => {
    const { email, password: requestPassword } = req.body
    
    if (!email || !requestPassword) {
        return next(errorHandler(httpStatus.BAD_REQUEST, "Missing field(s)"))
    }

    try {
        const user = await User.findOne({
            email,
        })
        if (!user) {
            return next(errorHandler(httpStatus.NOT_FOUND, "User not found"))
        }
        if (!await user.isPasswordMatch(requestPassword)) {
            return next(errorHandler(httpStatus.BAD_REQUEST, "'Invalid credentials"))
        }
        const token = jwtToken(user._id, user.email)
        const {password: requestPassword, ...userData} = user._doc
        res.status(httpStatus.OK).cookie('accss_token', token, {
            httpOnly: true
        }).json({ message: 'Signup successful', data: userData })
    } catch (error) {
        next(error)
    }
}