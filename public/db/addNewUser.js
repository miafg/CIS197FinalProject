var mongo = require('./mongo');

module.exports = {
  isUsernameUnique: function (username, callback) {
    mongo.Users.find({username: username}).exec(function (error, users) {
      if (users.length > 0) {
        callback(false);
      } else {
        callback(true);
      }
    });
  },

  addUser: function (userData, callback) {
    this.isUsernameUnique(userData.username, function (isAvailable) {
      if (isAvailable) {
        var user = new mongo.Users();
        user.username = userData.username;
        user.password = userData.password;
        user.age = userData.age;
        user.gender = userData.gender;
        user.breed = userData.breed;
        user.interests = userData['interests[]'];
        user.save(function (error) {
          if (error) {
            callback(false);
          } else {
            callback(true);
          }
        });
      } else {
        callback(false);
      }
    });
  }
};