import axios from "axios";
import authHeader from "./auth-header";
import jwt from "jwt-decode";

const API_URL = process.env.REACT_APP_URL;

class StudentService {
  async getStudent(username) {
    const result = await axios
      .get(API_URL + "/api/student/find?username=" + username, {
        headers: authHeader(),
      })
      .then((res) => res.data)
      .then((res) => {
        let totalGPA = 0;
        let totalTPA = 0;
        let totalCredits = 0;
        for (let i = 0; i < res.history.length; i++) {
          totalTPA += res.history[i].tpa;
          totalGPA += parseFloat(res.history[i].gpa);
          totalCredits += res.history[i].credit;
        }
        res.currentGPA = totalGPA / res.history.length;
        res.currentTPA = totalTPA / res.history.length;
        res.currentCredits = totalCredits.toFixed(0);
        res.currentGPA = res.currentGPA.toFixed(2);
        res.currentTPA = res.currentTPA.toFixed(0);
        return res;
      });
    return result;
  }

  async getAllStudents() {
    const raw = await axios
      .get(API_URL + "/api/student/listAll", { headers: authHeader() })
      .then((res) => res.data);
    const result = raw.map((row) => ({
      id: row.username,
      username: row.username,
      fullname: row.fullname,
      class: row.class,
    }));
    return result;
  }

  async getNumberOfStudentsByClass() {
    const query = JSON.parse(localStorage.getItem("user"));
    const username = jwt(query.accessToken).username;
    const result = await axios
      .get(API_URL + "/api/manager/find?username=" + username, {
        headers: authHeader(),
      })
      .then((res) => res.data.classes)
      .then(async (classes) => {
        let result = 0;
        for (let i = 0; i < classes.length; i++) {
          const students = await axios
            .get(API_URL + "/api/student/list?class=" + classes[i], {
              headers: authHeader(),
            })
            .then((res) => res.data);
          result += students.length;
        }
        return result;
      });
    return result;
  }

  async getStudentsByClass() {
    const query = JSON.parse(localStorage.getItem("user"));
    const username = jwt(query.accessToken).username;
    const result = await axios
      .get(API_URL + "/api/manager/find?username=" + username, {
        headers: authHeader(),
      })
      .then((res) => res.data.classes)
      .then(async (classes) => {
        let raw = [];
        for (let i = 0; i < classes.length; i++) {
          const students = await axios
            .get(API_URL + "/api/student/list?class=" + classes[i], {
              headers: authHeader(),
            })
            .then((res) => res.data);
          raw = raw.concat(students);
        }
        // console.log(raw);
        for (let i = 0; i < raw.length; i++) {
          let totalGPA = 0;
          let totalTPA = 0;
          let totalCredits = 0;
          for (let j = 0; j < raw[i].history.length; j++) {
            totalTPA += raw[i].history[j].tpa;
            totalGPA += parseFloat(raw[i].history[j].gpa);
            totalCredits += raw[i].history[j].credit;
          }
          raw[i].currentGPA = totalGPA / raw[i].history.length;
          raw[i].currentTPA = totalTPA / raw[i].history.length;
          raw[i].credits = totalCredits.toFixed(0);
          if (
            !raw[i].hasPaid ||
            raw[i].currentGPA < 2.0 ||
            raw[i].currentTPA < 50
          ) {
            raw[i].status = "CẢNH BÁO";
          } else if (raw[i].currentGPA >= 3.6 && raw[i].currentTPA >= 90) {
            raw[i].status = "KHEN THƯỞNG";
          } else {
            raw[i].status = "BÌNH THƯỜNG";
          }
          raw[i].currentGPA = raw[i].currentGPA.toFixed(2);
          raw[i].currentTPA = raw[i].currentTPA.toFixed(0);
        }
        const result = raw.map((row) => ({
          id: row.username,
          username: row.username,
          fullname: row.fullname,
          class: row.class,
          currentGPA: row.currentGPA,
          currentTPA: row.currentTPA,
          credits: row.credits,
          status: row.status,
        }));
        return result;
      });
    return result;
  }

