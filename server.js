require('es6-promise').polyfill();
require('isomorphic-fetch');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');


app.use((req, res, next) => {
  if(mongoose.connection.readyState) {
    next();
  } else {
    require('./mongo')().then(() => next());
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(
  expressSession({
    secret: process.env.secret || 'fiona',
    saveUninitialized: false,
    resave: false
  }))

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/User');
const LocalStrategy = require('passport-local').Strategy

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username }, function(err, user) {
      console.log(user)
      if(err) return done(err);
      if(!user || !user.validPassword(password)) {
        return done(null, false, { message: 'Invalid username/password' });
      }
    })
    return done(null, user);
  });
);

passport.serializeUser((user, done) {
  done(null, user.id);
});

passport.deserializeUser((user, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
}); 

app.set('port', (process.env.PORT || 3001));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

function checkStatus(response) {
  if(!response.ok) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error
  }

  return response;
}

function parseJSON(response) {
  return response.json();
}

app.get('/', (req, res) => {
  res.send('Hello');
})

app.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return next(err); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.status(200).send;
    });
  })(req, res, next);
})

function errorHandler(err, req, res, next) {
  console.error('Error: ', err.stack);
  res.status(err.response ? err.response.status : 500);
  res.json({ error: err.message });
}

app.use(errorHandler);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
})