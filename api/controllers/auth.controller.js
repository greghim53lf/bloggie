import httpStatus from "http-status"
import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import { jwtToken } from "../utils/generateToken.js"

export const signUp = async (req, res, next) => {
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

export const signIn = async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return next(errorHandler(httpStatus.BAD_REQUEST, "Missing field(s)"))
    }

    try {
        const user = await User.findOne({
            email: req.body.email
        })
        if (!user) {
            return next(errorHandler(httpStatus.NOT_FOUND, "User not found"))
        }
        if (!await user.isPasswordMatch(req.body.password)) {
            return next(errorHandler(httpStatus.BAD_REQUEST, "'Invalid credentials"))
        }
        const token = jwtToken(user._id, user.email)
        const {password, ...userData} = user._doc
        res.status(httpStatus.OK).cookie('access_token', token, {
            httpOnly: true
        }).json({ message: 'Signup successful', data: userData })
    } catch (error) {
        next(error)
    }
}

export const google = async (req, res, next) => {
    const { name, email, googlePhotoUrl } = req.body
    
    try {
        const user = await User.findOne({ email })
        
        if (user) {
            const token = jwtToken(user._id, email)
            const { password, ...userData } = user._doc
            res.status(httpStatus.OK).cookie('access_token', token, {
                httpOnly: true
            }).json({data: userData})
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)

            const newUserDetails = {
                username: name.toLowerCase().replace(' ', '') + Math.random().toString(9).slice(-4),
                email,
                password: generatedPassword,
                profilePicture: googlePhotoUrl
            }

            const newUser = await User.create(newUserDetails)

            const token = jwtToken(newUser._id, newUser.email)

            const { password, ...userData } = newUser._doc
            
            res.status(httpStatus.OK).cookie('access_token', token, {
                httpOnly: true
            }).json({data: userData})
        }
    } catch (error) {
        next(error)
    }
}