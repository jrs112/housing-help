const express = require('express');
const router = express.Router();
const User = require("../../models/userModel.js");
const AdminUser = require("../../models/adminUserModel.js")
const passport = require("passport");

// process the signup form
    router.post('/createdonor', passport.authenticate('local-signup', {
        successRedirect : '/donordashboard', // redirect to the secure profile section
        failureRedirect : '/donorsignup', // redirect back to the signup page if there is an error
    }));

    // process the login form
    router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/donordashboard', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error

    }));

    //log out customer
    router.get("/logout", function(req, res) {
        req.logout();
        req.session.destroy(function(err) {
            res.redirect('/');

        });
    });

    //Get logged in user info
    router.get("/userinfo", function(req, res) {
      if(req.user) {
        res.json(req.user);
      } else {
        var errorMessage = {
          errorMessage: "No user logged in"
        };
        res.json(errorMessage);
      }
      });

      // check to see if there are any users in DB
      router.get("/allusers", function(req, res) {
        console.log("Got here");
        User.find().exec(function(error, users) {
          // Log any errors
          if (error) {
            console.log(error);
          }

          else {
            retObj = {};
            console.log("Length ", users.length);
            if (users.length === 0) {
              retObj = {
                successMsg: "yes"
              };
            } else {
              retObj = {
                failureMsg: "no"
              };
            }
          res.json(retObj);
          }
        });
      });

      // This will get all user names in db
      router.get("/alldonors", function(req, res) {
        console.log("Got here");
        User.find().exec(function(error, users) {
          // Log any errors
          if (error) {
            console.log(error);
            res.json(error);
          } else {
            var donorArr = [];
            for (var i = 0; i < users.length; i++) {
              if (users[i].role == "donor") {
                donorArr.push(users[i]);
              }
            }
            res.json(donorArr);
          }
        });
      });



      //Admin Portal Routes

      //Create customer user account
      router.post('/createadmin', passport.authenticate('admin-local-signup', {
          successRedirect : '/admindashboard', // redirect to the secure profile section
          failureRedirect : '/createadmin', // redirect back to the signup page if there is an error

      }));

      router.post('/loginadmin', passport.authenticate('admin-local-login', {
          successRedirect : '/admindashboard', // redirect to the secure profile section
          failureRedirect : '/adminlogin', // redirect back to the signup page if there is an error


      }));

      // Grab a service order by id
      router.get("/getadmin/:id", function(req, res) {
        console.log("Got here");
        // Using the phone number passed in the id parameter
        AdminUser.find({ "_id": req.params.id })
        // ..and populate all of the customer associated with it
        // now, execute our query
        .exec(function(error, orders) {
          // Log any errors
          if (error) {
            console.log(error);
          }
          // Otherwise, send the customer to the browser as a json object
          else {
            console.log("Got Here Also");
            console.log(orders);
            res.json(orders);

          }
        });
      });

module.exports = router;
