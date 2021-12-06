const Notification = require("../models/Notification.js");

class notificationController {
  list(req, res) {
    Notification.find({ class: req.query.class }).then((notifications, err) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }
      res.status(200).json(notifications);
    });
  }

  add(req, res) {}

  delete(req, res) {}
}

module.exports = new notificationController();
