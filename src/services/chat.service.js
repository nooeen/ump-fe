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

    async getMessage(sender, receiver) {
        const res = await axios
        .get(API_URL + "/api/chat/getMessage?sender=" + sender + "&receiver=" + receiver)
        .then((res) => {
            return res
        })
        return res
    }

    async getListMessager(sender) {
        const res = await axios
        .get(API_URL + "/api/chat/getListMessager?sender=" + sender)
        .then((res) => {
            return res
        })
        return res
    }

    async saveMessage(
        _receiver,
        _sender,
        _text,
    ) {
        await axios.post(
            API_URL + "/api/chat/saveMessage",
            {
              receiver: _receiver,
              sender: _sender,
              text: _text,
            },
          );
        return
    }

  }
  
  export default new ChatService();