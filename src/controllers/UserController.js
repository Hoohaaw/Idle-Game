import { RegisterModel } from '../models/RegisterModel.js'
import bcrypt from 'bcrypt'

export class UserController {
    async createUser(req, res) { // Create a new user and save it to the database
        try {
          const { username, password } = req.body;
          await this.validateUserInput(username, password);
      
          const newUser = new RegisterModel({ username, password });
          await newUser.save();
      
          req.session.flash = { type: 'success', text: 'User created successfully!' };
          return res.status(201).redirect('/login');
        } catch (err) {
          req.session.flash = { type: 'error', text: err.message || 'Error creating user' };
          return res.status(400).redirect('/register');
        }
      }
      
      async validateUserInput(username, password) { // Validate user input before creating a new user
        if (!username || !password) {
          throw new Error('Please fill in all fields');
        }
      
        if (username.length < 3 || username.length > 30) {
          throw new Error('Username must be between 3 and 30 characters');
        }
      
        if (password.length < 8 || password.length > 80) {
          throw new Error('Password must be between 8 and 80 characters');
        }
      
        const existingUser = await RegisterModel.findOne({ username });
        if (existingUser) {
          throw new Error('Username already exists');
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