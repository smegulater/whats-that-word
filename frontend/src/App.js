import { React, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import io from 'socket.io-client'

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Dashboard from './pages/dashboard/Dashboard'
import Lobby from './pages/lobby/Lobby'
import Play from './pages/play/Play'
import Header from './components/Header/Header'

import 'react-toastify/dist/ReactToastify.css'
import styles from './App.module.css'

const socket = io({
  autoConnect: false,
})

function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log(`✅ Connected to ws: ${socket.id}`)
    })

    socket.on('disconnect', () => {
      console.log(`🔥 Disconnected from ws`)
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.close()
    }
  }, [])

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
                path='/play'
                element={<Play socket={socket} />}
              />
              <Route
                path='/lobby/:roomId'
                element={<Lobby socket={socket} />}
              />
            </Routes>
          </div>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
