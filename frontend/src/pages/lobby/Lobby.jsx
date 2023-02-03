import { React, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import styles from './Lobby.module.css'

const data = 'pinging all day long'
function Lobby({ socket }) {
  const navigate = useNavigate()
  const [lastPong, setLastPong] = useState(null)
  const [IsConnected, setIsConnected] = useState(socket.connected)

  const regex = /\b[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b/
  const roomId = window.location.pathname.match(regex)[0]

  socket.on('pong', () => {
    setLastPong(new Date().toISOString())
  })

  useEffect(() => {
    setIsConnected(socket.connected)
  }, [socket.connected])

  const sendPing = () => {
    socket.emit('ping', data)
  }
  const onDisconnect = () => {
    socket.emit('lobbyDisconnect', { roomId: roomId }, (response) => {
      if (!response.success) {
        toast.error(response.message)
      }
    })
    navigate('/play')
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.gameContainer}>
          <p>Connected: {IsConnected || '-'}</p>
          <p>Last pong: {lastPong || '-'}</p>
          <button
            className='btn'
            onClick={sendPing}
          >
            Send Ping
          </button>
          <button
            className='btn'
            onClick={onDisconnect}
          >
            Disconnect
          </button>
        </div>
        <div className={styles.chatContainer}>
          <h1>Test</h1>
        </div>
      </div>
    </>
  )
}

export default Lobby
