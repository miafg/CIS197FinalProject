var React = require('react');
var PropTypes = React.PropTypes;
var _ = require('lodash');
var $ = require('jquery');
var BrowserHistory = require('react-router').browserHistory;
var ReactCookie = require('react-cookie');

var NewAccount = React.createClass({
  getInitialState: function () {
    return {
      username: 'Username',
      password: 'Password',
      confirmPassword: 'Password',
      age: 0, 
      gender: 'Female',
      breed: 'Breed',
      intFem: false, 
      intMale: false, 
      intOther: false
    };
  },
  createAccount: function (e) {
    e.preventDefault();
    ReactCookie.remove('user');
    var username = this.state.username;
    var pw = this.state.password;
    var confirmPW = this.state.confirmPassword;
    var age = this.state.age;
    var gender = this.state.gender;
    var breed = this.state.breed; 
    var interests = new Array();
    if (this.state.intFem) {
      interests.push('F');
    }
    if (this.state.intMale) {
      interests.push('M');
    }
    if (this.state.intOther) {
      interests.push('O');
    }
    if (pw === confirmPW) {
      var data = {
        username: username,
        password: pw, 
        age: age,
        gender: gender, 
        breed: breed,
        interests: interests,
        swipped: [],
        reject: [],
        matches: []
      };
      $.post('/createNewAccount', data, function (result, status) {
        if (result.isAuthenticated) {
          ReactCookie.remove();
          ReactCookie.save('user', {username: username, age: age, gender: gender, breed: breed, interests: interests});
          BrowserHistory.push('/myProfile');
        } else {
          window.alert('Username already exists');
        }
      });
    }
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
  confirmPWChange: function (event) {
    if (event.target) {
      this.setState({confirmPassword: event.target.value, status: ''});
    }
  },
  ageChange: function (event) {
    if (event.target) {
      this.setState({age: event.target.value, status: ''});
    }
  },
  selectChanged: function (event) {
    if (event.target) {
      this.setState({gender: event.target.value, status: ''});
    }
  },
  breedChange: function (event) {
    if (event.target) {
      this.setState({breed: event.target.value, status: ''});
    }
  },
  intFemChanged: function (event) {
    this.setState({intFem: !this.state.intFem, status: ''});
  }, 
  intMaleChanged: function (event) {
    this.setState({intMale: !this.state.intMale, status: ''});
  }, 
  intOtherChanged: function (event) {
    this.setState({intOther: !this.state.intOther, status: ''});
  },
  render: function () {
    return (
      <div>
        <h2>Create a New Account</h2>
        <form>
          <input type="text" required="true" value={this.state.username} placeholder="Username" onChange={this.usernameChanged}/><br/>
          <input type="password" required="true" value={this.state.password} placeholder="Password" onChange={this.pwChange}/><br/>
          <input type="password" required="true" value={this.state.confirmPassword} placeholder="Confirm Password" onChange={this.confirmPWChange}/><br/>
          <label htmlFor="age">Age:</label><input type="number" name="age" min="0" max="100" required="true" value={this.state.age} onChange={this.ageChange}/><br/>
          <select name="gender" onChange={this.selectChanged}> 
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select><br/>
          <input type="checkbox" name="interestFem" onChange={this.intFemChanged}/>Interested In Females<br/>
          <input type="checkbox" name="interestMale" onChange={this.intMaleChanged}/>Interested In Males<br/>
          <input type="checkbox" name="interestOther" onChange={this.intOthChanged}/>Interested In Other<br/>
          <input type="text" required="true" value={this.state.breed} placeholder="Breed" onChange={this.breedChange}/><br/>
          <input type="submit" value="Create New Account" onClick={this.createAccount}/>
        </form>
      </div>
    );
  }
});
module.exports = NewAccount;