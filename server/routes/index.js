const apiRoutes = require("./api.js");

function route(app) {
  app.use("/api", apiRoutes);
}
module.exports = route;
