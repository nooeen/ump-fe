const dataController = require("../controllers/data");
const express = require("express");
const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

router.post("/import", uploads.single("csv"), dataController.importData);
router.get("/export", dataController.exportData);

module.exports = router;
