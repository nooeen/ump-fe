const registerController = require("../controllers/register");
const loginController = require("../controllers/login");
const userController = require('../controllers/userController');
const withAuth = require('../middleware');
const csvModel    = require('../models/Student');
const csv         = require('csvtojson');
const multer      = require('multer');
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
  app.get("/dev/teachers/create", userController.createTeacher)
  app.post("/dev/store", userController.store);

  app.get('/', (req, res) => {
    csvModel.find((err, data) => {
      if (err) {
        console.log(err);
      } else {
        if (data != '') {
          res.render('demo', {data: data});
        } else {
          res.render('demo', {data: ''});
        }
      }
    });
  });

  app.post('/',uploads.single('csv'),(req,res)=>{
    //convert csvfile to jsonArray
    csv()
        .fromFile(req.file.path)
        .then((jsonObj)=>{
          console.log(jsonObj);
          csvModel.insertMany(jsonObj,(err,data)=>{
            if(err){
              console.log(err);
            }else{
              res.redirect('/');
            }
          });
        });
  });

  app.post('/exportdata',(req,res)=>{
    var wb = XLSX.utils.book_new(); //new workbook
    csvModel.find((err,data)=>{
      if(err){
        console.log(err)
      }else{
        var temp = JSON.stringify(data);
        temp = JSON.parse(temp);
        var ws = XLSX.utils.json_to_sheet(temp);
        var down = process.cwd() + '/public/users.xlsx'
        XLSX.utils.book_append_sheet(wb,ws,"sheet1");
        XLSX.writeFile(wb,down);
        res.download(down);
      }
    });
  });
}

module.exports = route;
