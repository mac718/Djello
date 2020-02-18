import React from 'react'
import { Link } from 'react-router-dom'

const Register = ({ onSubmit, onUsernameChange, onPasswordChange }) => {
  return (
    <div className="tile is-ancestor is-4" id="register">
      <div className="card is-4 form-card has-background-grey-lighter">
        <div className="form-header is-size-4">Create a New Account</div>
        <form onSubmit={onSubmit} className="card-content">
          <div className="field">
            <div className="control">
              <input
                className="input"
                name="username"
                type="email"
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
            Already have an account? <Link to="/login">Log In here!</Link>
          </div>

          <div className="control">
            <button className="button is-primary is-light is-fullwidth">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
