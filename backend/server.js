import express from 'express'
import * as dotenv from 'dotenv'
import colors from 'colors'
import { fileURLToPath } from 'url'
import path from 'path'
import { Server } from 'socket.io'

import http from 'http'
import goalsRouter from './routes/goal-routes.js'
import userRouter from './routes/user-routes.js'
import documentsRouter from './routes/document-routes.js'

import errorHandler from './middleware/errorMiddleware.js'
import connectDb from './config/db.js'

dotenv.config()
connectDb()

const port = process.env.PORT
const app = express()

const httpServer = http.createServer(app)
const io = new Server(httpServer)

// track all new namespaces:
io.of(/\/nsp-\w+/)

io.on('new_namespace', (namespace) => {
  console.log(`New namespace connected: ${namespace.name}`.yellow)
})

io.engine.on('connection_error', (err) => {
  console.log(`🔥 connection_error occured`.red.underline)
  console.log(err.req.red) // the request object
  console.log(err.code.red) // the error code, for example 1
  console.log(err.message.red) // the error message, for example "Session ID unknown"
  console.log(err.context.red) // some additional error context
})

io.on('connection', (socket) => {
  console.log(`✅ new connection from ${socket.id}`)

  socket.on('disconnecting', (reason) => {
    console.log(`🚨 Socket id:${socket.id} will be disconnected from rooms:${socket.rooms} because ${reason}`)
  })
  socket.on('disconnect', (reason) => {
    console.log(`🚨 Socket with id: ${socket.id} disconnected. ${reason}`) 
  })
})

console.log('Socket.Io server Init completed')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// setup routes
app.use('/api/goals', goalsRouter)
app.use('/api/users', userRouter)
app.use('/api/documents', documentsRouter)

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

httpServer.listen(port, () => console.log(`Server started on port ${port}`))
