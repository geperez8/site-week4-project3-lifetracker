import React from 'react'
import "./Navbar.css"
import NavLinks from '../NavLinks/NavLinks'
import { Link } from 'react-router-dom'

function Navbar({isLoggedin}) {
  return (
    <nav className='navbar'>
        <Link to = "/"><img className='logo' src="src/assets/fitness-logo.png" alt='image of man and woman running'/></Link>
        <NavLinks isLoggedin={isLoggedin}/>
    </nav>
  )
}

export default Navbar