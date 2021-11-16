import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_URL;

class UserService {
  async isUser() {
    const response = await axios.get(API_URL + "/api/isUser", { headers: authHeader() });
    if (response === 200) {
        return true;
    }
    return false;
  }

  async isManager() {
    const response = await axios.get(API_URL + "/api/isManager", { headers: authHeader() });
    if (response === 200) {
        return true;
    }
    return false;
  }
}

export default new UserService();
