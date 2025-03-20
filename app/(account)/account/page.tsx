import React from 'react'
import Welcome from '../components/Welcome/Welcome'
import styles from './page.module.css'
import TabView from '../components/TabView/TabView'
import CheckUser from '../components/CheckUser/CheckUser'

const Account = () => {
  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <CheckUser />
        <Welcome />
        <TabView />
      </main>
    </div>
  )
}

export default Account