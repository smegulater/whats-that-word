import React from 'react'

import styles from './ChatMessage.module.css'

function ChatMessage({ message, sender, colour, timestamp }) {
  return (
    <div
      className={styles.messageContainer}
      style={{ backgroundColor: colour }}
    >
      <p className={styles.message}>
        <span className={styles.sender}>{sender}</span>
        &nbsp;
        <span className={styles.timestamp}>{new Date(timestamp).toLocaleTimeString()}</span>
        <br />
        <span className={styles.message}>{message}</span>
      </p>
    </div>
  )
}

export default ChatMessage
