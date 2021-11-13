const isUser = require("../middlewares/isUser");
const isManager = require("../middlewares/isManager");
const apiRoutes = require("./api.js");

function route(app) {

  app.use('/api', apiRoutes);

  app.get("/verifyToken", isUser, function (req, res) {
    res.sendStatus(200);
  });

}
module.exports = route;
