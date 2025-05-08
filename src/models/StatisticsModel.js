import mongoose from 'mongoose';

const statisticsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register',
        unique: true, 
    },
    timePlayed: { type: Number, default: 0 }, // in seconds
    accountCreated: { type: Date, default: Date.now },
    missionsCompleted: { type: Number, default: 0 },
    timeOnMission: { type: Number, default: 0 }, // in seconds
    timeInMines: { type: Number, default: 0 }, // in seconds

    copperEarned: { type: Number, default: 0 },
    silverEarned: { type: Number, default: 0 },
    goldEarned: { type: Number, default: 0 },
    platinumEarned: { type: Number, default: 0 },
    woodEarned: { type: Number, default: 0 },
    coalEarned: { type: Number, default: 0 },
    stoneEarned: { type: Number, default: 0 },
    bronzeEarned: { type: Number, default: 0 },
    ironEarned: { type: Number, default: 0 },

    gearFound: { type: Number, default: 0 },
    upgradesDone: { type: Number, default: 0 },
    commonItemsFound: { type: Number, default: 0 },
    UncommanItemsFound: { type: Number, default: 0 },
    rareItemsFound: { type: Number, default: 0 },
    epicItemsFound: { type: Number, default: 0 },
    legendaryItemsFound: { type: Number, default: 0 },
    ArtifactsFound: { type: Number, default: 0 },
   
    });

export const StatisticsModel = mongoose.model('Statistics', statisticsSchema);