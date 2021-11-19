import axios from "axios";
import authHeader from "./auth-header";
// import jwt from "jwt-decode";

const API_URL = process.env.REACT_APP_URL;

class StudentService {
  async getAllStudents() {
    const raw = await axios.get(API_URL + "/api/student/listAll").then((res) => res.data);
    const result = raw.map((row) => ({
      id: row.username,
      username: row.username,
      fullname: row.fullname,
      class: row.class,
    }));
    return result;
  }

  getStudentsByClass() {

  }
}

export default new StudentService();
