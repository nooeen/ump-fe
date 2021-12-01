const userModel = require("../models/User");
const XLSX = require("xlsx");
const fs = require("fs");

class DataController {
  // [POST] /api/data/importData
  importData(req, res, next) {
    fs.readFile(req.file.path, 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data);
        var json = JSON.parse(data);

      userModel.insertMany(json, function (err) {
            if(err){
              console.log(err);
            }else{
              res.redirect('/api/data/import');
            }
        });
    });
    res.json("importdata");
  }

  // [GET] /api/data/exportdata/?class=...
  exportData(req, res, next) {
    var wb = XLSX.utils.book_new(); //new workbook
    userModel.find(
      { class: req.query.class },
      "username fullname dob class hasPaid student_phone parent_phone address",
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          var temp = JSON.stringify(data);
          temp = JSON.parse(temp);
          // res.json(temp);
          var ws = XLSX.utils.json_to_sheet(temp);
          var wscols = [
            {wch:50},
            {wch:50},
            {wch:50},
            {wch:50},
            {wch:50},
            {wch:50},
            {wch:50},
            {wch:50},
          ];
          ws['!cols'] = wscols;

          var down = process.cwd() + "/public/users.xlsx";
          XLSX.utils.book_append_sheet(wb, ws, "sheet1");
          XLSX.writeFile(wb, down);
          res.download(down);
        }
      }
    );
  }
}

module.exports = new DataController();
