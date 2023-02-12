import { React, useState, useEffect } from 'react'

import Chat from '../../components/Chat/Chat'
import styles from './Lobby.module.css'

const regex = /\b[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b/
const data = 'pinging all day long'

function Lobby({ socket }) {
  const [lastPong, setLastPong] = useState(null)
  const [IsConnected, setIsConnected] = useState(socket.connected)
  const RoomId = window.location.pathname.match(regex)[0]

  socket.on('pong', () => {
    setLastPong(new Date().toISOString())
  })

  const sendPing = (event) => {
    socket.emit('ping', data)
    event.preventDefault()
  }

  useEffect(() => {
    setIsConnected(socket.connected)
  }, [socket.connected])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.gameContainer}>
          <p>RoomId: {RoomId || '-'}</p>

          <p>Connected: {IsConnected || '-'}</p>
          <p>Last pong: {lastPong || '-'}</p>
          <button
            className='btn'
            onClick={sendPing}
          >
            Send Ping
          </button>
        </div>

        <Chat
          className={styles.chatContainer}
          socket={socket}
          roomId={RoomId}
        />
      </div>
    </>
  )
}

export default Lobby
