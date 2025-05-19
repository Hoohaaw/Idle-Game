/* eslint-disable no-undef */
import { expect, jest } from '@jest/globals'
import { UserController } from '../src/controllers/UserController.js'
import { RegisterModel } from '../src/models/RegisterModel.js'
import { ResourceModel } from '../src/models/ResourceModel.js'
import { StatisticsModel } from '../src/models/StatisticsModel.js'
import { InventoryModel } from '../src/models/InventoryModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import express from 'express'
import request from 'supertest'
import cookieParser from 'cookie-parser'
import gameRouter from '../src/routes/game.js'
import loginRouter from '../src/routes/login.js'
import mongoose, { mongo } from 'mongoose'

import expressLayouts from 'express-ejs-layouts'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { router } from '../src/routes/router.js'
import { flashMiddleware } from '../src/middleware/flash.js'
import { MongoMemoryServer } from 'mongodb-memory-server'


let mongoServer


process.env.JWT_SECRET = 'testsecret'

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  // await mongoose.connect('mongodb+srv://vercel-admin-user:bDeWTXHoh5EK4fZK@idle-cluster.rnxon.mongodb.net/Users?retryWrites=true&w=majority', {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // })
})

afterEach(async () => {
  // Clean all collections after each test
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
    jest.resetAllMocks()
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();

  // await mongoose.connection.close()
})

  // Skapa Express-applikationen
    const app = express()
    const directoryFullName = dirname(fileURLToPath(import.meta.url))
    app.set('view engine', 'ejs')
    app.set('views', join(directoryFullName, '../src/views'))
    app.set('layout', 'layouts/default')
    app.set('layout extractScripts', true)
    app.set('layout extractStyles', true)
    app.use(expressLayouts)
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    app.use(cookieParser())
    app.use(flashMiddleware)
    app.use(express.static(join(directoryFullName, '..', 'public')))

    app.use('/', router)
    app.use((req, res, next) => {
      res.locals.baseURL = req.baseUrl
      next()
    })
    app.use((req, res) => {
      res.status(404).sendFile(join(directoryFullName, 'views', 'errors', '404.html'))
    })
    app.use((err, req, res) => {
      console.error(err.stack)
      res.status(500).sendFile(join(directoryFullName, 'views', 'errors', '500.html'))
    })


// describe('POST /login', () => {
//   test('should return 302 and redirect to /home on successful login', async () => {
//     const user = {
//       username: 'alextest',
//       password: 'alextest'
//     };

//     const response = await request(app)
//       .post('/login')
//       .send(user);

//     expect(response.status).toBe(302); // Check the redirect status
//     expect(response.headers.location).toBe('/home'); // Check the Location header
//   });
// });

describe('GET routes', () => {
  test('Should return 200 and successfully get the home page', async () => {
    const response = await request(app).get('/home');
    expect(response.status).toEqual(200);
  });

  test('Should return 200 and successfully get the inventory page', async () => {
    const response = await request(app).get('/inventory');
    expect(response.status).toEqual(200);
  });

  test('Should return 200 and successfully get the upgrade page', async () => {
    const response = await request(app).get('/upgrade');
    expect(response.status).toEqual(200);
  });

  test('Should return 200 and successfully get the shop page', async () => {
    const response = await request(app).get('/shop');
    expect(response.status).toEqual(200);
  });

  test('Should return 200 and successfully get the talents page', async () => {
    const response = await request(app).get('/talents');
    expect(response.status).toEqual(200);
  });

  test('Should return 200 and successfully get the team page', async () => {
    const response = await request(app).get('/team');
    expect(response.status).toEqual(200);
  });

  test('Should return 200 and successfully get the crafting page', async () => {
    const response = await request(app).get('/crafting');
    expect(response.status).toEqual(200);
  });

  test('Should return 200 and successfully get the mines page', async () => {
    const response = await request(app).get('/mines');
    expect(response.status).toEqual(200);
  });

  test('Should return 200 and successfully get the blessings page', async () => {
    const response = await request(app).get('/blessings');
    expect(response.status).toEqual(200);
  });

  test('Should return 200 and successfully get the transcendence page', async () => {
    const response = await request(app).get('/transcendence');
    expect(response.status).toEqual(200);
  });
})

describe('MongoDB Connection', () => {
  test('should connect to MongoDB successfully', () => {
    const connectionState = mongoose.connection.readyState
    // 1 = connected, 0 = disconnected, 2 = connecting, 3 = disconnecting
    expect(connectionState).toBe(1)
  })
})




