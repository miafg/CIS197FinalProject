var _ = require('lodash');
var React = require('react');
var Router = require('react-router');
var $ = require('jquery');
var ReactCookie = require('react-cookie');

var Profile = React.createClass({
  getInitialState: function () {
    var user = ReactCookie.load('user');
    var interest = '';
    if (user.interests.indexOf('F') != -1) {
      interest += 'females';
    }
    if (user.interests.indexOf('M') != -1) {
      if (interest.length != 0) {
        interest += ' , ';
      }
      interest += 'males';
    }
    if (user.interests.indexOf('O') != -1) {
      if (interest.length != 0) {
        interest += ' & ';
      }
      interest += 'other';
    }
    user.interest = interest;
    return user;
  },
  render: function () {
    return (
      <div>
        <div className='subtitle'>
          <h1>My Profile</h1>
        </div>
        <p>{this.state.username}</p>
        <p>Age: {this.state.age}</p>
        <p>Gender: {this.state.gender}</p>
        <p>Breed: {this.state.breed}</p>
        <p>Interested in: {this.state.interest}</p>
      </div>
    );
  }
});

module.exports = Profile;