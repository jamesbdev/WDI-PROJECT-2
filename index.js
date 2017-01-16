const express        = require('express');
const morgan         = require('morgan');
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const cors           = require('cors');
const expressJWT     = require('express-jwt');

const config         = require('./config/config');
const webRouter      = require('./config/webRoutes');
const apiRouter      = require('./config/apiRoutes');

const app            = express();

mongoose.connect(config.db, () => {
  return console.log(`Connected to db: ${config.db}`);
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(`${__dirname}/public`));

// app.use('/api', expressJWT({ secret: config.secret })
//   .unless({
//     path: [
//       { url: '/api/register', methods: ['POST'] },
//       { url: '/api/login',    methods: ['POST'] }
//     ]
//   }));
app.use(jwtErrorHandler);

function jwtErrorHandler(err, req, res, next){
  if (err.name !== 'UnauthorizedError') return next();
  return res.status(401).json({ message: 'Unauthorized request.' });
}

app.use('/api', apiRouter);
app.use('/', webRouter);

app.listen(config.port, () => {
  return console.log(`Express is listening on port ${config.port}`);
});
