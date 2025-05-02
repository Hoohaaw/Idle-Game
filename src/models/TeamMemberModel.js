import mongoose from "mongoose";
const Schema = mongoose.Schema;

const teamMemberSchema = new Schema({
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register',
        unique: true, 
      },

    name: {
        type: String,
        required: true
    },
    attack: {
        type: Number,
        required: true
    },
    health: {
        type: Number,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    experience: {
        type: Number,
        required: true
    }
})