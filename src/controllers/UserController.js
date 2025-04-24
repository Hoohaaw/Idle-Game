import { RegisterModel } from '../models/RegisterModel.js'
import bcrypt from 'bcrypt'

export class UserController {

    async createUser(req, res) {
        try {
            const { username, password } = req.body
            const newUser = new RegisterModel({ username, password })
            console.log(newUser)

            await newUser.save()
            res.status(201).json(newUser)
        } catch (err) {
            console.log(err.message)
            res.status(500).json({ message: err.message })
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