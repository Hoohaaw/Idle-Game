import { RegisterModel } from '../models/RegisterModel.js'
import { ResourceModel } from '../models/ResourceModel.js'
import { StatisticsModel } from '../models/StatisticsModel.js'
import { InventoryModel } from '../models/InventoryModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export class UserController {
  // --- Registration ---
  async createUser(req, res) {
    try {
      const { username, password } = req.body
      await this.validateUserInput(username, password)

      // hash + save user
      const hashed = await bcrypt.hash(password, 10)
      const newUser = await RegisterModel.create({ username, password: hashed })

      // initialize related models
      await ResourceModel.create({ user: newUser._id })
      await StatisticsModel.create({ user: newUser._id })
      await InventoryModel.create({ user: newUser._id })

      // flash via cookie, then redirect
      res.cookie('flash', 'User created successfully! Please log in.', { maxAge: 5000 })
      return res.status(201).redirect('/login')
    } catch (err) {
      // set error flash and redirect back
      res.cookie('flash', err.message || 'Error creating user', { maxAge: 5000 })
      return res.status(400).redirect('/register')
    }
  }
      
  async validateUserInput(username, password) {
    if (!username || !password) throw new Error('Please fill in all fields')

    if (username.length < 3 || username.length > 30)
      throw new Error('Username must be between 3 and 30 characters')

    if (password.length < 8 || password.length > 80)
      throw new Error('Password must be between 8 and 80 characters')
  
    const existing = await RegisterModel.findOne({ username })
    if (existing) throw new Error('Username already exists')
    }
      

  async loginUser(req, res) {
    const { username, password } = req.body

    try {
      // validate input
      const user = await RegisterModel.findOne({ username })
      if (!user) {
        res.cookie('flash', 'Invalid credentials', { maxAge: 5000 })
        return res.status(303).redirect('/login')
      }

      // sign token
      const token = jwt.sign(
        { id: user._id, username: user.username },
        JWT_SECRET,
        { expiresIn: '7d' }
      )

      // set token in cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })

      // Welcome message via cookie
      res.cookie('flash', `Welcome, ${user.username}!`, { maxAge: 5000 })
      return res.redirect('/home')
    } catch (err) {
      // set error flash and redirect back
      res.cookie('flash', 'Login error, please try again', { maxAge: 5000 })
      return res.status(303).redirect('/login')
    }
  }

  logoutUser(req, res) {
    // clear token cookie and redirect to login
    res.clearCookie('token')
    res.cookie('flash', 'Logged out successfully!', { maxAge: 5000 })
    return res.redirect('/login')
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