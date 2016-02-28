/* 
Auth Code

Note: On original feature branch, these authentication elements were spread throughout multiple files (hence the module.exports syntax).
I've put them all in one place to avoid merge conflicts, and so whoever may use this to implement authentication can see all the 
code together.

*/

/* Application is registered with GitHub.  Passport uses these below. */
module.exports = {
  github: {
    clientID: '672b931e1035003e8481',
    clientSecret: '5c8d9612881ee824f3eafa6acdb6d43f9721d583',
    callbackURL: 'http://127.0.0.1:8000/auth/github/callback'
  }
};

var GitHubStrategy = require('passport-github2');

/* From documentation, how to configure middleware.  If you want persistant login sessions, then you need the 
express.session() and passport.session() */
app.configure(function () {
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});
 

/* After a session is established, a cookie is stored in the browers.
These serialize and deserialize functions keep track for user instances as they start and finish sessions. */
passport.serializeUser(function (user, done) {
    done(null, user.id);
});


passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if(!err){
      done(err, user);
    } else {
      done(err, null);
    }
  });

/* Configure Passport using app information from Github */

passport.use(new GitHubStrategy({
    clientID: configAuth.github.clientID,
    clientSecret: configAuth.github.clientSecret,
    callbackURL: configAuth.github.callbackURL
  },
  // Auth callback accepts accessToken, refreshToken(to get a new access token)
  // profile has profile information from Github
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ oauthID: profile.id }, function (err, user) {
      if (err) {
        return done(err);
      } 
      if(!err && user !== null){
        return done(err, user);
      } else {
        //TODO: Link user to database.
        var user = new User({
          oauthID: ,
          name:
          created: Date.now()
        });
        user.save(function (err) {
          if(err){
            console.log(err);
          } else {
            console.log("Saving user.....");
            done(null, user);
          }
        })
      }
    });
  }
));

/* Routes */

// Redirect user to Github for authentication.  
// Might need to add scope object here depending on what want to accomplish with Github.  
app.get('/auth/github',
  passport.authenticate('github')
);

// Github redirects user back to Hack Overflow.  If user granted an access token, redirect to posts page.
// If not authorized, redirected to login.  
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/posts');
});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


// Same route middleware to redirect users who are not authenticated to the login page.
function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) { 
    return next(); 
  }
  
  res.redirect('/login');
}

