require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

class studentController {
  // list students within class with role student 
  studentList(req, res) {
    User.find({ class: req.query.class })
      .then((users, err) => {
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }
        for (let i = 0; i < users.length; i++) {
            users[i] = {
              _id: users[i]._id,
              username: users[i].username,
              fullname: users[i].fullname,
              dob: users[i].dob,
              history: users[i].history,
              class: users[i].class,
              hasPaid: users[i].hasPaid,
          };
        }
        res.status(200).json(users);
      })
      .catch(() => {
        res.status(404).json("No student in database");
      });
  }

  studentListAll(req, res) {
    User.find()
      .then((users, err) => {
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }
        for (let i = 0; i < users.length; i++) {
            users[i] = {
              _id: users[i]._id,
              username: users[i].username,
              fullname: users[i].fullname,
              dob: users[i].dob,
              history: users[i].history,
              class: users[i].class,
              hasPaid: users[i].hasPaid,
          };
        }
        res.status(200).json(users);
      })
      .catch(() => {
        res.status(404).json("No student in database");
      });
  }

  // find student with username and fullname
  findStudent(req, res) {
    User.find({ username: req.query.username, fullname: req.query.fullname })
      .then((users, err) => {
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }
        users[0] = {
          _id: users[0]._id,
          username: users[0].username,
          fullname: users[0].fullname,
          dob: users[0].dob,
          history: users[0].history,
          class: users[0].class,
          hasPaid: users[0].hasPaid,
        };
        res.status(200).json(users);
      })
      .catch(() => {
        res.status(404).send("No student match the name");
      });
  }

  //calculate student GPA
  studentGpa(req, res) {
    User.find({ class: req.query.class })
      .then((users, err) => {
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }
        for (let i = 0; i < users.length; i++) {
          let totalGPA = 0;
          let finalGPA = 0;
          let totalCredit = 0;
          for (let j = 0; j < users[i].history.credit.length; j++) {
            totalCredit += users[i].history.credit[j];
          }
          for (let j = 0; j < users[i].history.gpa.length; j++) {
            totalGPA += parseFloat(
              users[i].history.gpa[j] * users[i].history.credit[j]
            );
            finalGPA = totalGPA / totalCredit;
            finalGPA = Math.round(finalGPA * 100) / 100;
          }
          users[i] = {
            _id: users[i]._id,
            username: users[i].username,
            fullname: users[i].fullname,
            GPA: Math.round(finalGPA * 100) / 100,
          };
        }
        res.status(200).json(users);
      })
      .catch(() => {
        res.status(404).json("No student in database");
      });
  }

  //calculate student TPA
  studentTpa(req, res) {
    User.find({ class: req.query.class })
      .then((users, err) => {
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }
        for (let i = 0; i < users.length; i++) {
          let totalTPA = 0;
          let finalTPA = 0;
          for (let j = 0; j < users[i].history.tpa.length; j++) {
            totalTPA += users[i].history.tpa[j];
            finalTPA = totalTPA / (j + 1);
          }
          users[i] = {
            _id: users[i]._id,
            username: users[i].username,
            fullname: users[i].fullname,
            TPA: Math.round(finalTPA * 100) / 100,
          };
        }
        res.status(200).json(users);
      })
      .catch(() => {
        res.status(404).json("No student in database");
      });
  }

  //calculate student total credits
  studentCredit(req, res) {
    User.find({ class: req.query.class })
      .then((users, err) => {
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }
        for (let i = 0; i < users.length; i++) {
          let totalCredit = 0;
          for (let j = 0; j < users[i].history.credit.length; j++) {
            totalCredit += users[i].history.credit[j];
          }
          users[i] = {
            _id: users[i]._id,
            username: users[i].username,
            fullname: users[i].fullname,
            credit: totalCredit,
          };
        }
        res.status(200).json(users);
      })
      .catch(() => {
        res.status(404).json("No student in database");
      });
  }

  //api/student/warn 
  studentWarning(req, res) {
    User.find({ username: req.query.username })
      .then((users, err) => {
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }
        if(users.length == 0){
          res.status(404).send("No student in database");
          return;
        }

        let warning = ""
        let totalGPA = 0
        let totalCredit =0
        let totalTPA = 0

        //calculate GPA TPA
        for (let j = 0; j < users[0].history.gpa.length; j++) {
          totalGPA += parseFloat(users[0].history.gpa[j] * users[0].history.credit[j]);
          totalTPA += users[0].history.tpa[j]
          totalCredit += users[0].history.credit[j];
        }
        totalGPA = totalGPA / totalCredit;
        totalGPA = Math.round(totalGPA * 100) / 100;
        totalTPA = totalTPA / users[0].history.gpa.length;

        //check warning
        if (totalGPA < 2) {
          warning += "GPA của sinh viên dưới 2.0" + '\n'
        }
        if (totalTPA < 50) {
          warning += "Điểm rèn luyện của sinh viên dưới 50 "  + '\n'
        }
        if (users[0].hasPaid == false){
          warning += "Sinh viên chưa đóng học phí"
        }
        
        res.status(200).send(warning);
      })
      .catch(() => {
        res.status(500).send("Internal Server Error");
      })
  }

  //api/student/listwarn
  studentWarningList(req, res) {
    User.find({ class: req.query.class })
      .then((users, err) => {
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }
        if(users.length == 0){
          res.status(404).send("No student in class");
          return;
        }

        let n = 0;

        //each student in class
        for( let i = 0; i < users.length; i++){

          let warning = ""
          let totalGPA = 0
          let totalCredit =0
          let totalTPA = 0
          let haveWarn = false;

          //calculate GPA TPA
          for (let j = 0; j < users[i].history.gpa.length; j++) {
            totalGPA += parseFloat(users[i].history.gpa[j] * users[i].history.credit[j]);
            totalTPA += users[i].history.tpa[j]
            totalCredit += users[i].history.credit[j];
          }
          totalGPA = totalGPA / totalCredit;
          totalGPA = Math.round(totalGPA * 100) / 100;
          totalTPA = totalTPA / users[i].history.gpa.length;

          //check warning
          if (totalGPA < 2) {
            warning += "GPA của sinh viên dưới 2.0"  + '\n'
            haveWarn = true
          }
          if (totalTPA < 50) {
            warning += "Điểm rèn luyện của sinh viên dưới 50 "  + '\n'
            haveWarn = true
          }
          if (users[i].hasPaid == false){
            warning += "Sinh viên chưa đóng học phí"
            haveWarn = true
          }

          //save student which has warning
          if (haveWarn == true){
            users[n] = {
              _id: users[i]._id,
              username: users[i].username,
              fullname: users[i].fullname,
              totalGpa: totalGPA,
              totalTpa: totalTPA,
              class: users[i].class,
              reason: warning
            };
            n += 1
          }
        }

        //remove student not have warning
        for(let i = users.length -1; i >= n; i--) {
          users.pop()
        }

        res.status(200).json(users);
      })
      .catch(() => {
        res.status(500).send("Internal Server Error");
      })
  }
  
