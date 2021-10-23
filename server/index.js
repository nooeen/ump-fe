const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const route = require('../src/routes');

// const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/uetstudentmanager", function(error) {
//   console.log("inside?");
//   console.log(error);
// });


const db = require('../src/config/db');
db.connect();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

// app.get('/api/greeting', (req, res) => {
//   const name = req.query.name || 'World';
//   res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
// });

// app.get("/", (req, res) => {
//   res.send("home")
// })

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
