import React from "react";
import "../Hero/Hero.css"

function Hero() {
  return (
    <div className="hero">
      <div className="blurb">
        <h1>Welcome to Lifetracker</h1>
        <h3>Track your sleep, nutrition, and workouts within our tabs</h3>
      </div>

      <img src="https://cdn-icons-png.flaticon.com/512/1786/1786614.png" />
    </div>
  );
}

export default Hero;
