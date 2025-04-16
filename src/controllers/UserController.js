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
                console.log('User not found')
                return
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if (isPasswordMatch) {
                // Ensure session object exists before setting properties
                if (!req.session) {
                    req.session = {}
                }
                // creating session with user id & username
                req.session.user = {
                    id: user._id,
                    username: user.username
                }
                console.log('User logged in' + req.session.user)
                res.redirect('/game')
            } else {
                res.status(401).json({ message: 'Invalid password' })
            }
        } catch (err) {
            console.log(err.message)
            res.status(500).json({ message: err.message })
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
}