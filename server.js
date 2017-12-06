var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var config = require("./config.js")
var $ = require('jquery');
var cors = require('cors')
var app = express();
var PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var corsoptions = {
    origin: 'http://localhost:8000'
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log(res)
    next();
  });

// Enable CORS
app.use(cors(corsoptions))

// Static directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/html/home.html");
})


// Initiating server
app.listen(PORT, error => {
    if (error) throw error;
    console.log('Server running on port: ' + PORT);
});