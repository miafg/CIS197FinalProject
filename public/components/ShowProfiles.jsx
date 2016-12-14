var _ = require('lodash');
var React = require('react');
var Router = require('react-router');
var $ = require('jquery');
var ReactCookie = require('react-cookie');

var ShowProfiles = React.createClass({
  getInitialState: function () {
    $.get('/getUsers', function (response) {
      ReactCookie.save('userCount', response.users.length);
      for (var i = 0; i < response.users.length; i++) {
        var name = 'userList' + i;
        ReactCookie.save(name, response.users[i]);
      }
      setTimeout('', 5000);
    });
    //creating the state
    var display = null;
    var count = ReactCookie.load('userCount');
    var userList = [];
    for (var i = 0; i < count; i++) {
      var name = 'userList' + i;
      userList.push(ReactCookie.load(name));
    }
    var user = ReactCookie.load('user');
    $.post('/getUserInfo', {username: user.username}, function (results, status) {
      if (results.user) {
        var u = results.user;
        ReactCookie.save('user', u);
      } 
      setTimeout('', 5000);
    });
    user = ReactCookie.load('user');
    var index = 0;
    for (i = 0; i < userList.length; i++) {
      if (userList[i].username != user.username) {
        var prefer = this.preferEachOther(user.gender, userList[i].gender, user.interests, userList[i].interests);
        var rejected = this.contains(userList[i].username, user.reject);
        //check is the user already matched with this person
        var match = this.contains(userList[i].username, user.matches);
        //check if the user already swipped rigth with this person
        var swipped = this.contains(userList[i].username, user.swipped);
        if (!swipped && !match && !rejected && prefer) {
          display = userList[i];
          index = i;
          break;
        }
      }
    }
    if (!display) {
      return {display:{username: 'there are no more users', age: '0', breed: 'n/a'}};
    }
    return {users: userList, display: display, index: index};
  },
  leftClicked: function () {
    if (this.state.display.username !== 'there are no more users') {
      this.nextDog();
      var currentUser = ReactCookie.load('user');
      //add user to the reject list
      $.post('/updateUserReject', {username: currentUser.username, user: this.state.display.username});
    }
  },
  rightClicked: function () {
    if (this.state.display.username !== 'there are no more users') {
      //get swipes of the display user
      $.post('/getUserInfo', {username: this.state.display.username}, function (results, status) {
      //login works! hoorayyy
        if (results.user) {
          var u = results.user;
          var currentUser = ReactCookie.load('user');
          for (var i = 0; i < u.swipped.length; i++) {
            if (u.swipped[i] == currentUser.username) {
              $.post('/updateUserMatches', {username: currentUser.username, user: u.username});
              $.post('/updateUserMatches', {username: u.username, user: currentUser.username});
              return;
            }
          }
          $.post('/updateUserSwipped', {username: currentUser.username, user: u.username});
        } 
      });
      this.nextDog();
    }
  }, 
  nextDog: function () {
    var currentUser = ReactCookie.load('user');
    $.post('/getUserInfo', {username: currentUser.username}, function (results, status) {
      if (results.user) {
        var u = results.user;
        ReactCookie.save('user', {username: u.username, age: u.age, gender: u.gender, breed: u.breed, reject: u.reject, interests: u.interests, matches: u.matches, swipped: u.swipped, rejected: u.rejected});
      } 
    });
    currentUser = ReactCookie.load('user');
    var i = this.state.index;
    var u = this.state.users;
    currentUser = ReactCookie.load('user');
    if (u) {
      if (i + 1 < u.length) {
        for (var j = i + 1; j < u.length; j++) {
          //check if the user is not the logged in user && they prefer each other
          if (currentUser.username != u[j].username) {
            //if they prefer each other display the person
            if (this.preferEachOther(currentUser.gender, u[j].gender, currentUser.interests, u[j].interests)) {
              //check if the user already rejected this person
              var rejected = this.contains(u[j].username, currentUser.reject);
              //check is the user already matched with this person
              var match = this.contains(u[j].username, currentUser.matches);
              //check if the user already swipped rigth with this person
              var swipped = this.contains(u[j].username, currentUser.swipped);
              if (!rejected && !match && !swipped) {
                this.setState({index: j, display: u[j]});
              }
              return;
            }           
          }
        }
      }
    }
    this.setState({display:{username: 'there are no more users', age: '0', breed: 'n/a'}});
  },
  preferEachOther: function (firstGender, secondGender, firstList, secondList) {
    var userSatisfies = false;
    var otherSatisfies = false; 
    var currentGender = 'F';
    if (firstGender == 'Male') {
      currentGender = 'M';
    } else if (firstGender == 'Other') {
      currentGender = 'O';
    }
    var otherGender = 'F';
    if (secondGender == 'Male') {
      otherGender = 'M';
    } else if (secondGender == 'Other') {
      otherGender = 'O';
    }
    otherSatisfies = this.contains(otherGender, firstList);
    userSatisfies = this.contains(currentGender, secondList);
    return userSatisfies && otherSatisfies;
  },
  contains: function (username, list) {
    var contain = false; 
    if (list) {
      for (var k = 0; k < list.length; k++) {
        if (list[k] == username) {
          contain = true;
        }
      }
    }
    return contain;
  },
  render: function () {
    const style = {display:'flex'};
    const styleInfo = {width: '150px'};
    return (
      <div className='centerDiv'>
        <button type='button' onClick={this.leftClicked}>Wag Left</button>
        <div style={styleInfo}>
          <p>{this.state.display.username}</p><br/>
          <p>Age: {this.state.display.age}</p><br/>
          <p>Breed: {this.state.display.breed}</p>
        </div>
        <button type='button' onClick={this.rightClicked}>Wag Right</button>
      </div> 
    );
  }
});

module.exports = ShowProfiles;