var mongo = require('./mongo');

module.exports = {
  updateUserSwipped: function (userData, callback) {
    mongo.Users.update({username: userData.username}, {$push: {swipped: userData.user}}, callback);
  },
  updateUserReject: function (userData, callback) {
    mongo.Users.update({username: userData.username}, {$push: {reject: userData.user}}, callback);
  },
  updateUserMatches: function (userData, callback) {
    mongo.Users.update({username: userData.username}, {$push: {matches: userData.user}}, callback);
  }
};