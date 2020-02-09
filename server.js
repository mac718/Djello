require('es6-promise').polyfill();
require('isomorphic-fetch');

const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use((req, res, next) => {
  if(mongoose.connection.readyState) {
    next();
  } else {
    require('./mongo').then(() => next());
  }
})

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

function errorHandler(err, req, res, next) {
  console.error('Error: ', err.stack);
  res.status(err.response ? err.response.status : 500);
  res.json({ error: err.message });
}

app.use(errorHandler);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
})