import { React, useState, useEffect } from 'react'

const data = 'pinging all day long'

function Lobby({ socket }) {
  const [lastPong, setLastPong] = useState(null)
  const [InputPlayerName, setInputPlayerName] = useState(null)
  const [InputlobbyName, setInputlobbyName] = useState(null)
  useEffect(() => {
    socket.on('connect', () => {
      console.log(`✅ Connected to ws: ${socket.id}`)
    })

    socket.on('disconnect', () => {
      console.log(`🔥 Disconnected from ws`)
    })

    socket.on('pong', () => {
      setLastPong(new Date().toISOString())
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('pong')
      socket.close()
    }
  }, [socket])

  const sendPing = () => {
    socket.emit('ping', data)
  }

  const connect = () => {
    socket.connect()

    const playerData = { username: InputPlayerName }
    socket.emit('createPlayer', playerData)
  }

  const connectLobby = () => {
    const connectionData = { roomId: InputlobbyName }
    socket.emit('lobbyConnect', connectionData)
  }

  const disconnect = () => {
    socket.close()
  }

  const disconnectLobby = () => {
    const disconnectionData = { roomId: InputlobbyName }
    socket.emit('lobbyDisconnect', disconnectionData)
  }

  return (
    <>
      <div>
        <p>Connected: {'' + socket.connected}</p>
        <p>Last pong: {lastPong || '-'}</p>
        <input
          name='InputPlayerName'
          onChange={(e) => setInputPlayerName(e.target.value)}
        />
        <button onClick={connect}>Connect</button>
        <button onClick={disconnect}>disconnect</button>
        <button onClick={sendPing}>Send ping</button>
        <br />
        <input
          name='InputlobbyName'
          onChange={(e) => setInputlobbyName(e.target.value)}
        />
        <button onClick={connectLobby}>Connect to lobby</button>
        <button onClick={disconnectLobby}>Connect to lobby</button>
      </div>
    </>
  )
}

export default Lobby
