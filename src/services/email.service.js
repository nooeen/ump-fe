import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_URL;

class EmailService {
  async sendWarningEmail(username, context) {
    const email = await axios
      .get(
        API_URL +
          "/api/email/sendwarning?username=" +
          username +
          "&context=" +
          context,
        {
          headers: authHeader(),
        }
      )
      .then((res) => res.data);
    return email;
  }

  async sendBonusEmail(username) {
    const email = await axios
      .get(API_URL + "/api/email/sendbonus?username=" + username, {
        headers: authHeader(),
      })
      .then((res) => res.data);
    return email;
  }
}

export default new EmailService();
