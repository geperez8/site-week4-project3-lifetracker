import './App.css'
import react, { useState } from 'react'
import axios from 'axios'
import Navbar from "../Navbar/Navbar.jsx"
import Landing from '../Landing/Landing';
import LoginPage from '../LoginPage/LoginPage';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import ActivityPage from '../ActivityPage/ActivityPage';
import NutritionPage from '../NutritionPage/NutritionPage';
import AccessForbidden from '../AccessForbidden/AccessForbidden';
import NotFound from '../NotFound/NotFound';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function App() {
  const [loggedin, setLoggedIn] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [registrationError, setRegistrationError] = useState("")

  const handleRegistration = async (registrationInfo) => {
    const {first_name, last_name, email, username, password} =  registrationInfo
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({first_name, last_name, email, username, password}),
      });

      //wait for the response


      const data = await response.json();

      if (response.ok) {
        //Registration successful
        setLoggedIn(true);
        console.log(data.message); //optional - display a success message
        setRegistrationError("")
      } else {
        //Registration failed
        setRegistrationError(data.error.message)
        console.log(loginError)
      }
    } catch (error) {
      console.error("Error: ", error);
    }

  };

  const handleLogin = async (loginInfo) => {
    const {email, password} =  loginInfo
    try{
    const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
      });

      const data = await response.json();

      if (response.ok) {
        //Registration successful
        setLoggedIn(true);
        console.log(data.message); //optional - display a success message
        setLoginError("")
      } else {
        //Registration failed
        setLoginError(data.error.message)
        console.log(loginError)
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  // const handleLogIn = (loginInfo) => {
  //     const {email, password} = loginInfo
  // }

  return (
    <div className='app'>
      <Router>
        <Navbar loggedin={loggedin}/> <br/>
        <main>
            
          <div>
            <Routes>
              <Route path = "/" element = {<Landing />}></Route>
              <Route path = "/login" element = {<LoginPage loginError={loginError} onLogin={handleLogin}/>}></Route>
              <Route path = "/register" element = {<RegistrationPage onRegister={handleRegistration} registrationError={registrationError}/>}></Route>
              <Route path = "/activity" element = {loggedin ? <ActivityPage /> : <AccessForbidden />}></Route>
              <Route path = "/nutrition/*" element = {loggedin ? <NutritionPage /> : <AccessForbidden />}></Route>
              <Route path = "*" element = {<NotFound />}></Route>
            </Routes>
          </div>
          
        </main>
        </Router>
    </div>
  )
}

export default App


// const temp = await fetch("http://localhost:3001/auth/register", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: registrationInfo,
      // });