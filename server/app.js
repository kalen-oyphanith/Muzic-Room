// import libraries
const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const url = require('url');
const redis = require('redis'); // connects to redis
const csrf = require('csurf');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/MuzicRoom';

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// connect to mongoose
mongoose.connect(dbURL, mongooseOptions, (err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});

let redisURL = {
  hostname: 'redis-10650.c13.us-east-1-3.ec2.cloud.redislabs.com',
  port: 10650,
};

let redisPASS = 'bXdrfoniDyUP2Ea2wTLNVQTWpML3F6rV';
if (process.env.REDISCLOUD_URL) {
  redisURL = url.parse(process.env.REDISCLOUD_URL);
  [, redisPASS] = redisURL.auth.split(':');
}
const redisClient = redis.createClient({
  host: redisURL.hostname,
  port: redisURL.port,
  password: redisPASS,
});

// connect to our router
const router = require('./router.js');

const app = express();

app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));

app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));

app.use(compression());

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(session({
  key: 'sessionid',
  store: new RedisStore({
    client: redisClient,
  }),
  secret: 'Muzic app',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
  },
}));

app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
}));

// creates our handle bars
app.set('view engine', 'handlebars');

app.set('views', `${__dirname}/../views`);

app.disable('x-powered-by');

app.use(cookieParser());

// csrf must come AFTER app.use(cookieParser());
// and app.use(session({...}));
// should come BEFORE the router
app.use(csrf());
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  console.log('Missing CSRF token');
  return false;
});

router(app);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});
