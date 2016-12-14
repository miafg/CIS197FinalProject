var mongo = require('../db/mongo');
var express = require('express');
var router = express.Router();

router.get('/getUsers', function (req, res) {
  mongo.Users.find().exec(function (err, users) {
    if (err) {
      res.send(err);
    } else {
      res.json({users: users});
    }
  });
});

module.exports = router;