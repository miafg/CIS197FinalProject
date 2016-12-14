/*
  TODO: Write the isAuthenticated middleware.
  This function should be a regular Express middleware which ca

  Remember that, if a request is authenticated, then req.session will have an
  isAuthenticated value of true.
*/
var isAuthenticated = function (req, res, next) {
  if (req.session.isAuthenticated) {
    res.send({isAuthenticated: true});
  } else {
    res.send({isAuthenticated: false});
  }
}; 


// Export the middleware function for use in app.js
module.exports = isAuthenticated;