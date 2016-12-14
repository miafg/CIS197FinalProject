var express = require('express');
var router = express.Router();
var mongo = require('../db/updateMessages.js');

router.post('/updateMessages', function (req, res) {
  var callback = function (error, userInfo) {
    if (error) {
      res.send({sent: false});
    } else {
      res.json({sent: true});
    }
  };
  mongo.updateMessages(req.body.sender, req.body.recipient, req.body.message, callback);
});

module.exports = router;