  async getWarningStudentsByClass() {
    const query = JSON.parse(localStorage.getItem("user"));
    const username = jwt(query.accessToken).username;
    const result = await axios
      .get(API_URL + "/api/manager/find?username=" + username, {
        headers: authHeader(),
      })
      .then((res) => res.data.classes)
      .then(async (classes) => {
        let raw = [];
        for (let i = 0; i < classes.length; i++) {
          const students = await axios
            .get(API_URL + "/api/student/list?class=" + classes[i], {
              headers: authHeader(),
            })
            .then((res) => res.data);
          raw = raw.concat(students);
        }
        let warning = [];
        for (let i = 0; i < raw.length; i++) {
          let totalGPA = 0;
          let totalTPA = 0;
          let totalCredits = 0;
          for (let j = 0; j < raw[i].history.length; j++) {
            totalTPA += raw[i].history[j].tpa;
            totalGPA += parseFloat(raw[i].history[j].gpa);
            totalCredits += raw[i].history[j].credit;
          }
          raw[i].currentGPA = totalGPA / raw[i].history.length;
          raw[i].currentTPA = totalTPA / raw[i].history.length;
          raw[i].credits = totalCredits.toFixed(0);

          let warningcontext = "";

          if (!raw[i].hasPaid) {
            warningcontext += "Sinh viên chưa đóng học phí \n";
          }
          if (raw[i].currentGPA < 2.0) {
            warningcontext += "GPA của sinh viên dưới 2.0 \n";
          }
          if (raw[i].currentTPA < 50) {
            warningcontext += "Điểm rèn luyện của sinh viên dưới 50 \n";
          }

          if (warningcontext !== "") {
            raw[i].warningcontext = warningcontext;
            warning = warning.concat(raw[i]);
          }

          raw[i].currentGPA = raw[i].currentGPA.toFixed(2);
          raw[i].currentTPA = raw[i].currentTPA.toFixed(0);
        }
        const result = warning.map((row) => ({
          id: row.username,
          username: row.username,
          fullname: row.fullname,
          class: row.class,
          currentGPA: row.currentGPA,
          currentTPA: row.currentTPA,
          credits: row.credits,
          warningcontext: row.warningcontext
        }));
        return result;
      });
    return result;
  }

  async getBonusStudentsByClass() {
    const query = JSON.parse(localStorage.getItem("user"));
    const username = jwt(query.accessToken).username;
    const result = await axios
      .get(API_URL + "/api/manager/find?username=" + username, {
        headers: authHeader(),
      })
      .then((res) => res.data.classes)
      .then(async (classes) => {
        let raw = [];
        for (let i = 0; i < classes.length; i++) {
          const students = await axios
            .get(API_URL + "/api/student/list?class=" + classes[i], {
              headers: authHeader(),
            })
            .then((res) => res.data);
          raw = raw.concat(students);
        }
        let bonus = [];
        for (let i = 0; i < raw.length; i++) {
          let totalGPA = 0;
          let totalTPA = 0;
          let totalCredits = 0;
          for (let j = 0; j < raw[i].history.length; j++) {
            totalTPA += raw[i].history[j].tpa;
            totalGPA += parseFloat(raw[i].history[j].gpa);
            totalCredits += raw[i].history[j].credit;
          }
          raw[i].currentGPA = totalGPA / raw[i].history.length;
          raw[i].currentTPA = totalTPA / raw[i].history.length;
          raw[i].credits = totalCredits.toFixed(0);
          if (raw[i].currentGPA >= 3.6 && raw[i].currentTPA >= 90) {
            bonus = bonus.concat(raw[i]);
          }
          raw[i].currentGPA = raw[i].currentGPA.toFixed(2);
          raw[i].currentTPA = raw[i].currentTPA.toFixed(0);
        }
        const result = bonus.map((row) => ({
          id: row.username,
          username: row.username,
          fullname: row.fullname,
          class: row.class,
          currentGPA: row.currentGPA,
          currentTPA: row.currentTPA,
          credits: row.credits,
        }));
        return result;
      });
    return result;
  }

  async getWarningContext(username) {
    const context = await axios
      .get(API_URL + "/api/student/warn?username=" + username, {
        headers: authHeader(),
      })
      .then((res) => res.data);
    return context;
  }
}

export default new StudentService();
