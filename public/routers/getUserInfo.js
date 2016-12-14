var express = require('express');
var router = express.Router();
var mongo = require('../db/getUserInfo.js');

router.post('/getUserInfo', function (req, res) {
  var callback = function (error, userInfo) {
    if (error) { 
      res.json({user: userInfo});
    } else {
      res.json({user: userInfo});
    }
  };
  mongo.findUser(req.body.username, callback);
});

module.exports = router;