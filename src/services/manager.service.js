import axios from "axios";
import authHeader from "./auth-header";
import jwt from "jwt-decode";

const API_URL = process.env.REACT_APP_URL;

class ManagerService {
  async getManagerClasses() {
    const query = JSON.parse(localStorage.getItem("user"));
    const username = jwt(query.accessToken).username;
    const result = await axios
      .get(API_URL + "/api/manager/list/classes?username=" + username, {
        headers: authHeader(),
      })
      .then((res) => res.data.classes);
    return result;
  }

  async getCurrentManager() {
    const query = JSON.parse(localStorage.getItem("user"));
    const username = jwt(query.accessToken).username;
    const result = await axios
      .get(API_URL + "/api/manager/find?username=" + username, {
        headers: authHeader(),
      })
      .then((res) => res.data);
    return result;
  }

  async getCurrentManagerFromStudent() {
    const query = JSON.parse(localStorage.getItem("user"));
    const username = jwt(query.accessToken).username;
    const result = await axios
      .get(API_URL + "/api/manager/findfromstudent?username=" + username, {
        headers: authHeader(),
      })
      .then((res) => res.data);
    return result;
  }
}

export default new ManagerService();
