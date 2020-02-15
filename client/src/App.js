import React from 'react'
import 'bulma/css/bulma.css'
import './App.css'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import RegisterContainer from './containers/RegisterContainer'
import BoardContainer from './containers/BoardContainer'
import LoginContainer from './containers/LoginContainer'
import withAuth from './components/withAuth'

function App() {
  return (
    <Router>
      <div className="App container">
        <Switch>
          <Route path="/" exact component={withAuth(BoardContainer)} />
          <Route path="/register" component={RegisterContainer} />
          <Route path="/login" component={LoginContainer} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
