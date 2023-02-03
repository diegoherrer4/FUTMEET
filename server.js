const express = require("express");
//create instance of express application
const app = express();
//object modeling tool which interacts with database
const mongoose = require("mongoose");
//import passport which deals with authentication
const passport = require("passport");
// store session data on the server
const session = require("express-session");
//store session data in database.
const MongoStore = require("connect-mongo")(session);
//override HTTP methods in the application.
const methodOverride = require("method-override");
//show flash messages in the application.
const flash = require("express-flash");
//logs the requests and responses in the application.
const logger = require("morgan");
const connectDB = require("./config/database");
//import routes for which the server will be listening
const mainRoutes = require("./routes/main");
const eventRoutes = require("./routes/events");

//import .env file in config folder
require("dotenv").config({ path: "./config/.env" });

//import Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//set view engine to ejs
app.set("view engine", "ejs");

//Set public directory as static directory 
app.use(express.static(__dirname + "/public"));

//takes encoded data from form and converts it into js object -> stores it in req.body
app.use(express.urlencoded({ extended: true }));
// enables the parsing of JSON data in the application.
app.use(express.json());

//Logs requests and responses
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//Initialize passport and set up passport sessions
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/event", eventRoutes);

//404 Route
app.use(function(req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.json({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}, you better catch it!`);
});
