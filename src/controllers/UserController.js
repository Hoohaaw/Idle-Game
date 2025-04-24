import { RegisterModel } from '../models/RegisterModel.js'
import bcrypt from 'bcrypt'

export class UserController {

    async createUser(req, res) {
        try {
            const { username, password } = req.body
       
            if (!username || !password) {
                req.session.flash = { type: 'error', text: 'Please fill in all fields' }
                return res.status(400).redirect('/register')
            }
            const existingUser = await RegisterModel.findOne({ username })
            if (existingUser) {
                req.session.flash = { type: 'error', text: 'Username already exists' }
                return res.status(400).redirect('/register')
            }

            if (username.length < 3) {
                req.session.flash = { type: 'error', text: 'Username must be at least 3 characters long' }
                return res.status(400).redirect('/register')
            }

            if (username.length > 30) {
                req.session.flash = { type: 'error', text: 'Username must be at most 30 characters long' }
                return res.status(400).redirect('/register')
            }

            if (password.length <8) {
                req.session.flash = { type: 'error', text: 'Password must be at least 8 characters long' }
                return res.status(400).redirect('/register')
            }

            const newUser = new RegisterModel({ username, password })
            await newUser.save()
            req.session.flash = { type: 'success', text: 'User created successfully!' }
            return res.status(201).redirect('/login')
        } catch (err) {
            req.session.flash = { type: 'error', text: 'Error creating user' }
            return res.status(500).redirect('/register')
        }
    }

    async loginUser(req, res) {
        const { username, password } = req.body
        await this.getUserFromDatabase({ username })

        try {
            const user = await RegisterModel.findOne({ username })

            if (!user) {
                req.session.flash = { type: 'error', text: 'Invalid login credentials' }
                return res.status(303).redirect('/login')
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if (isPasswordMatch) {
                req.session.user = {
                    id: user._id,
                    username: user.username
                }
                req.session.flash = { type: 'success', text: 'Welcome ' + user.username + '!' }
               return res.status(303).redirect('/home')
            } else {
                req.session.flash = { type: 'error', text: 'Invalid login credentials' }
                return res.status(303).redirect('/login')
            }
        } catch (err) {
            req.session.flash = { type: 'error', text: 'Invalid login credentials' }
            res.status(303).redirect('/login')
        }
    }

    async getUserFromDatabase(username) {
        try {
            const user = await RegisterModel.find(username)
            return user

        } catch (err) {
            console.log(err.message)
        }
    }

    getBackgroundImage() {
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
        return images[Math.floor(Math.random() * images.length)]
    }
}