// const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const csvModel = require('../models/Student');
const csv = require('csvtojson');
const XLSX = require('xlsx');





class DataController {


    // [GET] /api/data/import
    import(req, res, next) {
        console.log("ok");
        csvModel.find((err, data) => {
            if (err) {
              console.log(err);
            } else {
              if (data != '') {
                res.render('data/import', {data: data});
              } else {
                res.render('data/import', {data: ''});
              }
            }
          });
    }

    // [GET] /api/data/export
    export(req, res, next) {
        csvModel.find((err, data) => {
            if (err) {
              console.log(err);
            } else {
              if (data != '') {
                res.render('data/export', {data: data});
              } else {
                res.render('data/export', {data: ''});
              }
            }
          });
    }

    // [POST] /api/data/importData
    importData(req,res,next){
        //convert csvfile to jsonArray
        csv()
            .fromFile(req.file.path)
            .then((jsonObj)=>{
              console.log(jsonObj);
              csvModel.insertMany(jsonObj,(err,data)=>{
                if(err){
                  console.log(err);
                }else{
                  res.redirect('/api/data/import');
                }
              });
            });
    }

    // [POST] /api/data/exportdata
    exportData(req,res,next){
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
    }
    

}

module.exports = new DataController();