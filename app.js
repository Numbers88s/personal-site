var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser')
var app = express();
var port = 8080;

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));     // to support URL-encoded bodies

app.get('/', function(req,res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.use('/assets', express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/public'));

app.use(express.static("public"));

app.listen(port, '104.131.129.103');
