import { React, useState, useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import CharacterCreator from '../../components/Forms/CharacterCreator/CharacterCreator'
import LobbyCreator from '../../components/Forms/LobbyCreator/LobbyCreator'

import StrikeThroughHeader from '../../components/Core/StrikethroughHeader/StrikeThroughHeader'
import styles from './Play.module.css'

const regex = /\b[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b/

function Play({ socket }) {
  const [FormData, setFormData] = useState({ username: '', colour: '#000000' })
  const [InputRoomId, setInputRoomId] = useState({ roomId: '' })

  const { username, colour } = FormData
  const navigate = useNavigate()

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }
  const onColorChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      colour: event,
    }))
  }
  const onSubmit = (event) => {
    try {
      onCreateLobby()
    } catch (err) {
      toast.error(err)
    }

    event.preventDefault()
  }

  const onCreateLobby = async () => {
    await socket.connect()
    socket.emit('createPlayer', FormData, (response) => {
      if (!response.success) {
        toast.error(response.message)
      } else {
        toast.done('created player')
      }
    })
    const newId = uuidv4().match(regex)[0]
    const connectionData = { roomId: newId }

    socket.emit('lobbyConnect', connectionData, (response) => {
      if (!response.success) {
        toast.error(response.message)
        return
      }

      navigate(`/lobby/${newId}`)
    })
  }

  const disconnectLobby = async () => {
    socket.emit('lobbyDisconnect', InputRoomId, (response) => {
      if (!response.success) {
        toast.error(response.message)
      }
    })

    socket.close()
  }

  return (
    <>
      <form
        onChange={onChange}
        onSubmit={onSubmit}
      >
        <div className={styles.flexContainer}>
          <div className='form-group'>
            <section className='flexItem'>
              <input
                type='text'
                className='formControl input-center'
                id='username'
                name='username'
                value={username}
                placeholder='Player Name'
                onChange={onChange}
              />

              <div className='form-group'>
                <HexColorPicker
                  className={styles.colorPicker}
                  id='colour'
                  name='colour'
                  color={colour}
                  onChange={onColorChange}
                />
              </div>
            </section>
          </div>

          <div className='form-group'>
            <section className='flexItem'>
              <button
                className={'btn btn-block btn-purple'}
                onClick={onSubmit}
              >
                Create new lobby
              </button>

              <StrikeThroughHeader
                Size={'h1'}
                text={'or'}
              />

              <label>
                <input
                  name='InputLobbyId'
                  placeholder='xxxx-xxxx-xxxx'
                  className='formControl input-center'
                />
              </label>
              <button
                onClick={disconnectLobby}
                className={'btn btn-block btn-purple'}
              >
                Join existing lobby
              </button>
            </section>
          </div>
        </div>
      </form>
    </>
  )
}

export default Play
