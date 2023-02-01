import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaGithub } from 'react-icons/fa'
import { login, reset } from '../../features/auth/authSlice'
import Spinner from '../../components/Core/Spinner/Spinner'
import StrikeThroughHeader from '../../components/Core/StrikethroughHeader/StrikeThroughHeader'
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

function LoginForm() {
  //set the default state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/dashboard')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password,
    }

    if (!emailRegex.test(email) || !email) {
      toast.error('Invalid email')
      return
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    )
  }
  return (
    <>
      <form
        onSubmit={onSubmit}
        onChange={onChange}
      >
        <div className='form-group'>
          <input
            type='text'
            className='formControl'
            id='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={onChange}
          />
          <input
            type='password'
            className='formControl'
            id='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <button
            type='submit'
            className='btn btn-block'
          >
            Login
          </button>
        </div>
        <div className='form-group'>
          <StrikeThroughHeader
            text='or'
            Size='h1'
          />
        </div>
        <div className='form-group'>
          <button
            className='btn btn-block btn-purple disabled'
            disabled
          >
            <FaGithub /> login with GitHub
          </button>
        </div>
      </form>
    </>
  )
}

export default LoginForm
