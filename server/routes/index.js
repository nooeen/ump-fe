const registerController = require("../controllers/register");
const loginController = require("../controllers/login");
const isUser = require("../middlewares/isUser");
const isManager = require("../middlewares/isManager");

function route(app) {
  app.get("/api/", function (req, res) {
    res.send("Welcome to UMP's API Server!");
  });

  app.get("/api/test/secretUser", isUser, function (req, res) {
    res.send("You're an user!");
  });

  app.get("/api/test/secretManager", isUser, isManager, function (req, res) {
    res.send("You're a manager!");
  });

  app.get("/verifyToken", isUser, function (req, res) {
    res.sendStatus(200);
  });

  app.post("/api/register", (req, res) =>
    registerController.register(req, res)
  );

  app.post("/api/login", (req, res) => loginController.login(req, res));
}
module.exports = route;
