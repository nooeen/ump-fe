const apiRoutes = require("./api.js");
const data = require("./data.js");

function route(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.use("/api", apiRoutes);
  app.use("/data", data);
}

module.exports = route;
