require("dotenv").config();
require("es6-promise").polyfill();
require("isomorphic-fetch");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const users = require("./routers/users");
const boards = require("./routers/boards");
const lists = require("./routers/lists");
const cards = require("./routers/cards");
const checklists = require("./routers/checklists");
const checklistItems = require("./routers/checklistItems");
const errorHandlerMiddlerware = require("./middleware/error-handler");

app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    require("./mongo")().then(() => next());
  }
});

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  expressSession({
    secret: process.env.secret || "keyboard cat",
    saveUninitialized: false,
    resave: false,
  })
);

const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

const User = require("./models/user");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username }, function (err, user) {
      console.log(user);
      if (err) return done(err);
      if (!user || !user.validPassword(password)) {
        return done(null, false, { message: "Invalid username/password" });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  User.findById(user.id, function (err, user) {
    done(err, user);
  });
});

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.set("port", process.env.PORT || 3001);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use("/", users);
app.use("/", boards);
app.use("/", lists);
app.use("/", cards);
app.use("/", checklists);
app.use("/", checklistItems);

app.use(errorHandlerMiddlerware);

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
