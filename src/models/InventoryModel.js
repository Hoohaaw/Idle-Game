// models/Resource.js
import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true, 
  },
});

export const InventoryModel = mongoose.model('Inventory', inventorySchema);