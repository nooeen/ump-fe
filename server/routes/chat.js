const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat");

router.get("/getMessage", chatController.getMessage);
router.get("/getListMessager", chatController.getListMessager);
router.post("/saveMessage", chatController.saveMessage);


module.exports = router;
