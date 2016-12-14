var express = require('express');
var router = express.Router();
var mongo = require('../db/updateUser.js');

router.post('/updateUserMatches', function (req, res) {
  var callback = function (error, userInfo) {
    if (error) {
      res.send({user: userInfo});
    } else {
      res.json({user: userInfo});
    }
  };
  mongo.updateUserMatches(req.body, callback);
});

module.exports = router;