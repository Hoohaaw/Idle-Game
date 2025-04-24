
import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'
import bcrypt from 'bcrypt'


const registerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minlength: [3, "The username must be atleast 3 characters."], maxlength: [30, "The username must be at most 20 characters."] },
    password: { type: String, required: true, minlength: [8, "The password must be atleast 8 characters."], maxlength: [80, "The password must be at most 80 characters."] },
    attack: { type: Number, required: true, default: 10 },
    attackPercent: { type: Number, required: true, default: 0 },
    speed: { type: Number, required: true, default: 0 },
    crit: { type: Number, required: true, default: 10 },
    critDamage: { type: Number, required: true, default: 0 },
    coins: { type: Number, required: true, default: 10 },
    experience: { type: Number, required: true, default: 0 },
    adventureStage: { type: Number, required: true, default: 1 },
    bossStage: { type: Number, required: true, default: 1 },
    inventory: { type: Array, required: true }
}, { timestamps: true });

registerSchema.pre('save', async function () { //saves the password as a hash
    this.password = await bcrypt.hash(this.password, 10)
})

registerSchema.statics.authenticate = async function (username, password) { //authenticates the user
    const user = await this.findOne({ username })
    if (!user) {
        throw new Error('User not found.')
    }
    const match = await bcrypt.compare(password, user.password)
    if (match) {
        return user
    }
    throw new Error('Incorrect password.')
}

registerSchema.add(BASE_SCHEMA)

export const RegisterModel = mongoose.model('Register', registerSchema)