//api/student/bonus 
studentBonus(req, res) {
  User.find({ username: req.query.username })
    .then((users, err) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }
      if(users.length == 0){
        res.status(404).send("No student in database");
        return;
      }

      let bonus = ""
      let totalGPA = 0
      let totalCredit =0
      let totalTPA = 0

      //calculate GPA TPA
      for (let j = 0; j < users[0].history.gpa.length; j++) {
        totalGPA += parseFloat(users[0].history.gpa[j] * users[0].history.credit[j]);
        totalTPA += users[0].history.tpa[j]
        totalCredit += users[0].history.credit[j];
      }
      totalGPA = totalGPA / totalCredit;
      totalGPA = Math.round(totalGPA * 100) / 100;
      totalTPA = totalTPA / users[0].history.gpa.length;

      //check bonus
      if (totalGPA >= 3.6 && totalTPA >= 90) {
        bonus += "Sinh viên đủ điều kiện để được khen thưởng"
      }
      res.status(200).send(bonus);
    })
    .catch(() => {
      res.status(500).send("Internal Server Error");
    })
  }

  //api/student/listbonus
  studentBonusList(req, res) {
    User.find({ class: req.query.class })
      .then((users, err) => {
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }
        if(users.length == 0){
          res.status(404).send("No student in class");
          return;
        }

        let n = 0;
        

        //each student in class
        for( let i = 0; i < users.length; i++){

          let bonus = ""
          let totalGPA = 0
          let totalCredit =0
          let totalTPA = 0
          let haveBonus= false;

          //calculate GPA TPA
          for (let j = 0; j < users[i].history.gpa.length; j++) {
            totalGPA += parseFloat(users[i].history.gpa[j] * users[i].history.credit[j]);
            totalTPA += users[i].history.tpa[j]
            totalCredit += users[i].history.credit[j];
          }
          totalGPA = totalGPA / totalCredit;
          totalGPA = Math.round(totalGPA * 100) / 100;
          totalTPA = totalTPA / users[i].history.gpa.length;

          //check bonus
          if (totalGPA >= 3.6 && totalTPA >= 90) {
            bonus += "Sinh viên đủ điều kiện khen thưởng"
            haveBonus = true
          }
          
          //save student which has warning
          if (haveBonus == true){
            users[n] = {
              _id: users[i]._id,
              username: users[i].username,
              fullname: users[i].fullname,
              totalGpa: totalGPA,
              totalTpa: totalTPA,
              dob: users[i].dob,
              history: users[i].history,
              class: users[i].class,
              hasPaid: users[i].hasPaid,
            };
            n += 1
          }
          console.log('check3')
        }
        
        //remove student not have bonus
        for(let i = users.length -1; i >= n; i--) {
          users.pop()
        }

        res.status(200).json(users);
      })
      .catch(() => {
        res.status(500).send("Internal Server Error");
      })
  }
}



module.exports = new studentController();
