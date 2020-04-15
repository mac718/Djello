var mongoose = require('mongoose')
var bluebird = require('bluebird')

mongoose.Promise = bluebird

var models = {}

// Load models and attach to models here
models.User = require('./user')
models.Board = require('./board')
models.List = require('./list')
models.Card = require('./card')
models.Checklist = require('./checklist')
models.ChecklistItem = require('./checklistItem')

module.exports = models
