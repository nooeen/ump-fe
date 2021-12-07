const User = require("../models/User.js");
// const Post = require("../models/Forum.js");

function rand_between(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class studentController {
  getStudentStatistic(req, res) {
    if (req.query.class === "undefined") {
      return;
    }
    User.find({ class: req.query.class })
      .then((users, err) => {
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }
        let terms = [];
        for (let i = 0; i < users[0].history.length; i++) {
          terms.push(users[0].history[i].term);
        }
        let result = [];
        for (let i = 0; i < terms.length; i++) {
          let term = {};
          term.name = terms[i];
          let gpa = 0;
          for (let j = 0; j < users.length; j++) {
            for (let k = 0; k < users[j].history.length; k++) {
              if (users[j].history[k].term === term.name) {
                gpa += parseFloat(users[j].history[k].gpa);
              }
            }
          }
          term.Điểm = (gpa / users.length);
          term.name =
            "20" +
            term.name.split("_")[0] +
            " - 20" +
            term.name.split("_")[1] +
            " | HK" +
            term.name.split("_")[2];
          result.push(term);
        }
        res.json(result);
      })
      .catch((error) => {
        res.status(404).json(error);
        throw error;
      });
  }

  deleteStudent(req, res) {
    User.find({ username: req.query.username }).deleteOne().exec();
    res.status(200);
  }

  addStudent(req, res) {
    const student = new User();
    student.username = req.body.username;
    student.password = req.body.password;
    student.role = "student";
    student.fullname = req.body.fullname;
    student.dob = new Date(req.body.dob);
    student.class = req.body.class;
    student.student_phone = req.body.student_phone;
    student.address = req.body.address;
    student.parent_phone = req.body.parent_phone;
    student.avatar = req.body.avatar;
    student.hasPaid = false;

    var his = [];
    var yearStr = "20" + student.username.substring(0, 2);
    var year = parseInt(yearStr);
    var now = parseInt(new Date().getFullYear());
    var noy = now - year;
    now = now % 100;
    for (let i = 0; i < noy; i++) {
      var history1 = {};
      history1.term = now - noy + i + "_" + (now - noy + i + 1) + "_1";
      history1.gpa = (rand_between(0, 40) * 1.0) / 10;
      history1.tpa = rand_between(0, 100);
      history1.credit = rand_between(10, 20);
      var history2 = {};
      history2.term = now - noy + i + "_" + (now - noy + i + 1) + "_2";
      history2.gpa = (rand_between(0, 40) * 1.0) / 10;
      history2.tpa = rand_between(0, 100);
      history2.credit = rand_between(10, 20);
      his.push(history1);
      his.push(history2);
    }
    student.history = his;
    // res.json(student);
    student
      .save()
      .then(() => res.json(student))
      .catch((error) => {
        res.status(200).send("Username already exists");
      });
  }

  updateStudent(req, res, next) {
    User.updateOne({ username: req.body.username }, req.body)
      .then(() => res.json(req.body))
      .catch(next);
  }

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

  //List all students
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

  findStudent(req, res) {
    User.findOne({ username: req.query.username })
      .then((user, err) => {
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }
        res.status(200).json(user);
      })
      .catch(() => {
        res.status(404).send("No student match the name");
      });
  }

  //calculate student GPA
  studentGPA(req, res) {
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
          for (let j = 0; j < users[i].history.length; j++) {
            totalCredit += users[i].history[j].credit;
          }
          for (let j = 0; j < users[i].history.length; j++) {
            totalGPA += parseFloat(
              users[i].history[j].gpa.toJSON()["$numberDecimal"] *
                users[i].history[j].credit
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
  studentTPA(req, res) {
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
            totalTPA += users[i].history[j].tpa;
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
          for (let j = 0; j < users[i].history.length; j++) {
            totalCredit += users[i].history[j].credit;
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
    User.findOne({ username: req.query.username })
      .then((user, err) => {
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }
        if (!user) {
          res.status(404).send("No student in database");
          return;
        }

        let warning = "";
        let totalGPA = 0;
        let totalTPA = 0;

        //calculate GPA TPA
        for (let j = 0; j < user.history.length; j++) {
          totalGPA += parseFloat(
            user.history[j].gpa.toJSON()["$numberDecimal"]
          );
          totalTPA += user.history[j].tpa;
        }
        totalGPA = totalGPA / user.history.length;
        totalGPA = Math.round(totalGPA * 100) / 100;
        totalTPA = totalTPA / user.history.length;

        //check warning
        if (totalGPA < 2) {
          warning = warning + "GPA của sinh viên dưới 2.0 \n";
        }
        if (totalTPA < 50) {
          warning = warning + "Điểm rèn luyện của sinh viên dưới 50 \n";
        }
        if (user.hasPaid === false) {
          warning = warning + "Sinh viên chưa đóng học phí";
        }

        res.status(200).send(warning);
      })
      .catch(() => {
        res.status(500).send("Internal Server Error");
      });
  }

  //api/student/listwarn
  studentWarningList(req, res) {
    User.find({ class: req.query.class })
      .then((users, err) => {
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }
        if (users.length === 0) {
          res.status(404).send("No student in class");
          return;
        }

        let n = 0;

        //each student in class
        for (let i = 0; i < users.length; i++) {
          let warning = [];
          let totalGPA = 0;
          let totalTPA = 0;
          let haveWarn = false;

          //calculate GPA TPA
          for (let j = 0; j < users[i].history.length; j++) {
            totalGPA += parseFloat(
              users[i].history[j].gpa.toJSON()["$numberDecimal"]
            );
            totalTPA += users[i].history[j].tpa;
          }
          totalGPA = totalGPA / users[i].history.length;
          totalGPA = Math.round(totalGPA * 100) / 100;
          totalTPA = totalTPA / users[i].history.length;

          //check warning
          if (totalGPA < 2) {
            warning.push("GPA của sinh viên dưới 2.0");
            haveWarn = true;
          }
          if (totalTPA < 50) {
            warning.push("Điểm rèn luyện của sinh viên dưới 50 ");
            haveWarn = true;
          }
          if (users[i].hasPaid === false) {
            warning.push("Sinh viên chưa đóng học phí");
            haveWarn = true;
          }

          //save student which has warning
          if (haveWarn === true) {
            users[n] = {
              _id: users[i]._id,
              username: users[i].username,
              fullname: users[i].fullname,
              totalGpa: totalGPA,
              totalTpa: totalTPA,
              class: users[i].class,
              reason: warning,
            };
            n += 1;
          }
        }

        //remove student not have warning
        for (let i = users.length - 1; i >= n; i--) {
          users.pop();
        }

        res.status(200).json(users);
      })
      .catch(() => {
        res.status(500).send("Internal Server Error");
      });
  }

  //api/student/bonus
  studentBonus(req, res) {
    User.findOne({ username: req.query.username })
      .then((user, err) => {
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }
        if (user.length === 0) {
          res.status(404).send("No student in database");
          return;
        }

        let bonus = "";
        let totalGPA = 0;
        let totalTPA = 0;

        //calculate GPA TPA
        for (let j = 0; j < user.history.length; j++) {
          totalGPA += parseFloat(
            user.history[j].gpa.toJSON()["$numberDecimal"]
          );
          totalTPA += user.history[j].tpa;
        }
        totalGPA = totalGPA / user.history.length;
        totalGPA = Math.round(totalGPA * 100) / 100;
        totalTPA = totalTPA / user.history.length;

        //check bonus
        if (totalGPA >= 3.6 && totalTPA >= 90) {
          bonus += "Sinh viên đủ điều kiện để được khen thưởng";
        }
        res.status(200).send(bonus);
      })
      .catch(() => {
        res.status(500).send("Internal Server Error");
      });
  }

  //api/student/listbonus
  studentBonusList(req, res) {
    User.find({ class: req.query.class })
      .then((users, err) => {
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }
        if (users.length === 0) {
          res.status(404).send("No student in class");
          return;
        }

        let n = 0;

        //each student in class
        for (let i = 0; i < users.length; i++) {
          // let bonus = "";
          let totalGPA = 0;
          let totalTPA = 0;
          let haveBonus = false;

          //calculate GPA TPA
          for (let j = 0; j < users[i].history.length; j++) {
            totalGPA += parseFloat(
              users[i].history[j].gpa.toJSON()["$numberDecimal"]
            );
            totalTPA += users[i].history[j].tpa;
          }
          totalGPA = totalGPA / users[i].history.length;
          totalGPA = Math.round(totalGPA * 100) / 100;
          totalTPA = totalTPA / users[i].history.length;

          //check bonus
          if (totalGPA >= 3.6 && totalTPA >= 90) {
            // bonus += "Sinh viên đủ điều kiện khen thưởng";
            haveBonus = true;
          }

          //save student which has warning
          if (haveBonus === true) {
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
            n += 1;
          }
          console.log("check3");
        }

        //remove student not have bonus
        for (let i = users.length - 1; i >= n; i--) {
          users.pop();
        }

        res.status(200).json(users);
      })
      .catch(() => {
        res.status(500).send("Internal Server Error");
      });
  }
}

module.exports = new studentController();
