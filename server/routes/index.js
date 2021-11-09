const registerController = require("../controllers/register");
const loginController = require("../controllers/login");
const withAuth = require('../middleware');

function route(app) {
  app.get("/api/home", function (req, res) {
    res.send("Welcome!");
  });

  app.get("/api/secret", withAuth, function (req, res) {
    res.send("The password is potato");
  });

  app.get('/verifyToken', withAuth, function(req, res) {
    res.sendStatus(200);
  });

  app.post("/api/register", (req, res) =>
    registerController.register(req, res)
  );

  app.post("/api/login", (req, res) =>
    loginController.login(req, res)
  );
}
module.exports = route;
