// const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const csvModel = require('../models/Student');
const csv = require('csvtojson');
const XLSX = require('xlsx');





class DataController {

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
                  res.status(200).send('Import data successfully');
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
            var down = 'users.xlsx'
            XLSX.utils.book_append_sheet(wb,ws,"sheet1");
            XLSX.writeFile(wb,down);
            res.download(down);
            res.status(200).send('Downloading................')
          }
        });
    }
    
}

module.exports = new DataController();