const test = require("./test.js");
const auth = require("./auth.js");
const data = require("./data.js");
const student = require("./student.js");
const manager = require("./manager.js");
const email = require("./email.js");
const forum = require("./forum.js");
const chat = require("./chat.js");
const notification = require("./notification.js");

function route(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.use("/api/student", student);
  app.use("/api/manager", manager);
  app.use("/api/data", data);
  app.use("/api/email", email);
  app.use("/api/forum", forum);
  app.use("/api/chat", chat);
  app.use("/api/notification", notification);
  app.use("/api", auth);
  app.use("/api", test);
}

module.exports = route;
