const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const route = require('./routes');
const session = require('express-session');
const cookieParser = require('cookie-parser');


const db = require('./config/db');
db.connect();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.use(cookieParser());

app.use(session({
  resave: true, 
  saveUninitialized: true, 
  secret: 'somesecret', 
  cookie: { maxAge: 60000 }}))

  
// Template engine
app.engine(
  'hbs',
  handlebars({
      extname: '.hbs',
      helpers: {
          sum: (a, b) => a + b,
      },
  }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../src/resources', 'views'))

route(app);

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
