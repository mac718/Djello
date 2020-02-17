import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="Home container is-fluid hero is-primary is-bold">
      <div className="vertical-center">
        <h1 className="is-size-1">DJELLO</h1>
        <p>The Task Manager of Tomorrow, Today.</p>
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
