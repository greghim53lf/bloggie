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
    },
    profilePicture: {
        type: String,
        default: 'https://w7.pngwing.com/pngs/184/113/png-transparent-user-profile-computer-icons-profile-heroes-black-silhouette-thumbnail.png'
    }
}, {
    timestamps: true
})


UserSchema.pre('save', async function (next) {
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
    next()
})

UserSchema.methods.isPasswordMatch = async function (password) {
    return await bcryptjs.compare(password, this.password);
}

const User = model('User', UserSchema)

export default User