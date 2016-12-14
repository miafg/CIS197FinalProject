var mongo = require('./mongo');

module.exports = {
  login: function (username, password, callback) {
    mongo.Users.find({username: username, password: password}).exec(function (errors, user) {
      if (user.length == 1) {
        callback(errors, true);
      } else {
        callback(errors, false);
      }
    });
  }
};