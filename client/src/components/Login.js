import React from 'react'
import { Link } from 'react-router-dom'

const Login = ({ onSubmit, onUsernameChange, onPasswordChange, redirect }) => {
  return (
    <div className="tile is-ancestor is-4" id="login">
      <div className="card is-4 form-card has-background-grey-lighter">
        <div className="form-header is-size-4">Sign In</div>
        <form onSubmit={onSubmit} className="card-content">
          <div className="field">
            <div className="control">
              <input
                className="input"
                name="username"
                type="text"
                placeholder="Username"
                onChange={onUsernameChange}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                className="input"
                name="password"
                type="password"
                placeholder="Password"
                onChange={onPasswordChange}
              />
            </div>
          </div>

          <div className="form-footer">
            Don't have an account yet? <Link to="/register">Register</Link> now.
          </div>

          <div className="control">
            <button className="button is-primary is-light is-fullwidth">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
