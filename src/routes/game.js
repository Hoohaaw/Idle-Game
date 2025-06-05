import express from 'express';
// import mongoose from 'mongoose';
import  authUser from '../middleware/auth.js';
import { shopItems } from '../js/shop.js';
// import { ResourceModel } from '../models/ResourceModel.js';
// import { InventoryModel } from '../models/InventoryModel.js';
import { StatisticsModel } from '../models/StatisticsModel.js';
import { flashMiddleware } from '../middleware/flash.js';
// import { UserController } from '../controllers/UserController.js';
import { MissionController } from "../controllers/MissionController.js"


const router = express.Router();

const missionController = new MissionController();

// Setup middleware in all routes to use flash messages
router.use(flashMiddleware);

// Routes for testing the game, not including Auth middleware to skip logging in
// router.get('/home', (req, res) => { res.render('./game/dashboard', { layout: 'layouts/dashboard-layout'});});
// router.get('/inventory',(req, res) => { res.render('./game/inventory');});
// router.get('/upgrade',(req, res) => { res.render('./game/upgrade');}); 
// router.get('/shop', (req, res) => { const items = shopItems(); res.render('./game/shop', { items });});
// router.get('/talents',(req, res) => { res.render('./game/talents');});
// router.get('/team',(req, res) => { res.render('./game/team');});
// router.get('/crafting',(req, res) => { res.render('./game/crafting');});
// router.get('/mines',(req, res) => { res.render('./game/mines');});
// router.get('/blessings',(req, res) => { res.render('./game/blessings', { layout: 'layouts/blessings-layout'});});
// router.get('/transcendence',(req, res) => { res.render('./game/transcendence');});



// Main routes for the game, including Auth middleware to require login
router.get('/statistics', authUser, async (req, res, next) => {
  const { id, username } = req.user;  

try {
    const stats = await StatisticsModel.findOne( {id} );
    if (!stats) throw new Error('No stats for user');

    res.render('./game/statistics', {
      username: username,
      id: id,
      statistics: stats,
      flash: res.locals.flash,
    });
  } catch (err) {
    next(err);
  }
});

// Mission routes
router.post('/missions/start/:missionId', authUser, missionController.startMission);
router.post('/missions/complete/:missionId', authUser, missionController.completeMission);
router.delete('/missions/remove/:missionId', authUser, missionController.removeMission);


router.get('/home', authUser, (req, res) => { res.render('./game/dashboard', { layout: 'layouts/dashboard-layout'});});
router.get('/upgrade', authUser,(req, res) => { res.render('./game/upgrade');});
router.get('/talents', authUser,(req, res) => { res.render('./game/talents');});
router.get('/team', authUser,(req, res) => { res.render('./game/team');});
router.get('/shop', authUser, (req, res) => { const items = shopItems(); res.render('./game/shop', { items });});
router.get('/inventory', authUser,(req, res) => { res.render('./game/inventory');});
router.get('/crafting', authUser,(req, res) => { res.render('./game/crafting');});
router.get('/mines', authUser,(req, res) => { res.render('./game/mines');});
router.get('/blessings', authUser, (req, res) => { res.render('./game/blessings', { layout: 'layouts/blessings-layout'});});
router.get('/transcendence', authUser,(req, res) => { res.render('./game/transcendence');});




// For now not working
// async function getResourcesById(userId) {
//   const resources = await ResourceModel.findOne({ user: userId });
//   if (!resources) {
//       throw new Error('Resources not found for user ID: ' + userId);
//   }
// }
// async function getInventoryById(userId) {
//   const inventory = await InventoryModel.findOne({ user: userId });
//   if (!inventory) {
//       throw new Error('Inventory not found for user ID: ' + userId);
//   }
// }
// async function getStatisticsById(userId) {
//   const statistics = await StatisticsModel.findOne({ user: new mongoose.Types.ObjectId(userId) });
//   // console.log('User ID:', user.id, typeof user.id);

//   if (!statistics) {
//       throw new Error('Statistics not found for user ID: ' + userId);
//   }
//   console.log(statistics);
//   return statistics;
// }
export default router;