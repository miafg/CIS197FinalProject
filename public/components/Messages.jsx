var _ = require('lodash');
var React = require('react');
var PropTypes = React.PropTypes;
var Router = require('react-router');
var Link = Router.Link;
var ReactCookie = require('react-cookie');
var $ = require('jquery');

var Messages = React.createClass({
  buttonToggled: function (selected) {
    var user = ReactCookie.load('user');
    $.post('/getUserInfo', {username: user.username}, function (results, status) {
      if (results.user) {
        var u = results.user;
        ReactCookie.save('user', {username: u.username, age: u.age, gender: u.gender, breed: u.breed, interests: u.interests, matches: u.matches, swipped: u.swipped, rejected: u.rejected});
      }
    });
    user = ReactCookie.load('user');
    var m = this.state.matches.slice();
    //get all the messages from the other user
    $.post('/getUserInfo', {username: user.username}, function (results, status) {
      ReactCookie.save('messages', results.user.messages);
    });
    var messg = ReactCookie.load('messages');
    if (!messg || messg.length <= selected) {
      messg = {
        participants: ['none', 'none'],
        messages: [{
          message: 'no messages',
          from: 'none',
          to: 'none'
        }]
      };
    } else {
      messg = messg[selected];
    }
    var messages = this.createMessageEls(messg, m[selected].user, 0);
    ReactCookie.remove('messages');
    var buttons = []; 
    for (var i = 0; i < m.length; i++) {
      var className = 'userButton';
      if (i == selected) {
        className += ' active';
      }
      buttons.push({user: m[i].user, className: className});
    }
    this.setState({messages: messages, matches: buttons, selected: selected});
  },
  isActive: function (index) {
    //var selected = ReactCookie.load('selected');
    return 'userButton ' + ((index == this.state.selected) ? 'active' : '');
  },
  createMessageEls: function (messg, defaultVal, idx) {
    var user = ReactCookie.load('user');
    var i = idx;
    var sendMess = 'Send a message to ' + defaultVal;
    var messages = messg.messages.map(function (m, index) {
      if (m.message === 'no messages') {
        i++;
        return (<p key={i}>{sendMess}</p>);
      }
      if (m.from == user.username) {
        i++;
        var className = 'lineMessage';
        if (i % 2 == 0) {
          className += ' color';
        }
        var toReturn = (
          <div key={i} className={className}>
            <p className='toRight userName' key={i + 2}>{m.from}</p>
            <p className='messageText' key={i + 1}>{m.message}</p>
          </div>
        );
        i += 2;
        return toReturn;
      }
      i++;
      className = 'lineMessage';
      if (i % 2 == 0) {
        className += ' color';
      }
      toReturn = (
        <div key={i} className={className}>
          <p className='toLeft userName' key={i + 1}>{m.from}</p>
          <p className='messageText' key={i + 2}>{m.message}</p>
        </div>
      );
      i += 2;
      return toReturn;
    }); 
    ReactCookie.save('index', i);
    return messages;
  },
  getInitialState: function () {
    var user = ReactCookie.load('user');
    $.post('/getUserInfo', {username: user.username}, function (results, status) {
      ReactCookie.save('matches', results.user.matches);
      ReactCookie.save('messages', results.user.messages);
    });
    var matches = ReactCookie.load('matches'); 
    ReactCookie.remove('matches');
    if (!matches) {
      matches = [];
    }
    var matchesList = []; 
    for (var i = 0; i < matches.length; i++) {
      var className = 'userButton';
      if (i == 0) {
        className += ' active';
      }
      matchesList.push({user: matches[i], className: className});
    }
    var messg = ReactCookie.load('messages');
    if (!messg || messg.length == 0) {
      messg = [{
        participants: ['none', 'none'],
        messages: [{
          message: 'no messages',
          from: 'none',
          to: 'none'
        }]
      }];
    }
    var messages = null;
    if (matchesList.length != 0) {
      messages = this.createMessageEls(messg[0], matchesList[0].user, -1);
    }
    return {messages: messages, matches: matchesList, text: '', selected: 0};
  },
  sendMessage: function (e) {
    var message = this.state.text; 
    var recipient = this.state.matches[this.state.selected].user;
    var user = ReactCookie.load('user').username;
    this.setState({text: ''});
    $.post('/updateMessages', {sender: user, recipient: recipient, message});
    var mList = this.state.matches;
    var messgs = this.state.messages.slice();
    for (var i = 0; i < mList.length; i++) {
      if (mList[i].user == recipient) {
        var participants = [user, recipient];
        var mesObj = {
          participants: participants,
          messages: [{message: message, from: user, to: recipient}]
        };
        var index = ReactCookie.load('index');
        var elm = this.createMessageEls(mesObj, null, index);
        messgs.push(elm);
        break;
      }
    }
    this.setState({messages: messgs});
  },
  somethingTyped: function (e) {
    if (e.target.value) {
      this.setState({text: e.target.value});
    }
  },
  render: function () {
    if (this.state.matches) {
      var matchesList = this.state.matches.map(function (m, index) {
        return (
          <button className={this.state.matches[index].className} type="button" onClick={this.buttonToggled.bind(this, index)} key={index}>{m.user}</button>
        );
      }
      , this);
    } 
    return (
      <div>
        <div className="subtitle">
            <h1>Messages</h1>
        </div>
        <div className="messageContainer">
          <div className="userList">
            <div className="listTitle">Matches</div>
            {matchesList}
          </div>
          <div className="displayMessage">
            <div className="message">{this.state.messages}</div>
            <input className="messageText" type="text" onChange={this.somethingTyped} value={this.state.text}/>
            <input type="submit" onClick={this.sendMessage} value="Send"/>
          </div> 
        </div>   
      </div>
    );
  }
});

module.exports = Messages;