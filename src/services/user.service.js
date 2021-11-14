import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_URL;

class UserService {
  isUser() {
    const response = axios.get(API_URL + "/isUser", { headers: authHeader() });
    console.log(response);
    if (response === 200) {
        return true;
    }
    return false;
  }

  isManager() {
    const response = axios.get(API_URL + "/isManager", { headers: authHeader() });
    console.log(response);
    if (response === 200) {
        return true;
    }
    return false;
  }
}

export default new UserService();
