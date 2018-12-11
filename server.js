var express = require("express");
var bodyParser = require("body-parser");
var https = require('https');
var http = require('http');
var cors = require('cors');

var app = express(); 

// Body Parser Middleware
app.use(bodyParser.json()); 

var functionHost = "fuz8via4zd.execute-api.us-east-1.amazonaws.com";
var functionURL = "/Prod/api/S3Bucket";

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/dist/ColorAnalysis'));

app.get('/*', (req,res) => res.sendFile(path.join(__dirname)));

var originsWhitelist = [
    'http://localhost:4200',      //this is my front-end url for development
    // 'http://www.myproductionurl.com'
  ];

  var corsOptions = {
    origin: function(origin, callback){
          var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
          callback(null, isWhitelisted);
    },
    credentials:true
  }

//here is the magic
app.use(cors(corsOptions));
//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

 app.post('/login', function(req, res){
    jsonObject = JSON.stringify({
        "username" : req.body.username,
        "userpassword": req.body.userpassword,
        "imageUrl": req.body.imageUrl
    });

    var postheaders = {
        'Content-Type' : 'application/json',
        'Content-Length' : Buffer.byteLength(jsonObject, 'utf8'),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers':'Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization'
    };

    var optionspost = {
        host : functionHost, // here only the domain name    // (no http/https !)        
        path : functionURL+'/login', 
        method : 'POST', // do GET,
        headers : postheaders
    };

    var reqPost = https.request(optionspost, function(response) {
     
    response.on('data', function(d) {
            process.stdout.write(d);
            res.send(d);
        });
    });
     
    // write the json data
    reqPost.write(jsonObject);
    reqPost.end();
    reqPost.on('error', function(e) {
        console.error(e);
    });
 });

 app.post('/getUser', function (req, res){
    var optionsget = {
        host : functionHost,     
        path : functionURL+'/user/'+req.body.id, 
        method : 'GET' // do GET
    };

    var reqGet = https.request(optionsget, function(response) {
    
    response.on('data', function(d) {
            process.stdout.write(d);
            res.send(d);
        });    
    });
    
    reqGet.end();
    reqGet.on('error', function(e) {
        console.error(e);
    });
 });

 app.post('/register', function(req,res){
    jsonObject = JSON.stringify({
        "userId" : req.body.userId,
        "userName" : req.body.userName,
        "userFirstName" : req.body.userFirstName,
        "userLastName":req.body.userLastName,
        "userEmail" : req.body.userName,
        "userPassword" : req.body.userFirstName,
        "userImageUrl":req.body.userLastName,
    });
    var postheaders = {
        'Content-Type' : 'application/json',
        'Content-Length' : Buffer.byteLength(jsonObject, 'utf8'),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers':'Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization'
    };
    var optionspost = {
        host : functionHost, // here only the domain name    // (no http/https !)
        path : functionURL+'/Register',
        method : 'POST',
        headers : postheaders
    };

    var reqPost = https.request(optionspost, function(response) {
     
    response.on('data', function(d) {
            process.stdout.write(d);
            res.send(d);
        });
    });
     
    reqPost.write(jsonObject);
    reqPost.end();
    reqPost.on('error', function(e) {
        console.error(e);
    });
 })

 app.post('/saveimage', function(req,res){
    jsonObject = JSON.stringify({
        "filebase64" : req.body.filebase64
    });

    var postheaders = {
        'Content-Type' : 'application/json',
        'Content-Length' : Buffer.byteLength(jsonObject, 'utf8'),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers':'Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization'
    };
    var optionspost = {
        host : functionHost,
        path : functionURL,
        method : 'POST',
        headers : postheaders
    };
     
    // do the POST call
    var reqPost = https.request(optionspost, function(response) {     
        response.on('data', function(d) {
            process.stdout.write(d);
            res.send(d);
        });
    });
     
    // write the json data
    reqPost.write(jsonObject);
    reqPost.end();
    reqPost.on('error', function(e) {
        console.error(e);
    });
 })


const server = http.createServer(app);

//Setting up server
server.listen(port, () => {
    var port1 = server.address().port;
    console.log("App now running on port", port1);
 });