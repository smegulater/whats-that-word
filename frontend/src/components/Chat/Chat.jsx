import { React, useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'

import styles from './Chat.module.css'
import ChatForm from './ChatForm/ChatForm'
import ChatMessage from './ChatMessage/ChatMessage'
function Chat({ socket, roomId }) {
  const [ChatMessages, setChatMessages] = useState([])
  const bottomRef = useRef(null)

  useEffect(() => {
    socket.on('chatMessage', (data) => setChatMessages([...ChatMessages, data]))
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [socket, ChatMessages])

  return (
    <div className={styles.container}>
      <div className={styles.chatMessageContainer}>
        {[...ChatMessages].map((k) => {
          return (
            <ChatMessage
              className={styles.chatMessage}
              message={k.message}
              sender={k.username}
              colour={k.colour}
              timestamp={k.timestamp}
              key={uuidv4()}
            />
          )
        })}
        <div ref={bottomRef} />
      </div>
      <div className={styles.chatInput}>
        <ChatForm
          socket={socket}
          roomId={roomId}
        />
      </div>
    </div>
  )
}

export default Chat
