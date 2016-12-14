// CIS 197 - React Final Project
// Doggie Tinder
// Simple Express server to serve static files
var express = require('express');
var app = express();
var path = require('path');
var ejs = require('ejs');
var login = require('./public/routers/login.js');
var bodyParser = require('body-parser');
var createNewAccount = require('./public/routers/createNewAccount.js');
var ReactCookie = require('react-cookie');
var getUserInfo = require('./public/routers/getUserInfo.js');
var getUsers = require('./public/routers/getUsers.js');
var updateUserSwipped = require('./public/routers/updateUserSwipped.js');
var updateUserReject = require('./public/routers/updateUserReject.js');
var updateUserMatches = require('./public/routers/updateUserMatches.js');
var updateMessages = require('./public/routers/updateMessage.js');

var port = process.env.PORT || 3000;

app.set('port', port);

// Use the EJS rendering engine for HTML located in /views
app.set('views', __dirname + '/views');
app.engine('html', ejs.__express);
app.set('view engine', 'html');

// Host static files on URL path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index');
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/login', login);
app.post('/createNewAccount', createNewAccount);
app.post('/getUserInfo', getUserInfo);
app.get('/getUsers', getUsers);
app.post('/updateUserSwipped', updateUserSwipped);
app.post('/updateUserMatches', updateUserMatches);
app.post('/updateUserReject', updateUserReject);
app.post('/updateMessages', updateMessages);

// Start server
app.listen(app.get('port'), function () {
  console.log('Express doggie tinder server listening on port ' + port);
});

module.exports = app;