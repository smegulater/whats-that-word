import { Server } from 'socket.io'

const ALL = /\/nsp-\w+/

export default function InitSocketServer(httpServer) {
  const io = new Server(httpServer)
  const mainAdapter = io.of('/').adapter

  mainAdapter.on('create-room', (room) => {
    if (room.startsWith('Lobby_')) console.log(`🆕 lobby with name:${room} created`.green)
  })
  mainAdapter.on('delete-room', (room) => {
    if (room.startsWith('Lobby_')) console.log(`🧺 lobby with name:${room} deleted`.grey)
  })
  mainAdapter.on('join-room', (room, id) => {
    if (id != room) console.log(`➕ id:${id} joined lobby: ${room}`.brightGreen)
  })
  mainAdapter.on('leave-room', (room, id) => {
    if (id != room) console.log(`➖ id:${id} left lobby: ${room}`.yellow)
  })

  io.of(/\/nsp-\w+/).on('new_namespace', (namespace) => {
    console.log(`➕ New namespace created: ${namespace.name}`.yellow)
  })
  io.engine.on('connection_error', (err) => {
    console.log(`🔥 connection_error occured ${err.message}`.red.underline.bold)
  })

  io.on('connection', (socket) => {
    console.log(`🔌 new connection established id:${socket.id} (${socket.adapter.sids.size})`.grey)

    socket.on('ping', (data) => {
      console.log(
        `🔔 New ping from id: ${socket.id} username:${socket.data.username} 
        data: ${data}`.yellow
      )

      socket.emit('pong')
    })

    socket.on('createPlayer', (data, callback) => {
      const map = new Map(Object.entries(data))

      if (!map.has('username') || !map.has('colour')) {
        const msg = '🚨 malformed create Character request receieved'
        console.log(msg)
        callback({ success: false, message: msg })
        return
      }

      socket.data.username = map.get('username')
      socket.data.colour = map.get('colour')

      const msg = `🟢 player creation successfull id:${socket.id} username:${socket.data.username} colour:${socket.data.colour}`
      console.log(msg.green)
      callback({ success: true, message: msg })
    })

    socket.on('lobbyConnect', (data, callback) => {
      const map = new Map(Object.entries(data))

      if (!map.has('roomId')) {
        const msg = '🚨 malformed lobby connect request receieved'
        console.log(msg.red)
        callback({ success: false, message: msg })
        return
      }

      const roomName = 'Lobby_' + map.get('roomId')

      if (!socket.data.username) {
        const msg = '🚨 Cannot connect to lobby without a Player defined'
        console.log(msg.red)
        callback({ success: false, message: msg })
        return
      }

      if (!io.sockets.adapter.rooms.has(roomName)) {
        // first lobby connection - spinup game service
        // first connector is owner

        socket.join('Lobby_' + map.get('roomId'))

        const msg = `✅ Successfull lobby connection event id: ${socket.id} username: ${socket.data.username} as Host`
        console.log(msg.brightGreen)
        callback({ success: true, message: msg })
      } else {
        socket.join('Lobby_' + map.get('roomId'))

        const msg = `✅ Successfull lobby connection event id: ${socket.id} username: ${socket.data.username} as Guest`
        console.log(msg.brightGreen)
        callback({ success: true, message: msg })
      }
    })

    socket.on('lobbyDisconnect', (data, callback) => {
      const map = new Map(Object.entries(data))

      if (!map.has('roomId')) {
        const msg = '🚨 Malformed lobby leave request receieved'
        console.log(msg.red)
        callback({ success: false, message: msg })
        return
      }

      const roomName = 'Lobby_' + map.get('roomId')

      if (!socket.rooms.has(roomName)) {
        const msg = `🚨 id:${socket.id} reqested to leave a lobby it was not part of`
        console.log(msg.red)
        callback({ success: false, message: msg })
        return
      }

      socket.leave('Lobby_' + map.get('roomId'))

      const msg = `🚪 id:${socket.id} username:${socket.data.username} left lobby:${map.get('roomId')}`
      console.log(msg.yellow)
      callback({ success: true, message: msg })
    })

    socket.on('disconnecting', (reason) => {
      if (socket.data.username) {
        console.log(`⛔ id:${socket.id} username:${socket.data.username} will be disconnected: ${reason}`.grey)
      } else {
        console.log(`⛔ id:${socket.id} username:${socket.data.username} will be disconnected: ${reason}`.grey)
      }
    })
  })

  console.log('Socket.Io server init completed')

  return io
}
