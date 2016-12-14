var express = require('express');
var router = express.Router();
var mongo = require('../db/addNewUser.js');

router.post('/createNewAccount', function (req, res) {
  var callback = function (wasAdded) {
    if (wasAdded) {
      res.json({isAuthenticated: true});
    } else {
      res.json({isAuthenticated: false});
    }
  };
  mongo.addUser(req.body, callback);
});

module.exports = router;
