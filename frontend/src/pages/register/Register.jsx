import { React } from 'react'
import { FaUser } from 'react-icons/fa'
import styles from './Register.module.css'
import Header from '../../components/Header/Header'
import RegisterForm from './RegisterForm'

function Register() {
  //set the default state

  return (
    <>
        <div className={styles.content}>
          <section>
            <div className={styles.icon}>
              <h1>
                <FaUser size={25} />
                Register
              </h1>
            </div>
            <p> Please create an account to continue</p>
            <RegisterForm />
          </section>
        </div>
    </>
  )
}

export default Register
