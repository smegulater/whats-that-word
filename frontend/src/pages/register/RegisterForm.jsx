import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaRegGrimace, FaGithub } from 'react-icons/fa'

import { register } from '../../features/auth/authSlice'
import Spinner from '../../components/Core/Spinner/Spinner'
import StrikeThroughHeader from '../../components/Core/StrikethroughHeader/StrikeThroughHeader'

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
const alphanumericRegex = /^[A-Za-z0-9_.+-]*$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

function RegisterForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
      })
    
      const { name, email, password, password2 } = formData
    
      const navigate = useNavigate()
      const dispatch = useDispatch()
    
      const { user, isLoading, isError, isSuccess } = useSelector((state) => state.auth)
    
      useEffect(() => {
        if (isSuccess || user) {
          navigate('/dashboard')
        }
      }, [user, isSuccess, navigate])
    
      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    
      const onSubmit = (e) => {
        e.preventDefault()
    
        if (!alphanumericRegex.test(name) || !name) {
          toast.error('Username is invalid')
          return
        }
    
        if (!emailRegex.test(email) || !email) {
          toast.error('Invalid email')
          return
        }
    
        if (!passwordRegex.test(password) || !password) {
          toast.error('Password not strong enough')
          return
        }
    
        if (password !== password2) {
          toast.error('Passwords do not match')
          return
        }
    
        const userData = {
          name,
          email,
          password,
        }
    
        dispatch(register(userData))
      }
    
      if (isLoading) {
        return (
          <>
            <Spinner />
          </>
        )
      }
  return (
    <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='formControl'
              id='name'
              name='name'
              value={name}
              placeholder='Username'
              onChange={onChange}
            />
            <input
              type='text'
              className='formControl'
              id='email'
              name='email'
              value={email}
              placeholder='example@example.com'
              onChange={onChange}
            />
            <input
              type='password'
              className='formControl'
              id='password'
              name='password'
              value={password}
              placeholder='Choose password'
              onChange={onChange}
            />
            <input
              type='password'
              className='formControl'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button
              type='submit'
              className='btn btn-block'
            >
              Register
            </button>
          </div>
          {isError && (
            <div className='errorDisplay'>
              <FaRegGrimace /> <p>Oops, something has gone wrong! Do you already have an account?</p>
              <Link
                to='/login'
                className='underline'
              >
                Login instead?
              </Link>
            </div>
          )}
          <div className='form-group'>
            <StrikeThroughHeader text={"or"} Size={"h3"} />

            <button
              className='btn btn-block btn-purple disabled'
              disabled
            >
              <FaGithub /> Register with GitHub
            </button>
          </div>

        </form>
  )
}

export default RegisterForm