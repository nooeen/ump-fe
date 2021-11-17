const express = require("express");
const router = express.Router();
const managerController = require("../controllers/manager");

router.get("/list", managerController.managerList);

router.get("/find", managerController.managerFind);

module.exports = router;
