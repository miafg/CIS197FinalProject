var _ = require('lodash');
var React = require('react');
var PropTypes = React.PropTypes;
var Router = require('react-router');
var Link = Router.Link;
var ReactCookie = require('react-cookie');

var Homescreen = React.createClass({
  logout: function () {
    ReactCookie.remove('user');
    ReactCookie.remove('userList');
  },
  render: function () {
    return (
      <div>
        <nav>
          <ul>
            <li><Link className="link" to="/login">Login</Link></li>
            <li><Link className="link" to="/showProfiles">Show Profiles</Link></li>
            <li><Link className="link" to="/messages">Messages</Link></li>
            <li><Link className="link" to="/myProfile">See My Profile</Link></li>
            <li><Link className="link" to="/" onClick={this.logout}>Logout</Link></li>
          </ul>
        </nav>
        <div className="title">
          <h1>Doggie Tinder</h1>
        </div>
        {this.props.children}
        
      </div>
    );
  }
});

module.exports = Homescreen;
