const csvModel = require("../models/User");
const XLSX = require("xlsx");

class DataController {
  // [GET] /api/data/import
  import(req, res, next) {
    console.log("ok");
    csvModel.find((err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json("import");
      }
    });
  }

  // [GET] /api/data/export
  export(req, res, next) {
    csvModel.find((err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json("export");
      }
    });
  }

  // [POST] /api/data/importData
  importData(req, res, next) {
    // fs.readFile(req.file.path, 'utf8', function (err, data) {
    //     if (err) throw err;
    //     console.log(data);
    //     var json = JSON.parse(data);
    //
    //     csvModel.insertMany(json, function (err) {
    //         if(err){
    //           console.log(err);
    //         }else{
    //           res.redirect('/api/data/import');
    //         }
    //     });
    // });
    res.json("importdata");
  }

  // [GET] /api/data/exportdata
  exportData(req, res, next) {
    var wb = XLSX.utils.book_new(); //new workbook
    csvModel.find((err, data) => {
      if (err) {
        console.log(err);
      } else {
        var temp = JSON.stringify(data);
        temp = JSON.parse(temp);
        var ws = XLSX.utils.json_to_sheet(temp);
        var down = process.cwd() + "/public/users.xlsx";
        XLSX.utils.book_append_sheet(wb, ws, "sheet1");
        XLSX.writeFile(wb, down);
        res.download(down);
      }
    });
  }
}

module.exports = new DataController();
