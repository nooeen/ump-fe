import axios from "axios";
import authHeader from "./auth-header";
import jwt from "jwt-decode";

const API_URL = process.env.REACT_APP_URL;

class StudentService {
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

  async getStudentsByClass() {
    const query = JSON.parse(localStorage.getItem("user"));
    const username = jwt(query.accessToken).username;
    const result = await axios
      .get(API_URL + "/api/manager/find?username=" + username)
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
        const result = raw.map((row) => ({
          id: row.username,
          username: row.username,
          fullname: row.fullname,
          class: row.class,
        }));
        return result;
      });
    return result;
  }
}

export default new StudentService();
