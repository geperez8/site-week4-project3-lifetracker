import React from 'react'
import "./NavLinks.css"
import { Link, useNavigate } from 'react-router-dom'


function NavLinks({ loggedin, logoutUser}) {
    // way to distinguish if a user is logged in is tentative

    let navigate = useNavigate()

    const logoutHandler = () => {
      logoutUser()

      navigate("/")
    }
  return (
    <div className='nav-links'>
        {/* Exercise and Sleep are space fillers at the moment */}
        <Link to = "/activity">Activity</Link>
        <p>Exercise</p>
        <Link to = "/nutrition">Nutrition</Link>
        <p>Sleep</p>
        {loggedin ? (<button className='logout-button' onClick={logoutHandler}>Logout</button>) : 
        (<><Link to = "/login">Login</Link> 
         <Link to = "/register">Register</Link></>)}
    </div>
  )
}

export default NavLinks