const apiRoutes = require("./api.js");
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
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.use("/api", apiRoutes);
}

module.exports = route;
