require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const server = http.createServer(app);


// Connect
const db = "mongodb://localhost/HousingHelp";
useMongoClient: true;
mongoose.Promise = global.Promise;
//connect and show any mongoose errors
mongoose.connect(db, function(err) {
  if(err) {
      console.log('Error connecting');
  }
  else{
    console.log('Mongoose connection successful.')
  }
});

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// API file for interacting with MongoDB
const auth = require("./server/routes/auth");
const request = require("./server/routes/request");



// Parsers
app.use(bodyParser.json());
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: false}));

// required for passport
app.use(session({ secret: 'housinggggghelp112',
                  saveUninitialized: true,
                  resave: true})); // session secret
app.use(passport.initialize());



app.use(passport.session()); // persistent login sessions

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));
app.use(function(req, res, next) {
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});
// API location


app.use("/auth", auth);
app.use("/request", request);
require('./server/config/passport.js')(passport);


//app.use()

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port

var port = process.env.PORT || 8080;



server.listen(port, () => console.log("connected and listening on port ", port));
