import express, { Router } from 'express';
import { UserController } from '../controllers/UserController.js';

const router = express.Router();
const controller = new UserController()


router.get('/login', (req, res) => {
    const backgroundImg = controller.getBackgroundImage()
    res.render('login', { backgroundImg });
});
router.post('/login', async (req, res) => {
    try {
        await controller.loginUser(req, res)
    } catch (err) {
        console.log(err.message)
    }
});
router.get('/register', (req, res) => {
    const backgroundImg = controller.getBackgroundImage()
    res.render('register', { backgroundImg });

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