/**
 * @file Defines the main application.
 * @module server
 * @author Alex Palm
 */

import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { connectToDatabase } from './config/mongoose.js'
import { router } from './routes/router.js'
import cookieParser from 'cookie-parser'
import { flashMiddleware } from './middleware/flash.js'


  try {
    // Anslut till databasen
    await connectToDatabase(process.env.DB_CONNECTION_STRING)

    // Skapa Express-applikationen
    const app = express()

    // Hämta katalogens fullständiga namn
    const directoryFullName = dirname(fileURLToPath(import.meta.url))

    // Ställ in vy-motorn och vyer
    app.set('view engine', 'ejs')
    app.set('views', join(directoryFullName, 'views'))
    app.set('layout', 'layouts/default')
    app.set('layout extractScripts', true)
    app.set('layout extractStyles', true)
    app.use(expressLayouts)

    // Middleware för att tolka URL-kodade data
    app.use(express.urlencoded({ extended: false }))

    app.use(cookieParser())
    app.use(flashMiddleware)

    // Servera statiska filer
    app.use(express.static(join(directoryFullName, '..', 'public')))

    // Middleware för att skicka bas-URL till vyer
    app.use((req, res, next) => {
      res.locals.baseURL = req.baseUrl
      next()
    })

    // Registrera routes
    app.use('/', router)

    // Middleware för 404-fel
    app.use((req, res, next) => {
      res.status(404).sendFile(join(directoryFullName, 'views', 'errors', '404.html'))
    })

    // Middleware för felhantering
    app.use((err, req, res, next) => {
      console.error(err.stack)
      res.status(500).sendFile(join(directoryFullName, 'views', 'errors', '500.html'))
    })

    // Starta servern
    const server = app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${server.address().port}`)
      console.log('Press Ctrl-C to terminate...')
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