describe('UserController', () => {
  let userController
  let req, res

  beforeEach(() => {
    userController = new UserController()
    req = { body: {} }
    res = {
      cookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      redirect: jest.fn().mockReturnThis(),
      clearCookie: jest.fn()
    }
  })

  test('POST /register should create a user and related models', async () => {
  const response = await request(app)
    .post('/register')
    .send({ username: 'testuser', password: 'testpass' })

  expect(response.status).toBe(302)
  expect(response.headers['set-cookie'][0]).toMatch(/flash=User%20created%20successfully/i)
  expect(response.headers['location']).toBe('/login')

  const user = await RegisterModel.findOne({ username: 'testuser' })
  expect(user).not.toBeNull()

  const resource = await ResourceModel.findOne({ user: user._id })
  const stats = await StatisticsModel.findOne({ user: user._id })
  const inventory = await InventoryModel.findOne({ user: user._id })

  expect(resource).not.toBeNull()
  expect(stats).not.toBeNull()
  expect(inventory).not.toBeNull()

  expect(user.password).not.toBe('testpass')
  const isMatch = await bcrypt.compare('testpass', user.password)
  expect(isMatch).toBe(true)
})

test('POST /login should authenticate user and set token cookie', async () => {
  // First, register the user
  const registerResponse = await request(app)
    .post('/register')
    .send({ username: 'testuser', password: 'testpass' })

  expect(registerResponse.status).toBe(302) // registration redirect

  // Then, login with the same user
  const loginResponse = await request(app)
    .post('/login')
    .send({ username: 'testuser', password: 'testpass' })

  expect(loginResponse.status).toBe(302) // login redirect
  // expect(response.headers['set-cookie'][0]).toMatch(/flash=User%20created%20successfully/i)

  expect(loginResponse.headers['location']).toBe('/home') // redirected to /home
})




  describe('validateUserInput', () => {
    it('throws if username or password missing', async () => {
      await expect(userController.validateUserInput('', '')).rejects.toThrow('Please fill in all fields')
    })

    it('throws if username too short or long', async () => {
      await expect(userController.validateUserInput('ab', 'password123')).rejects.toThrow('Username must be between 3 and 30 characters')
      const longName = 'a'.repeat(31)
      await expect(userController.validateUserInput(longName, 'password123')).rejects.toThrow('Username must be between 3 and 30 characters')
    })

    it('throws if password too short or long', async () => {
      await expect(userController.validateUserInput('username', 'short')).rejects.toThrow('Password must be between 8 and 80 characters')
      const longPass = 'a'.repeat(81)
      await expect(userController.validateUserInput('username', longPass)).rejects.toThrow('Password must be between 8 and 80 characters')
    })

    // it('throws if username already exists', async () => {
    //   RegisterModel.findOne.mockResolvedValue({ _id: '123' })
    //   await expect(userController.validateUserInput('username', 'password123')).rejects.toThrow('Username already exists')
    // })

    // it('resolves when input is valid and username is unique', async () => {
    //   RegisterModel.findOne.mockResolvedValue(null)
    //   await expect(userController.validateUserInput('validUser', 'validPass123')).resolves.toBeUndefined()
    // })
  })

  describe('createUser', () => {
    beforeEach(() => {
      req.body = { username: 'newUser', password: 'password123' }
      jest.spyOn(userController, 'validateUserInput').mockResolvedValue()
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPass')
    })


    it('handles errors by setting error flash and redirecting to register', async () => {
      jest.spyOn(userController, 'validateUserInput').mockRejectedValue(new Error('Validation error'))

      await userController.createUser(req, res)

      expect(res.cookie).toHaveBeenCalledWith('flash', 'Validation error', { maxAge: 5000 })
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.redirect).toHaveBeenCalledWith('/register')
    })
  })


  describe('logoutUser', () => {
    it('clears token cookie, sets flash, and redirects to login', () => {
      userController.logoutUser(req, res)

      expect(res.clearCookie).toHaveBeenCalledWith('token')
      expect(res.cookie).toHaveBeenCalledWith('flash', 'Logged out successfully!', { maxAge: 5000 })
      expect(res.redirect).toHaveBeenCalledWith('/login')
    })
  })

  describe('getBackgroundImage', () => {
    it('returns a valid image path from the list', () => {
      const images = [
        '/images/bgs/bg0.jpg', '/images/bgs/bg1.jpg', '/images/bgs/bg2.jpg',
        '/images/bgs/bg3.jpg', '/images/bgs/bg4.jpg', '/images/bgs/bg5.jpg',
        '/images/bgs/bg6.jpg', '/images/bgs/bg7.jpg', '/images/bgs/bg8.jpg'
      ]
      const img = userController.getBackgroundImage()
      expect(images).toContain(img)
    })
  })
})
