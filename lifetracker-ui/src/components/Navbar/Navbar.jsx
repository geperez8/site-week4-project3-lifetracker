import React from 'react'
import "./Navbar.css"
import NavLinks from '../NavLinks/NavLinks'
import { Link } from 'react-router-dom'

function Navbar({loggedin, logoutUser}) {
  return (
    <div className='navbar'>
        <Link to = "/"><img className='logo' src="src/assets/fitness-logo.png" alt='image of man and woman running'/></Link>
      <NavLinks loggedin={loggedin} logoutUser={logoutUser}/>
    </div>
  )
}

export default Navbar