// var User = require('./userModel.js');
  var Q = require('q');
  var jwt = require('jwt-simple');

module.exports = {
  signin: function (request, response, next) {
    var username = request.body.username;
    var password = request.body.password;

    var findUser = Q.nbind(User.findOne, User);
    findUser({username: username})
      .then(function (user) {
        if (!user){
          next(new Error('User does not exist'));
        } else {
          return user.comparePasswords(password)
            .then(function (foundUser) {
              if (foundUser) {
                var tokekn = jwt.encode(user, 'secret');
                response.json({token: token});
              } else {
                return next(new Error('No user'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error)
      });
  },

  signup: function (request, response, next) {
    var username = request.body.username;
    var password = request.body.password;
    var create;
    var newUser;

    var findOne = Q.nbind(User.findOne, User);

    findOne({ username: username })
      .then(function (user) {
        if (user) {
          next( new Error('User already exists'));
        } else {
          //make new user if it doesn't exist
        create = Q.nbind(User.create, User);
        newUser = {
          username: username,
          password: password
        };
        return create(newUser);
        }
      })
      .then (function (user) {
        var token = jwt.encode(user, 'secret');
        response.json({token: token});
      })
      .fail(function(error){
        next(error);
      });
  },

  checkAuth: function (request, response, next) {
    //Comment from Shortley Angular
    // checking to see if the user is authenticated
    // grab the token in the header if any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = request.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
      var findUser = Q.nbind(User.findOne, User);
      findUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            response.send(200);
          } else {
            response.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  }
};