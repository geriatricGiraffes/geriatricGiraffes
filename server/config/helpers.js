var jwt = require('jwt-simple');

module.exports = {
  errorLogger: function (error, request, response, next){
    //logs the error and sends to the next middlware in middleware.js

    console.error(error.stack);
  },
  errorHandler: function (error, request, response, next) {
    //send error message to client
    //message for graceful error handling on app
    response.send( 500, {error: error.message} );
  },

  decode: function (request, response, next) {
    var token = request.headers['x-access-token'];
    var user;

    if (!token) {
      return response.send( 403 );
    }

    try {
      // decode token and attach user to teh request
      // for use inside controllers
      user = jwt.decode( token, 'secret' );
      request.user = user;
      next();
    } catch ( error ) {
      return next( error );
    }
  }
};