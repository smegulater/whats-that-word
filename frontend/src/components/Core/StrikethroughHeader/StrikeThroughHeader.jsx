import React from 'react'
import styles from './StrikeThroughHeader.module.css'

function StrikeThroughHeader({ text, Size }) {
  return (
    <Size className={styles.title_lines}>{text}</Size>
  )
}

export default StrikeThroughHeader
