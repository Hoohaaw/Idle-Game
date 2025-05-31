import mongoose from "mongoose";

const missionSchema = new mongoose.Schema({
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register',
        unique: true, 
      },
    mission_id: { type: String, required: true },
    description: { type: String, required: true },
    reward: { type: Number, required: true },
    duration: { type: Number, required: true },
    isActive: { type: Boolean, default: false },
}, { timestamps: true });



export const MissionModel = mongoose.model("Mission", missionSchema);