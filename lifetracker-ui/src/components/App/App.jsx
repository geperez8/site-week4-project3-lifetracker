import "./App.css";
import react, { useEffect, useState } from "react";
import ApiClient from "../../services/apiClient";
import Navbar from "../Navbar/Navbar.jsx";
import Landing from "../Landing/Landing";
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import ActivityPage from "../ActivityPage/ActivityPage";
import NutritionPage from "../NutritionPage/NutritionPage";
import AccessForbidden from "../AccessForbidden/AccessForbidden";
import NotFound from "../NotFound/NotFound";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import apiClient from "../../services/apiClient";

function App() {
  const [loggedin, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const [user, setUser] = useState({});
  

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken();
      if (data) {
        setUser({ user_id: data.user.id });
        setLoggedIn(true);
      }
    };

    const token = localStorage.getItem("LifetrackerToken");

    if (token) {
      apiClient.setToken(token);
      fetchUser();
    }
  }, []);

  const handleRegistration = async (registrationInfo) => {
    const { data, error } = await ApiClient.registerUser(registrationInfo);

    if (error) {
      setRegistrationError(error);
      return false;
    }

    if (data?.user) {
      setUser(data.user);
      ApiClient.setToken(data.token);
      setLoggedIn(true);
      setRegistrationError("");
      return true;
    }
  };

  const handleLogin = async (loginInfo) => {
    const { data, error } = await ApiClient.loginUser(loginInfo);
    console.log("data:", data);
    console.log("error:", error);
    if (error) {
      setLoginError(error);
      return false;
    }

    if (data?.user) {
      setUser(data.user);
      console.log("in log in, it is", user)
      ApiClient.setToken(data.token);
      setLoggedIn(true);
      setLoginError("");
      return true;
    }
  };

  const handleNutritionPost = async (nutritionInfo) => {
    const { data, error } = await ApiClient.postNutrition(nutritionInfo);

  };

  const logoutUser = () => {
    localStorage.setItem("LifetrackerToken", null);
    setLoggedIn(false);
  };

  return (
    <div className="app">
      <Router>
        <Navbar loggedin={loggedin} logoutUser={logoutUser} /> <br />
        <main>
          <div>
            <Routes>
              <Route path="/" element={<Landing />}></Route>
              <Route
                path="/login"
                element={
                  <LoginPage loginError={loginError} onLogin={handleLogin} />
                }
              ></Route>
              <Route
                path="/register"
                element={
                  <RegistrationPage
                    onRegister={handleRegistration}
                    registrationError={registrationError}
                  />
                }
              ></Route>
              <Route
                path="/activity"
                element={loggedin ? <ActivityPage /> : <AccessForbidden />}
              ></Route>
              <Route
                path="/nutrition/*"
                element={
                  loggedin ? (
                    <NutritionPage
                      user={user}
                      onSubmitNutrition={handleNutritionPost}
                    />
                  ) : (
                    <AccessForbidden />
                  )
                }
              ></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </div>
        </main>
      </Router>
    </div>
  );
}

export default App;

// const temp = await fetch("http://localhost:3001/auth/register", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: registrationInfo,
// });

// const {first_name, last_name, email, username, password} =  registrationInfo
// try {
//   const response = await fetch("http://localhost:3001/auth/register", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({first_name, last_name, email, username, password}),
//   });

//   //wait for the response

//   const data = await response.json();

//   if (response.ok) {
//     //Registration successful
//     setLoggedIn(true);
//     console.log(data.message); //optional - display a success message
//     setRegistrationError("")
//   } else {
//     //Registration failed
//     setRegistrationError(data.error.message)
//   }
// } catch (error) {
//   console.error("Error: ", error);
// }

//   const {email, password} =  loginInfo
//   try{
//   const response = await fetch("http://localhost:3001/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({email, password}),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       //Registration successful
//       setLoggedIn(true);
//       console.log(data.message); //optional - display a success message
//       setLoginError("")
//     } else {
//       //Registration failed
//       setLoginError(data.error.message)
//       console.log(loginError)
//     }
//   } catch (error) {
//     console.error("Error: ", error);
//   }
// }

// // const handleLogIn = (loginInfo) => {
// //     const {email, password} = loginInfo
// // }
