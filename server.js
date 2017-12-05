var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var config = require("./config.js")
var $ = require('jquery');
var nodemailer = require('nodemailer');
var cors = require('cors')
var app = express();
var PORT = process.env.PORT || 8000;

console.log(whiteList)
var corsOptions = {
    origin: function(origin, callback) {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('not allowed by CORS'))
        }
    }
}





// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("public"));

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    port: 25,
    auth: {
        user: "KeithKovachPortfolio@gmail.com", //Your email here.  I created email specifically for site
        pass: config.password
    },
    tls: {
        rejectUnauthorized: false
    }
});

app.get("/", cors(corsOptions), function(req, res) {
    res.sendFile(__dirname + "/public/html/home.html");
})

app.get('/send',function(req,res){
    var mailOptions={
        to : "kovachks90@gmail.com",
        subject : "Message From Portfolio",
        text : "Entered Email: " + req.query.from + "  Entered Name: " + req.query.name + "  Email Text: " + req.query.text
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error) {
            console.log(error);
        res.end("error");
        }

        else {
        res.end("sent");
        }
    });
});

  app.listen(PORT, error => {
    if (error) throw error;
    console.log('Server running on port: ' + PORT);
  });