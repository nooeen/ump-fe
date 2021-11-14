const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const csvModel = require('../models/Student')
const XLSX = require('xlsx');
const csv = require('csvtojson');
const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'../public/uploads');
    },
    filename:(req,file,cb)=>{
      cb(null,file.originalname);
    }
  });
  
const uploads = multer({storage:storage});


router.get("/dev/user", userController.show);
router.get("/dev/students/create", userController.createStudent);
router.get("/dev/teachers/create", userController.createTeacher)
router.post("/dev/store", userController.store);

router.get('/', (req, res) => {
    csvModel.find((err, data) => {
        if (err) {
        console.log(err);
        } else {
        if (data != '') {
            res.json(data);
        } else {
            res.send('no data');
        }
        }
    });
});

router.post('/uploads',uploads.single('csv'),(req,res)=>{
    //convert csvfile to jsonArray
    console.log("req file", req.file)
    csv()
        .fromFile(req.file.path)
        .then((jsonObj)=>{
            console.log(jsonObj);
            csvModel.insertMany(jsonObj,(err,data)=>{
                if(err){
                    console.log(err);
                    res.send('err');
                } else {
                    res.redirect('data/');
                    return
                }
            });
        });
});

router.post('/exportdata',(req,res)=>{
    var wb = XLSX.utils.book_new(); //new workbook
        csvModel.find((err,data)=>{
            if(err){
                console.log(err)
            } else {
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

module.exports = router;