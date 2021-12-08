const Notification = require("../models/Notification.js");

class notificationController {
  comment(req, res) {
    const comment = {
      username: req.body.username,
      content: req.body.content,
    };
    Notification.findOneAndUpdate(
      { _id: req.body.id },
      { $push: { comments: comment } },
      { new: true }
    ).then((notification, err) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }
      res.status(200).json(notification);
    });
  }

  list(req, res) {
    Notification.find({ class: req.query.class }).then((notifications, err) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }
      res.status(200).json(notifications);
    });
  }

  add(req, res) {
    const notification = new Notification();
    notification.title = req.body.title;
    notification.class = req.body.class;
    notification.content = req.body.content;
    notification
      .save()
      .then(() => res.json(notification))
      .catch((error) => {
        res.status(200).send("Username already exists");
      });
  }

  delete(req, res) {
    Notification.findOneAndRemove({ _id: req.query.id }, (err, docs) => {
      if (err) {
        console.log(err);
      }
    });
    res.status(200);
  }
}

module.exports = new notificationController();
