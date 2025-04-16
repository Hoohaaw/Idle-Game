import express, { Router } from 'express';
// import GameController from '../controllers/GameController';
// import { shopItems } from '../src/shop.js';
import  authUser from '../middleware/auth.js';



const router = express.Router();
// const controller = new GameController()

router.get('/home', authUser, (req, res) => {
    res.render('./home/dashboard', { user: req.session.user.username });
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

// router.get('/upgrade', (req, res) => {
//     res.render('upgrade');
// });

export default router;