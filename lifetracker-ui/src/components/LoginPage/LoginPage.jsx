import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage({ loginError, onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleOnInputChange = (e) => {
    form[e.target.name] = e.target.value;
    setForm({ ...form });
  };

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const status = await onLogin(form);

    console.log(status);

    if (status) {
      navigate("/activity");
    }
  };
  return (
    <div className="login-container">
      <p className="error">{loginError}</p>
      <div className="login">
        <h1 className="label">Login</h1>
        <form onSubmit={handleSubmit} className="form">
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
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
