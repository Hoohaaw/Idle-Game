import express, { Router } from 'express';
import  authUser from '../middleware/auth.js';
import { shopItems } from '../js/shop.js';
import { ResourceModel } from '../models/ResourceModel.js';
import { InventoryModel } from '../models/InventoryModel.js';
import { StatisticsModel } from '../models/StatisticsModel.js';



const router = express.Router();
// const controller = new GameController()

// Routes for testing the game, not including Auth middleware to skip logging in
router.get('/home', (req, res) => { res.render('./game/dashboard', { layout: 'layouts/dashboard-layout'});});
router.get('/inventory',(req, res) => { res.render('./game/inventory');});
router.get('/upgrade',(req, res) => { res.render('./game/upgrade');}); 
router.get('/shop', (req, res) => { const items = shopItems(); res.render('./game/shop', { items });});







// router.get('/home', authUser, (req, res) => {
//     res.render('./game/dashboard', { 
//         user: req.session.user.username,
//         id: req.session.user.id,});
// });
// router.get('/shop', authUser, (req, res) => { const items = shopItems(); res.render('./game/shop', { items });});
router.get('/statistics', authUser,async (req, res) => { 
    const user = req.session.user;
    const statistics = await getStatisticsById(user.id);
    res.render('./game/statistics', { user, statistics });
});

async function getResourcesById(userId) {
    const resources = await ResourceModel.findOne({ user: userId });
    if (!resources) {
        throw new Error('Resources not found for user ID: ' + userId);
    }
}
async function getInventoryById(userId) {
    const inventory = await InventoryModel.findOne({ user: userId });
    if (!inventory) {
        throw new Error('Inventory not found for user ID: ' + userId);
    }
}
async function getStatisticsById(userId) {
    const statistics = await StatisticsModel.findOne({ user: userId });
    if (!statistics) {
        throw new Error('Statistics not found for user ID: ' + userId);
    }
    console.log(statistics);
    return statistics;
}
// router.get('/upgrade', authUser,(req, res) => { res.render('./game/upgrade');});
router.get('/talents', authUser,(req, res) => { res.render('./game/talents');});
router.get('/team', authUser,(req, res) => { res.render('./game/team');});
// router.get('/inventory', authUser,(req, res) => { res.render('./game/inventory');});
router.get('/crafting', authUser,(req, res) => { res.render('./game/crafting');});
router.get('/mines', authUser,(req, res) => { res.render('./game/mines');});
router.get('/blessings', authUser,(req, res) => { res.render('./game/blessings');});
router.get('/transcendence', authUser,(req, res) => { res.render('./game/transcendence');});


export default router;