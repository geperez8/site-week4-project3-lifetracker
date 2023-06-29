import './App.css'
import react from 'react'
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
  const loggedin = false //temporary definition
  return (
    <div className='app'>
      <Router>
        <Navbar /> <br/>
        <main>
            
          <div>
            <Routes>
              <Route path = "/" element = {<Landing />}></Route>
              <Route path = "/login" element = {<LoginPage />}></Route>
              <Route path = "/register" element = {<RegistrationPage />}></Route>
              <Route path = "/activity" element = {loggedin ? <ActivityPage /> : <AccessForbidden />}></Route>
              <Route path = "/nutririon/*" element = {loggedin ? <NutritionPage /> : <AccessForbidden />}></Route>
              <Route path = "*" element = {<NotFound />}></Route>
            </Routes>
          </div>
          
        </main>
        </Router>
    </div>
  )
}

export default App
