import React from 'react'
import Welcome from '../components/Welcome/Welcome'
import styles from './page.module.css'
import TabView from '../components/TabView/TabView'

const Account = () => {
  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <Welcome />
        <TabView />
      </main>
    </div>
  )
}

export default Account