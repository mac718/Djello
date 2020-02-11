import React from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Board from './components/Board';

function App() {
  return (
    <Router>
      <div className="App container">
        <Switch>
          <Route path='/' exact component={Board} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
