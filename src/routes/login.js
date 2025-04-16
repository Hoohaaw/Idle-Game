import express, { Router } from 'express';
import { UserController } from '../controllers/UserController.js';

const router = express.Router();
const controller = new UserController()


router.get('/login', (req, res) => {
    const images = [
        "/images/bgs/bg0.jpg", 
        "/images/bgs/bg1.jpg",
        "/images/bgs/bg2.jpg",
        "/images/bgs/bg3.jpg",
        "/images/bgs/bg4.jpg",
        "/images/bgs/bg5.jpg",
        "/images/bgs/bg6.jpg",
        "/images/bgs/bg7.jpg",
        "/images/bgs/bg8.jpg"
    ]
    const randomImage = images[Math.floor(Math.random() * images.length)]
    res.render('login', { randomImage });
});
router.post('/login', async (req, res) => {
    try {
        await controller.loginUser(req, res)
    } catch (err) {
        console.log(err.message)
    }
});
router.get('/register', (req, res) => {
    const images = [
        "/images/bgs/bg0.jpg", 
        "/images/bgs/bg1.jpg",
        "/images/bgs/bg2.jpg",
        "/images/bgs/bg3.jpg",
        "/images/bgs/bg4.jpg",
        "/images/bgs/bg5.jpg",
        "/images/bgs/bg6.jpg",
        "/images/bgs/bg7.jpg",
        "/images/bgs/bg8.jpg"
    ]
    const randomImage = images[Math.floor(Math.random() * images.length)]
    res.render('register', { randomImage });

});
router.post('/register', async (req, res) => {
    try {
        await controller.createUser(req, res)
    } catch (err) {
        console.log(err.message)
    }
});

router.get('/testRoute', (req, res) => {
    res.render('TestFolder/testRoute')
});

export default router;