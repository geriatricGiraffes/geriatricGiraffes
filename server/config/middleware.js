var morgan = require('morgan'), //used for logging incoming request
  bodyParser = require('body-parser'),
  helpers = require ('./helpers.js');

var request = require('request');
var qs = require('querystring');
var User = require('../users/userModel.js');
var logger = require('morgan');
var jwt = require('jwt-simple');
var moment = require('moment');
var colors = require('colors');

var config = require('./config');

module.exports = function ( app, express ) {
  var userRouter = express.Router();
  var commentRouter = express.Router();
  var postRouter = express.Router();




  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  app.use('/api/users', userRouter); // use userRouter for all user requests
  app.use('/api/post', postRouter); // use postRouter for all user post requests
  app.use('/api/post', commentRouter); // use commentRouter for all use comment requests

  // authentication middleware used to decode token and made available on the request
// app.use('someroute/someroute', helpers.decode);
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);


  /*
   |--------------------------------------------------------------------------
   | Login Required Middleware
   |--------------------------------------------------------------------------
   */
  function ensureAuthenticated(req, res, next) {
    if (!req.header('Authorization')) {
      return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
    }
    var token = req.header('Authorization').split(' ')[1];

    var payload = null;
    try {
      payload = jwt.decode(token, config.TOKEN_SECRET);
    }
    catch (err) {
      return res.status(401).send({ message: err.message });
    }

    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: 'Token has expired' });
    }
    req.user = payload.sub;
    next();
  }


/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
function createJWT(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

/*
 |--------------------------------------------------------------------------
 | GET /api/me
 |--------------------------------------------------------------------------
 */
app.get('/api/me', ensureAuthenticated, function(req, res) {
  User.findById(req.user, function(err, user) {
    res.send(user);
  });
});

/*
 |--------------------------------------------------------------------------
 | PUT /api/me
 |--------------------------------------------------------------------------
 */
app.put('/api/me', ensureAuthenticated, function(req, res) {
  User.findById(req.user, function(err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }
    user.displayName = req.body.displayName || user.displayName;
    user.email = req.body.email || user.email;
    user.save(function(err) {
      res.status(200).end();
    });
  });
});


/*
 |--------------------------------------------------------------------------
 | Login with GitHub
 |--------------------------------------------------------------------------
 */
app.post('/auth/github', function(req, res) {
  var accessTokenUrl = 'https://github.com/login/oauth/access_token';
  var userApiUrl = 'https://api.github.com/user';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: config.GITHUB_SECRET,
    redirect_uri: req.body.redirectUri
  };

  // Step 1. Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params }, function(err, response, accessToken) {
    accessToken = qs.parse(accessToken);
    var headers = { 'User-Agent': 'Satellizer' };

    // Step 2. Retrieve profile information about the current user.
    request.get({ url: userApiUrl, qs: accessToken, headers: headers, json: true }, function(err, response, profile) {

      // Step 3a. Link user accounts.
      if (req.header('Authorization')) {
        User.findOne({ github: profile.id }, function(err, existingUser) {
          if (existingUser) {
            return res.status(409).send({ message: 'There is already a GitHub account that belongs to you' });
          }
          var token = req.header('Authorization').split(' ')[1];
          var payload = jwt.decode(token, config.TOKEN_SECRET);
          User.findById(payload.sub, function(err, user) {
            if (!user) {
              return res.status(400).send({ message: 'User not found' });
            }
            user.github = profile.id;
            user.picture = user.picture || profile.avatar_url;
            user.displayName = user.displayName || profile.name;
            user.save(function() {
              var token = createJWT(user);
              res.send({ token: token });
            });
          });
        });
      } else {
        // Step 3b. Create a new user account or return an existing one.
        User.findOne({ github: profile.id }, function(err, existingUser) {
          if (existingUser) {
            var token = createJWT(existingUser);
            return res.send({ token: token });
          }
          var user = new User();
          user.github = profile.id;
          user.picture = profile.avatar_url;
          user.displayName = profile.name;
          user.save(function() {
            var token = createJWT(user);
            res.send({ token: token });
          });
        });
      }
    });
  });
});


/*
 |--------------------------------------------------------------------------
 | Unlink Provider
 |--------------------------------------------------------------------------
 */
app.post('/auth/unlink', ensureAuthenticated, function(req, res) {
  var provider = req.body.provider;
  var providers = ['facebook', 'foursquare', 'google', 'github', 'instagram',
    'linkedin', 'live', 'twitter', 'twitch', 'yahoo'];

  if (providers.indexOf(provider) === -1) {
    return res.status(400).send({ message: 'Unknown OAuth Provider' });
  }

  User.findById(req.user, function(err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User Not Found' });
    }
    user[provider] = undefined;
    user.save(function() {
      res.status(200).end();
    });
  });
});




  //inject our routers into their respective route files
  require('../comments/commentRoutes.js')(commentRouter);
  require('../posts/postRoutes.js')(postRouter);
  require('../users/userRoutes.js')(userRouter);
};
