import { React, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import StrikeThroughHeader from '../../Core/StrikethroughHeader/StrikeThroughHeader'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

function LobbyCreator({ socket }) {
  const navigate = useNavigate()
  const [InputLobbyId, setInputLobbyId] = useState(null)
  const [NewLobbyId, setNewLobbyId] = useState(null)

  const regex = /\b[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b/
  const connectionData = { roomId: null }

useEffect(() => {
  setNewLobbyId(uuidv4().match(regex))


}, [])




  const JoinLobby = (event) => {
    event.preventDefault()

    if (!regex.test(InputLobbyId) || !InputLobbyId) {
      toast.error('Invalid lobby Id')
      return
    }

    connectionData.roomId = InputLobbyId
    // socket.emit('lobbyConnect', connectionData, (response) => {
    //   if (!response.success) {
    //     toast.error(response.message)
    //   }
    //   //TODO: navigate to the lobby page with the lobby
    //   navigate(`/lobby/:id${InputLobbyId}`)
    // })
    
  }

  const CreateLobby = () => {
    console.log(NewLobbyId)
  }

  return (
    <>
      <form>
        <section>
          <div className='form-group'>
            <button onClick={CreateLobby}>Create new lobby</button>
          </div>
          <StrikeThroughHeader
            Size={'h1'}
            text={'or'}
          />
          <div className='form-group'>
            <button onClick={JoinLobby}>Join existing lobby</button>
            <label>Lobby Id:</label>
            <input
              name='InputLobbyId'
              placeholder='xxxx-xxxx-xxxx'
              onChange={setInputLobbyId}
            />
          </div>
        </section>
      </form>
    </>
  )
}

export default LobbyCreator
