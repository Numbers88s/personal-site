var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser')
var app = express();
var port = 8080;

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));     // to support URL-encoded bodies
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "stamos4life69@gmail.com",
        pass: "GreenTea1"
    }
});

app.get('/', function(req,res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.use('/assets', express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/public'));

app.post('/send', function(req, res) {
    var mailOptions = {
        from: req.body.from, // sender address
        name: req.body.name,
        to: 'cesar.r.jimenez@gmail.com', // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.text, // plaintext body
    };
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});


app.use(express.static("public"));

app.listen(port, '104.131.129.103');