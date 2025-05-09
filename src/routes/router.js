/**
 * @file Defines the main router.
 * @module router
 * @author Alex Palm
 */

import express from 'express';

export const router = express.Router()
import loginRouter from './login.js';
import gameRouter from './game.js'

router.use('/', loginRouter)
router.use('/', gameRouter)



// Catch 404 (ALWAYS keep this as the last route).
// router.use('/*', (req, res, next) => {
//     const statusCode = 404
//     const error = new Error(http.STATUS_CODES[statusCode])
//     error.status = statusCode
//     next(error)
//   })