import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Header from '../../components/Header/Header'
import styles from './Dashboard.module.css'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <>
      <div className={styles.pageLayout}>
        <div className={styles.pageHeader}>
          <Header />
        </div>
        <div className={styles.content}>
          <section className={styles.header}>
            <h1>Welcome {user && user.name}</h1>
          </section>

          <section className={styles.nav}>
          </section>

          <section className={styles.article}>
            <div className='newDoc'></div>
           
          </section>

          <section className={styles.footer}></section>
        </div>
      </div>
    </>
  )
}

export default Dashboard
