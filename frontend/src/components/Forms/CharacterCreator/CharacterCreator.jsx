import { React, useState, useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import { toast } from 'react-toastify'

function CharacterCreator({ socket }) {
  const [SelectedColour, setSelectedColour] = useState('#000')
  const [InputPlayerName, setInputPlayerName] = useState(null)
  const [changesSaved, setChangesSaved] = useState(false)

  const CreatePlayer = () => {
    const playerData = { username: InputPlayerName, colour: SelectedColour }

    socket.emit('createPlayer', playerData, (response) => {
      setChangesSaved(response.success)
      if (!response.success) {
        toast.error(response.message)
      } else {
        toast.done('updated player ')
      }
    })
  }

  const onNameChange = (e) => {
    setInputPlayerName(e.target.value)
  }

  const handleOnBlur = (e) => {
    CreatePlayer()
  }

  return (
    <>
      <section>
        <form>
          <div className='form-group'>
            <label>
              Name:
              <input
                name='InputUserName'
                onChange={onNameChange}
                onBlur={handleOnBlur}
              ></input>
            </label>
          </div>

          <div className='form-group'>
            <label>Colour:</label>
            <HexColorPicker
              color={SelectedColour}
              onChange={setSelectedColour}
            />
          </div>
        </form>
      </section>
    </>
  )
}

export default CharacterCreator
