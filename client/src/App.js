import React from 'react'
import 'bulma/css/bulma.css'
import './App.css'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import RegisterContainer from './containers/RegisterContainer'
import BoardContainer from './containers/BoardContainer'
import LoginContainer from './containers/LoginContainer'
import withAuth from './components/withAuth'
import ShowContainer from './containers/ShowContainer'
import Home from './components/Home'

function App() {
  return (
    <Router>
      <div className="App container is-fluid">
        <Switch>
          {/* <Route path="/" exact component={BoardContainer} /> */}
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={LoginContainer} />
          <Route path="/register" component={RegisterContainer} />
          <Route path="/:user" component={withAuth(ShowContainer)} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
