const express = require('express');
const router = express.Router();
const Request = require("../../models/requestModel.js");
var nodemailer = require('nodemailer');

//Create A Project
router.post('/createrequest', function(req, res) {
  var newRequest = new Request(req.body);
  newRequest.save(function(err, data) {
      if(err) {
          console.log('Error creating request', err);
      } else {
          res.json(data);
      }
  });
});

// Grab a service order by id
router.get("/onerequest/:id", function(req, res) {
  console.log("Got here");
  // Using the phone number passed in the id parameter
  Request.find({ "_id": req.params.id })
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

router.put("/updaterequest/:id", function(req, res) {
  var info = req.body;
  console.log("here is the info");
  console.log(info);
  console.log(req.params.id);
  Request.findByIdAndUpdate(req.params.id, {$set: info}, {new: true}, function(err, order) {
    if (err) return handleError(err);
    res.send(order);
  });
});


var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "jsanderweb112@gmail.com",
        pass: process.env.EMAIL_KEY
    }
});

router.post("/send",function(req,res){
    var mailOptions={
        to : req.body.to,
        subject : req.body.subject,
        html : req.body.html
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
        console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
            var msg = {
              message: "sent"
            }
            res.json(msg);
         }
    });
});



module.exports = router;
