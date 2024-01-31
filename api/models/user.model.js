import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs"

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
})


UserSchema.pre('save', async function (next) {
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
    next()
})

const User = model('User', UserSchema)

export default User