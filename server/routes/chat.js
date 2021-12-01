const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat");

router.get("/getMessage", chatController.getMessage);
router.post("/saveMessage", chatController.saveMessage);

router.get("/twoUserConv", chatController.twoUserConv);
router.get("/userConv", chatController.userConv);
router.post("/newConv", chatController.newConv);

module.exports = router;
