import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistrationPage.css";

function RegistrationPage({ onRegister, registrationError }) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleOnInputChange = (event) => {
    form[event.target.name] = event.target.value;
    setForm({ ...form });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const status = await onRegister(form);

    console.log(status);

    if (status) {
      navigate("/activity");
    }
  };

  return (
    <div className="login-container">
      {registrationError && <p className="error">{registrationError}</p>}
      <div className="login">
        <h1 className="label">Registration</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="">
            <div>
              <input
                className="input-field"
                type="text"
                name="first_name"
                placeholder="First Name"
                value={form.first_name}
                onChange={handleOnInputChange}
              />
              {/* {errors.firstName && <span className="error">{errors.firstName}</span>} */}
            </div>
            <div>
              <input
                className="input-field"
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={form.last_name}
                onChange={handleOnInputChange}
              />
              {/* {errors.lastName && <span className="error">{errors.lastName}</span>} */}
            </div>
          </div>

          <div>
            <input
              className="input-field"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleOnInputChange}
            />
            {/* {errors.email && <span className="error">{errors.email}</span>} */}
          </div>

          <div>
            <input
              className="input-field"
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleOnInputChange}
            />
            {/* {errors.password && <span className="error">{errors.password}</span>} */}
          </div>

          <div>
            <input
              className="input-field"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleOnInputChange}
            />
            {/* {errors.password && <span className="error">{errors.password}</span>} */}
          </div>

          <div>
            <button className="account-button" type="submit">
              Register
            </button>
          </div>

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
    </div>
  );
}

export default RegistrationPage;
