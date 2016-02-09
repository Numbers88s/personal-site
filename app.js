// var fs = require("fs");
// var host = "127.0.0.1";
// var port = 1337;
// var express = require("express");

// var app = express();
// app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder

// app.get("/", function(request, response) { //root dir
//     response.send("Hello!!");
// });

// app.listen(port, host);



var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();
var port = process.env.PORT || 3000;

/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "cesar@untoldhq.com",
        pass: "GreenTea1"
    }
});

app.get('/',function(req,res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.use('/assets', express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/public'));

app.post('/send', function(req, res){
    var mailOptions = {
        to : req.query.to,
        subject : req.query.subject,
        text : req.query.text
        }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response) {
    if(error) {
      console.log(error);
      res.end("error");
    } else {
      console.log("Message sent: " + response.message);
      res.end("sent");
    }
  });
});


app.use(express.static("public"));

app.listen(port, function() {
  console.log("Express Started on Port 3000");
});