const User = require("../models/User.js");

class managerController {
  // api/manager/list
  listManager(req, res) {
    User.find({ role: "manager" })
      .then((users, err) => {
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }
        if (users.length === 0) {
          res.status(404).json("No manager in database");
          return;
        }
        for (let i = 0; i < users.length; i++) {
          users[i] = {
            username: users[i].username,
            _id: users[i]._id,
          };
        }
        res.status(200).json(users);
      })
      .catch(() => {
        res.status(404).json("Internal Server Error");
      });
  }

  // api/manager/find?username=sth
  findManager(req, res) {
    User.findOne({ username: req.query.username })
      .then((user, err) => {
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }
        if (user.length === 0) {
          res.status(404).json("No manager match the name");
          return;
        }
        res.status(200).json(user);
      })
      .catch(() => {
        res.status(404).send("Internal Server Error");
      });
  }

  findManagerFromStudent(req, res) {
    User.findOne({ username: req.query.username })
      .then((user, err) => {
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }
        if (user.length === 0 || user.role === "manager") {
          res.status(404).json("No manager match the name");
          return;
        }
        User.findOne({ classes: user.class, role: "manager" })
          .then((user, err) => {
            if (err) {
              res.status(500).send("Internal Server Error");
              return;
            }
            if (user.length === 0) {
              res.status(404).json("No manager match the name");
              return;
            }
            res.status(200).json(user);
          })
          .catch(() => {
            res.status(404).send("Internal Server Error");
          });
      })
      .catch(() => {
        res.status(404).send("Internal Server Error");
      });
  }

  listManagerClasses(req, res) {
    User.findOne({ username: req.query.username })
      .select({ classes: 1, _id: 0 })
      .then((user, err) => {
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }
        if (!user) {
          res.status(404).json("No manager match the name");
          return;
        }
        res.status(200).json(user);
      })
      .catch(() => {
        res.status(404).send("Internal Server Error");
      });
  }

  updateManager(req, res, next) {
    User.updateOne({ username: req.body.username }, req.body)
      .then(() => res.json(req.body))
      .catch(next);
  }
}

module.exports = new managerController();
