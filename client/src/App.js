import React from 'react'
import 'bulma/css/bulma.css'
import './App.css'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Register from './components/Register'
import Board from './components/Board'
import LoginContainer from './containers/LoginContainer'
import withAuth from './components/withAuth'

function App() {
  return (
    <Router>
      <div className="App container">
        <Switch>
          <Route path="/" exact component={withAuth(Board)} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={LoginContainer} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
