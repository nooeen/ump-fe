const test = require("./test.js");
const auth = require("./auth.js");
const data = require("./data.js");
const student = require("./student.js");
const manager = require("./manager.js");
const email = require("./email.js");

function route(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.use("/api/email", email)
  app.use("/api/student", student);
  app.use("/api/manager", manager);
  app.use("/api/data", data); 
  app.use("/api", auth);
}

module.exports = route;
