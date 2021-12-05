import axios from "axios";
import authHeader from "./auth-header";
import jwt from "jwt-decode";

const API_URL = process.env.REACT_APP_URL;

class ChatService {
    async getUserInfor() {
        const query = JSON.parse(localStorage.getItem("user"));
        const username = jwt(query.accessToken);
        return username
    }
  }
  
  export default new ChatService();