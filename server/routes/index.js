const registerController = require("../controllers/register");
const loginController = require("../controllers/login");
const userController = require('../controllers/userController');
const dataController = require('../controllers/dataController');
const withAuth = require('../middleware');

const csv = require('csvtojson');
const multer = require('multer');
const XLSX = require('xlsx');

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./public/uploads');
  },
  filename:(req,file,cb)=>{
    cb(null,file.originalname);
  }
});

const uploads = multer({storage:storage});


function route(app) {
  app.get("/api/home", function (req, res) {
    res.send("Welcome!");
  });

  app.get("/api/secret", withAuth, function (req, res) {
    res.send("The password is potato");
  });

  app.get('/verifyToken', withAuth, function (req, res) {
    res.sendStatus(200);
  });

  app.post("/api/register", (req, res) =>
      registerController.register(req, res)
  );

  app.post("/api/login", (req, res) =>
      loginController.login(req, res)
  );

  /**
   * vp
   */
  app.get("/dev/user", userController.show);
  app.get("/dev/students/create", userController.createStudent);
  app.get("/dev/teachers/create", userController.createTeacher);
  app.post("/dev/store", userController.store);


  app.get('/api/data/import', dataController.import);
  app.post('/api/data/importdata', uploads.single('csv'), dataController.importData);
  app.get('/api/data/export', dataController.export);
  app.post('/api/data/exportdata', dataController.exportData);

 

}

module.exports = route;
