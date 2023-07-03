import React, {useState} from 'react'
import "./LoginPage.css"

function LoginPage({loginError, onLogin}) {
  const [form, setForm] = useState({"email":"", "name":""})

  const handleOnInputChange = (e) => {
    form[e.target.name] = e.target.value
    setForm({... form})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const status = onLogin(form);

    console.log(status)

    // if (status){
    //   useNavigate("/")
    // }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleOnInputChange}
            />
            {/* {errors.email && <span className="error">{errors.email}</span>} */}
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleOnInputChange}
            />
            {/* {errors.password && <span className="error">{errors.password}</span>} */}
          </div>

          <div>
            <button type="submit">Login</button>
          </div>

          <p>{loginError}</p>
        </form>
    </div>
  )
}

export default LoginPage