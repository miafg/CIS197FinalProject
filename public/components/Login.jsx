var _ = require('lodash');
var React = require('react');
var PropTypes = React.PropTypes;
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var BrowserHistory = ReactRouter.browserHistory;
var $ = require('jquery');
var ReactCookie = require('react-cookie');

var Login = React.createClass({
  getInitialState: function () {
    return {
      username: 'Username',
      password: 'Password'
    };
  }, 
  contextTypes:{
    router: React.PropTypes.object
  },
  login: function (e) {
    e.preventDefault();
    var username = this.state.username;
    var pw = this.state.password;
    var data = {
      username: username, 
      password: pw
    };
    ReactCookie.remove('user');
    ReactCookie.remove('userList');
    $.post('/login', data, function (results, status) {
      if (results.isAuthenticated) {        
        $.post('/getUserInfo', {username: username}, function (results, status) {
          if (results.user) {
            var u = results.user;
            ReactCookie.save('user', {username: u.username, age: u.age, gender: u.gender, breed: u.breed, interests: u.interests, matches: u.matches, swipped: u.swipped, rejected: u.rejected});
            BrowserHistory.push('/myProfile');
          } 
        });
      } else {
        window.alert('Login & Password do not match');
      }
    });
  },
  usernameChanged: function (event) {
    if (event.target) {
      this.setState({username: event.target.value, status: ''});
    }
  },
  pwChange: function (event) {
    if (event.target) {
      this.setState({password: event.target.value, status: ''});
    }
  },
  render: function () {
    return (
      <div>
        <h2>Login</h2>
        <form>
          <input type="text" required="true" value={this.state.username} placeholder="Username" onChange={this.usernameChanged}/><br/>
          <input type="password" required="true" value={this.state.password} placeholder="Password" onChange={this.pwChange}/><br/>
          <input type="submit" onClick={this.login}/><br/>
          <Link to="/newAccount">Create New Account</Link>
        </form>
      </div>
    );
  }
});

module.exports = Login;