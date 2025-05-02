import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Register',
    unique: true, 
  },
  copper: { type: Number, default: 0 },
  silver: { type: Number, default: 0 },
  gold: { type: Number, default: 0 },
  platinum: { type: Number, default: 0 },
});

export const ResourceModel = mongoose.model('Resource', resourceSchema);