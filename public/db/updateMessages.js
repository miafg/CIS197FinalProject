var mongo = require('./mongo');

var contains = function (array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == value) {
      return true;
    }
  }
};

var addToUser = function (user1, user2, mes) {
  //first users
  mongo.Users.find({username: user1}).exec(function (error, user) {
    if (user.length == 1) {
      //sender was found
      var m = user[0].messages;
      //check if sender already has a chat between the two
      var hasChat = false; 
      var index = 0;
      if (m) {
        for (var i = 0; i < m.length; i++) {
          if (contains(m[i].participants, user1) && contains(m[i].participants, user2)) {
            hasChat = true;
            index = i;
            break;
          }
        }
      }
      if (hasChat) {
        //add message to existing chat
        m[index].messages.push(mes);
        user[0].save(function (err) {
          console.log(err);
        });
      } else {
        var chat = new mongo.Chat();
        chat.participants = [user1, user2];
        chat.messages = [mes];
        user[0].messages = [chat];
        user[0].save(function (err) {
          console.log(err);
        });
      }
    }     
  });
};

module.exports = {
  updateMessages: function (sender, recipient, message, callback) {
    var mes = new mongo.Message();
    mes.message = message;
    mes.from = sender;
    mes.to = recipient;
    addToUser(sender, recipient, mes);
    addToUser(recipient, sender, mes);
  }
};