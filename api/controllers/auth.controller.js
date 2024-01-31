import httpStatus from "http-status"
import User from "../models/user.model.js"

export const SignUp = async (req, res) => {
        const {username, email, password} = req.body

    if (!username || !email || !password) { 
        return res.status(httpStatus.OK).json({message: "Missing field(s)"})
    }
    
    try {
        const newUser = await User.create({
            username,
            email,
            password
        })
        res.status(httpStatus.OK).json({ message: 'Signup successful', data: newUser })
    } catch ({message}) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message })
    }
}