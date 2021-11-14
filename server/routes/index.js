const apiRoutes = require("./api.js");
const data = require("./data.js");

function route(app) {
  app.use('/api', apiRoutes);
  app.use('/data', data);
}

module.exports = route;
