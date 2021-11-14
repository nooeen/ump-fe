const express = require("express");
const router = express.Router();
const registerController = require("../controllers/register");
const loginController = require("../controllers/login");
const middlewares = require("../middlewares");
const classController = require("../controllers/class");
const managerController = require("../controllers/manager");
const studentController = require("../controllers/student");
const dataController = require("../controllers/dataController");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

router.get("/", function (req, res) {
  res.send("Welcome to UMP's API Server!");
});

router.get("/isUser", middlewares.isUser, function (req, res) {
  res.status(200).send("You're an user!");
});

router.get(
  "/isManager",
  middlewares.isUser,
  middlewares.isManager,
  function (req, res) {
    res.status(200).send("You're a manager!");
  }
);

router.post("/register", registerController.register);

router.post("/login", loginController.login);

router.get("/manager/list", managerController.managerList);

router.get("/manager/find", managerController.managerFind);

router.get("/class/list", classController.studentList);

router.get("/student/list", studentController.studentList);

router.get("/student/find", studentController.findStudent);

router.get("/student/calGpa", studentController.studentGpa);

router.get("/student/calTpa", studentController.studentTpa);

router.get("/student/credits", studentController.studentCredit);

router.get('/data/import', dataController.import);
router.post('/data/importdata', uploads.single('csv'), dataController.importData);
router.get('/data/export', dataController.export);
router.post('/data/exportdata', dataController.exportData);

module.exports = router;
