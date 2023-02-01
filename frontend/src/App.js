import { React } from 'react'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import io from 'socket.io-client'

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Dashboard from './pages/dashboard/Dashboard'
import Lobby from './pages/lobby/Lobby'

import Header from './components/Header/Header'

import 'react-toastify/dist/ReactToastify.css'
import styles from './App.module.css'

const socket = io({
  autoConnect: false,
})

function App() {
  return (
    <>
      <Router>
        <div className={styles.container}>
          <div className={styles.header}>
            <Header />
          </div>
          <div className={styles.content}>
            <Routes>
              <Route
                path='/'
                element={<Home />}
              />
              <Route
                path='/dashboard'
                element={<Dashboard />}
              />
              <Route
                path='/login'
                element={<Login />}
              />
              <Route
                path='/register'
                element={<Register />}
              />
              <Route
                path='/lobby'
                element={<Lobby socket={socket} />}
              />
            </Routes>
          </div>
          <div className={styles.footer}>
            <p>footer</p>
          </div>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
