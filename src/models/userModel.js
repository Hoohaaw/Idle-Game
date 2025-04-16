import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    attack: {
        type: Number,
        required: true
    },
    attackPercent: {
        type: Number,
        required: true
    },
    speed: {
        type: Number,
        required: true
    },
    crit: {
        type: Number,
        required: true
    },
    critDamage: {
        type: Number,
        required: true
    },
    coins: {
        type: Number,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    adventureStage: {
        type: Number,
        required: true
    },
    bossStage: {
        type: Number,
        required: true
    },
    inventory: {
        type: Array,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
