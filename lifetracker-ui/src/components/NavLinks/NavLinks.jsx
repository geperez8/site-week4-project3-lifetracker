import React from "react";
import "./NavLinks.css";
import { Link, useNavigate } from "react-router-dom";

function NavLinks({ loggedin, logoutUser }) {
  // way to distinguish if a user is logged in is tentative

  let navigate = useNavigate();

  const logoutHandler = () => {
    logoutUser();

    navigate("/");
  };
  return (
    <div className="nav-links">
      {/* Exercise and Sleep are space fillers at the moment */}
      {loggedin ? (
        <div className="nav-bar-items">
          <Link to="/activity" className="nav-item">Activity</Link>
          <Link className="nav-item">Exercise</Link>
          <Link to="/nutrition" className="nav-item">Nutrition</Link>
          <Link className="nav-item">Sleep</Link>
          <button className="nav-bar-button" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      ) : (
        <div className="nav-bar-items">
          <Link className="nav-bar-button" to="/login">Login</Link>
          <Link  className="nav-bar-button" to="/register">Register</Link>
        </div>
      )}
    </div>
  );
}

export default NavLinks;
