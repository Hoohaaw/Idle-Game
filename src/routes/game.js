import express, { Router } from 'express';
// import GameController from '../controllers/GameController';
// import { shopItems } from '../src/shop.js';
import  authUser from '../middleware/auth.js';
import { shopItems } from '../js/shop.js';



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
router.get('/statistics', authUser,(req, res) => { res.render('./game/statistics', { user: req.session.user.username });});
// router.get('/upgrade', authUser,(req, res) => { res.render('./game/upgrade');});
router.get('/talents', authUser,(req, res) => { res.render('./game/talents');});
router.get('/team', authUser,(req, res) => { res.render('./game/team');});
// router.get('/inventory', authUser,(req, res) => { res.render('./game/inventory');});
router.get('/crafting', authUser,(req, res) => { res.render('./game/crafting');});
router.get('/mines', authUser,(req, res) => { res.render('./game/mines');});
router.get('/blessings', authUser,(req, res) => { res.render('./game/blessings');});
router.get('/transcendence', authUser,(req, res) => { res.render('./game/transcendence');});


export default router;