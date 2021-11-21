const express = require("express");
const router = express.Router();
const forumController = require("../controllers/forum");

router.get("/create", forumController.create);
router.post("/store", forumController.store);
router.get("/post/:id/edit", forumController.edit);
router.post("/post/:id/update", forumController.update);
router.post("/post/:id/comment", forumController.comment);
router.get("/posts", forumController.listPosts);
router.get("/post/:id", forumController.show);

module.exports = router;