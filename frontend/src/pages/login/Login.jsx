import React from 'react'

import { FaSignInAlt } from 'react-icons/fa'
import LoginForm from './LoginForm'
import Header from '../../components/Header/Header'

import styles from './Login.module.css'

function Login() {
  return (
    <>
      <div className={styles.content}>
        <section>
          <div className={styles.icon}>
            <h1>
              <FaSignInAlt size={30} /> Login
            </h1>
          </div>
          <p> Please login to continue</p>
          <LoginForm />
        </section>
      </div>
    </>
  )
}

export default Login
