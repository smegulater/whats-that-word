import React from 'react'

import { FaSignInAlt, FaSignOutAlt, FaUser, FaPlay } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
import styles from './Header.module.css'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const Logout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          {user ? (
            <Link to='/dashboard'>🤔 Whats that word</Link>
          ) : (
            <Link to='/'>
              <span>🤔 Whats that word</span>
            </Link>
          )}
        </div>
        <ul>
          <li>
            <Link to='/play'>
              <FaPlay /> Play
            </Link>
          </li>

          {user ? (
            <li>
              <button
                className='btn'
                onClick={Logout}
              >
                <FaSignOutAlt /> Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to='/login'>
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to='/register'>
                  <FaUser /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </>
  )
}

export default Header
