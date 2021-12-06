import axios from "axios";
import authHeader from "./auth-header";
import jwt from "jwt-decode";

const API_URL = process.env.REACT_APP_URL;

class NotificationService {
  async listformanager() {
    const query = JSON.parse(localStorage.getItem("user"));
    const username = jwt(query.accessToken).username;
    const classes = await axios
      .get(API_URL + "/api/manager/find?username=" + username, {
        headers: authHeader(),
      })
      .then((res) => res.data.classes);
    let result = [];
    for (let i = 0; i < classes.length; i++) {
      const data = await axios
        .get(API_URL + "/api/notification/list?class=" + classes[i], {
          headers: authHeader(),
        })
        .then((res) => res.data);
      result = result.concat(data);
    }
    return result;
  }

  async listforstudent() {
    const query = JSON.parse(localStorage.getItem("user"));
    const username = jwt(query.accessToken).username;
    const studentClass = await axios
      .get(API_URL + "/api/student/find?username=" + username, {
        headers: authHeader(),
      })
      .then((res) => res.data.class);
    const result = await axios
      .get(API_URL + "/api/notification/list?class=" + studentClass, {
        headers: authHeader(),
      })
      .then((res) => res.data);
    return result;
  }

  async add() {}

  async delete() {}
}

export default new NotificationService();
