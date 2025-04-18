import express, { Router } from 'express';
// import GameController from '../controllers/GameController';
// import { shopItems } from '../src/shop.js';
import  authUser from '../middleware/auth.js';



const router = express.Router();
// const controller = new GameController()

router.get('/home', authUser, (req, res) => {
    res.render('./game/dashboard', { 
        user: req.session.user.username,
        id: req.session.user.id,});
});

// router.get('/statistics', async (req, res) => {

//     const name = req.session.user.username

//     async function getUserData(name) {
//         try {
//             const user = await RegisterModel.findOne({ username: name }).exec()
//             if (user) {
//                 return user
//             }
//         } catch (err) {
//             console.error(err)
//             process.exit(1)
//         }
//     }
//     const userData = await getUserData(name)
//     res.render('statistics', { titel: userData });
// });

// router.get('/shop', (req, res) => {
//     const items = shopItems()
//     res.render('shop', { items });
// });

// router.get('/adventure', (req, res) => {
//     res.render('adventure');
// });

// router.get('/boss', (req, res) => {
//     res.render('boss');
// }); 

router.get('/shop', authUser, (req, res) => { res.render('./game/shop');});
router.get('/statistics', authUser,(req, res) => { res.render('./game/statistics', { user: req.session.user.username });});
router.get('/upgrade', authUser,(req, res) => { res.render('./game/upgrade');});
router.get('/talents', authUser,(req, res) => { res.render('./game/talents');});
router.get('/team', authUser,(req, res) => { res.render('./game/team');});
router.get('/inventory', authUser,(req, res) => { res.render('./game/inventory');});
router.get('/crafting', authUser,(req, res) => { res.render('./game/crafting');});
router.get('/mines', authUser,(req, res) => { res.render('./game/mines');});
router.get('/blessings', authUser,(req, res) => { res.render('./game/blessings');});
router.get('/transcendence', authUser,(req, res) => { res.render('./game/transcendence');});


export default router;