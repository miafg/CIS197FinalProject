// CIS 197 - React HW

var React = require('react');
var ReactDOM = require('react-dom');
var createStore = require('redux').createStore;
var reducers = require('./reducers').mainReducer;
var Homescreen = require('./components/Homescreen.jsx');
var ReactRouter = require('react-router');
var {Router, IndexRoute, Route} = ReactRouter;
var NewAccount = require('./components/NewAccount.jsx');
var Login = require('./components/Login.jsx');
var Profile = require('./components/Profile.jsx');
var $ = require('jquery');
var ReactCookie = require('react-cookie');
var ShowProfiles = require('./components/ShowProfiles.jsx');
var Messages = require('./components/Messages.jsx');

var store = createStore(reducers);

var home = <Homescreen store={store}/>;

var authenticated = function (nextState, replaceState) {
  var username = ReactCookie.load('user');
  if (!username) {
    replaceState('/login');
  }
};

var isLoggedIn = function (nextState, replaceState) {
  var username = ReactCookie.load('user');
  if (username) {
    replaceState('/myProfile');
  }
};

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <Router history={ReactRouter.browserHistory}>
    <Route path="/" component={Homescreen}>
      <IndexRoute component={Login}/>
      <Route path="/newAccount" component={NewAccount}/>
      <Route path="/myProfile" component={Profile} onEnter={authenticated}/>
      <Route path="/login" component={Login} onEnter={isLoggedIn}/>
      <Route path="/showProfiles" component={ShowProfiles} onEnter={authenticated}/>
      <Route path="/messages" component={Messages} onEnter={authenticated}/>
    </Route>
  </Router>,
    document.getElementById('container')
  );
});
