var morgan = require('morgan'), //used for logging incoming request
  bodyParser = require('body-parser'),
  helpers = require ('./helpers.js');

module.exports = function ( app, express ) {
  var userRouter = express.Router();
  var commentRouter = express.Router();
  var postRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '../../client'));

  app.use('/api/users', userRouter); // use userRouter for all user requests
  app.use('/api/posts', postRouter); // use postRouter for all user post requests
  app.use('/api/comments', commentRouter); // use commentRouter for all use comment requests

  // authentication middleware used to decode token and made available on the request
// app.use('someroute/someroute', helpers.decode);
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  //inject our routers into their respective route files
  require('../comments/commentRoutes.js')(commentRouter);
  require('../posts/postRoutes.js')(postRouter);
  require('../users/userRoutes.js')(userRouter);
};