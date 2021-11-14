const isUser = require("../middlewares/isUser");
const apiRoutes = require("./api.js");
const data = require("./data.js");

function route(app) {

  app.use('/api', apiRoutes);
  app.use('/data', data);

  app.get("/verifyToken", isUser, function (req, res) {
    res.sendStatus(200);
  });

}

  

module.exports = route;
