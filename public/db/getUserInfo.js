var mongo = require('./mongo');

module.exports = {
  findUser: function (username, callback) {
    mongo.Users.find({username: username}).exec(function (error, user) {
      if (error) {
        callback(error, null);
      } else {
        if (user.length == 1) {
          callback(null, user[0]);
        } else {
          callback(null, null);
        }
      }
    });
  }
};