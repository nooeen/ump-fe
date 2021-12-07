import axios from "axios";
import authHeader from "./auth-header";
import jwt from "jwt-decode";

const API_URL = process.env.REACT_APP_URL;

class ForumService {
  async list(selectedClass) {
    const result = await axios
      .get(API_URL + "/api/forum/listPosts?class=" + selectedClass, {
        headers: authHeader(),
      })
      .then((res) => res.data);
    return result;
  }

  async get(id) {
    const result = await axios
      .get(API_URL + "/api/forum/post/" + id, {
        headers: authHeader(),
      })
      .then((res) => res.data);
    return result;
  }

  async create() {}

  async delete(id) {
    const result = await axios
      .get(API_URL + "/api/forum/post/" + id + "/force", {
        headers: authHeader(),
      })
      .then((res) => res.data);
    return result;
  }

  async comment() {}
}

export default new ForumService();
