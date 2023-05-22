import React from 'react'
import Navbar from './Navbar'
import Styles from "../styles/Header.module.css"

const Header = () => {
  return (
    <div className={Styles.header}>
      <div className={Styles.navcontainer}>
        <Navbar />
      </div>
        
    </div>
  )
}

export default Header