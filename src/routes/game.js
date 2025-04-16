import express, { Router } from 'express';
import { RegisterModel } from '../models/RegisterModel.js'
import { shopItems } from '../src/shop.js';


const router = express.Router();

router.get('/home', (req, res) => {
    res.render('home');
});

router.get('/statistics', async (req, res) => {

    const name = req.session.user.username

    async function getUserData(name) {
        try {
            const user = await RegisterModel.findOne({ username: name }).exec()
            if (user) {
                return user
            }
        } catch (err) {
            console.error(err)
            process.exit(1)
        }
    }
    const userData = await getUserData(name)
    res.render('statistics', { titel: userData });
});

router.get('/shop', (req, res) => {
    const items = shopItems()
    res.render('shop', { items });
});

router.get('/adventure', (req, res) => {
    res.render('adventure');
});

router.get('/boss', (req, res) => {
    res.render('boss');
});

router.get('/upgrade', (req, res) => {
    res.render('upgrade');
});

export default router;