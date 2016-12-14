var mongoose = require('mongoose');
mongoose.connect('mongodb://miafg:mlabPassword@ds127928.mlab.com:27928/cis197project', function (err) {
  if (err) {
    console.log('Error connecting to mongodb database: %s.\nIs "mongod" running?', err.message);
    process.exit(0);
  } else if (err) {
    throw err;
  } else {
    console.log('DB successfully connected.');
  }
});

var db = mongoose.connection;

var messageSchema = new mongoose.Schema({
  to: String,
  from: String,
  message: String
});

var chatSchema = new mongoose.Schema({
  participants: [String],
  messages: [messageSchema]
});

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  age: String, 
  breed: String,
  gender: String,
  interests: [String],
  swipped: [String],
  reject: [String],
  matches: [String],
  messages: [chatSchema]
}, {collection: 'Users'});

var Users = mongoose.model('Users', userSchema);
var Message = mongoose.model('Message', messageSchema);
var Chat = mongoose.model('Chat', chatSchema);

module.exports = {
  Users: Users,
  db: db,
  Message: Message,
  Chat: Chat
};