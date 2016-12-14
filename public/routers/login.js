var express = require('express');
var router = express.Router();
var mongo = require('../db/Login.js');

router.post('/login', function (req, res) {
  var callback = function (error, auth) {
    if (error) {
      console.log(error);
      res.json({isAuthenticated: false});
    } else {
      if (auth) {
        res.json({isAuthenticated: true});
      } else {
        res.json({isAuthenticated: false});
      }
    }
  };
  mongo.login(req.body.username, req.body.password, callback);
});

module.exports = router;
