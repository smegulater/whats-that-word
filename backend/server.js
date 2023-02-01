import * as dotenv from 'dotenv'
dotenv.config()

import { fileURLToPath } from 'url'
import { Server } from 'socket.io'

import express from 'express'
import colors from 'colors'
import path from 'path'
import cors from 'cors'
import http from 'http'

import userRouter from './routes/user-routes.js'

import connectDb from './config/db.js'
import InitSocketServer from './config/socket.io.js'

import errorHandler from './middleware/errorMiddleware.js'

const port = process.env.PORT

connectDb()

const app = express()
app.use(cors())

const httpServer = http.createServer(app)
const io = InitSocketServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// setup routes
app.use('/api/users', userRouter)

//serve frontend
if (process.env.NODE_ENV === 'production') {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

httpServer.listen(port, () => console.log(`✅ Server started on port ${port}`))
