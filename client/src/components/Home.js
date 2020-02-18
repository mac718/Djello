import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div id="Home" className="hero is-primary is-bold is-large">
      <div className="hero-body">
        <h1 className="is-size-1 has-text-weight-light">DJELLO</h1>
        <p>The task manager of tomorrow, today.</p>
        <div>
          <Link to="/login">
            <button className="button">Sign in</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
