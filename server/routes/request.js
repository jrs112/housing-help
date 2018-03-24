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
            res.end("sent");
         }
    });
});



module.exports = router;
