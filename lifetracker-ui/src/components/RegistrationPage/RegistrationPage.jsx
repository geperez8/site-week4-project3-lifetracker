import React, { useState} from "react";
import {useNavigate} from 'react-router-dom'
import "./RegistrationPage.css";


function RegistrationPage({ onRegister, registrationError }) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });

  let navigate = useNavigate()

  const handleOnInputChange = (event) => {
    form[event.target.name] = event.target.value;
    setForm({ ...form });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const status = await onRegister(form);

    console.log(status);

    if (status){
      navigate("/activity")
    }
 
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="split-inputs">
          <div className="input-field">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              name="first_name"
              placeholder="Name"
              value={form.first_name}
              onChange={handleOnInputChange}
            />
            {/* {errors.firstName && <span className="error">{errors.firstName}</span>} */}
          </div>
          <div className="input-field">
            <label htmlFor="name">Last Name</label>
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleOnInputChange}
            />
            {/* {errors.lastName && <span className="error">{errors.lastName}</span>} */}
          </div>
        </div>

        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={form.email}
            onChange={handleOnInputChange}
          />
          {/* {errors.email && <span className="error">{errors.email}</span>} */}
        </div>

        <div className="input-field">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleOnInputChange}
          />
          {/* {errors.password && <span className="error">{errors.password}</span>} */}
        </div>

        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={form.password}
            onChange={handleOnInputChange}
          />
          {/* {errors.password && <span className="error">{errors.password}</span>} */}
        </div>

        <div>
          <button type="submit">Register</button>
        </div>

        {registrationError && <p>{registrationError}</p>}

        {/* <div className="input-field">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="confirm password"
              value={form.passwordConfirm}
              onChange={handleOnInputChange}
            />
            {errors.passwordConfirm && <span className="error">{errors.passwordConfirm}</span>}
          </div> */}

        {/* <button className="btn" disabled={isLoading} onClick={handleOnSubmit}>
            {isLoading ? "Loading..." : "Create Account"}
          </button> */}
      </form>
    </div>
  );
}

export default RegistrationPage;
