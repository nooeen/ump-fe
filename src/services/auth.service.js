import axios from "axios";
import jwt from "jwt-decode";

const API_URL = process.env.REACT_APP_URL;

class AuthService {
  getUsername() {
    const query = JSON.parse(localStorage.getItem("user"));
    const user = jwt(query.accessToken);
    return user.username;
  }

  login(username, password) {
    return axios
      .post(API_URL + "/api/login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  isUser() {
    const query = JSON.parse(localStorage.getItem("user"));
    if (query) {
      return true;
    }
    return false;
  }

  isStudent() {
    const query = JSON.parse(localStorage.getItem("user"));
    if (query) {
      const user = jwt(query.accessToken);
      if (user.role === "student") {
        return true;
      }
    }
    return false;
  }

  isManager() {
    // const response = await axios.get(API_URL + "/api/isManager", { headers: authHeader() });
    // if (response === 200) {
    //     return true;
    // }
    // return false;
    const query = JSON.parse(localStorage.getItem("user"));
    if (query) {
      const user = jwt(query.accessToken);
      // console.log(user);
      if (user.role === "manager") {
        return true;
      }
    }
    return false;
  }
}

export default new AuthService();
