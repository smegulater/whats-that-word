import { useState } from 'react'
import styles from './ChatForm.module.css'
import { FaPaperPlane } from 'react-icons/fa'
import { toast } from 'react-toastify'
function ChatForm({ socket, roomId }) {
  const [InputMessage, setInputMessage] = useState('')

  const handleFormSubmission = (event) => {
    const data = { roomId: roomId, message: InputMessage, timestamp: new Date().toISOString() }
    socket.emit('chatMessage', data, (response) => {
      if (!response.success) {
        toast.error(response.message)
        return
      }

      setInputMessage('')
    })

    event.preventDefault()
  } 

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleFormSubmission}>
          <div className={styles.controlContainer}>
            <textarea
              className={styles.chatInput}
              placeholder={'New Message'}
              value={InputMessage}
              onChange={(e) => {
                setInputMessage(e.target.value)
              }}
            />
            <button
              className={`btn-purple ${styles.sendButton}`}
              onClick={handleFormSubmission}
            >
              <FaPaperPlane />
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ChatForm
