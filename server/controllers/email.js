/* eslint-disable no-useless-escape */
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: "uetmanagementplatform@gmail.com",
    pass: "ump123ump",
  },
  secure: true,
});

class emailController {
  send(req, res) {
    const mailData = {
      from: "uetmanagementplatform@gmail.com",
      to: "duyngoc.nguyen2001@gmail.com",
      subject: "UET MANAGEMENT PLATFORM",
      text: "abc!",
      html: "<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>",
    };

    transporter.sendMail(mailData, function (err, info) {
      if (err) res.json(err);
      else res.json(mailData);
    });
  }

  sendWarning(req, res) {
    const context = req.query.context;
    const username = req.query.username;
    const htmlContent =
      "<p>Xin ch&agrave;o,</p>\n<p>Đ&acirc;y l&agrave; tin nhắn cảnh b&aacute;o học vụ tự động đến từ hệ thống UET Management Platform.</p>\n<p><b>Sinh vi&ecirc;n&nbsp;" +
      username +
      " đã bị cảnh báo vì lý do: </b></p> " +
      context +
      "<p></p>\n<p>UET Management Platform gửi tới qu&yacute; phụ huynh!</p>";
    const mailData = {
      from: "uetmanagementplatform@gmail.com",
      to: "duyngoc.nguyen2001@gmail.com",
      subject: "[UMP]CẢNH BÁO HỌC VỤ",
      html: htmlContent,
    };

    transporter.sendMail(mailData, function (err, info) {
      if (err) res.json(err);
      else res.json(mailData);
    });
  }

  sendBonus(req, res) {
    const username = req.query.username;
    const htmlContent =
      "<p>Xin ch&agrave;o,</p>\n<p>Đ&acirc;y l&agrave; tin nhắn khen thưởng tự động đến từ hệ thống UET Management Platform.</p>\n<p><b>Sinh vi&ecirc;n&nbsp;" +
      username +
      " đã được khen thưởng vì đã có GPA trên 3.6 và điểm chuyên cần trên 90 điểm!</b></p> " +
      "<p></p>\n<p>UET Management Platform gửi tới qu&yacute; phụ huynh!</p>";
    const mailData = {
      from: "uetmanagementplatform@gmail.com",
      to: "duyngoc.nguyen2001@gmail.com",
      subject: "[UMP]THÔNG BÁO KHEN THƯỞNG",
      html: htmlContent,
    };

    transporter.sendMail(mailData, function (err, info) {
      if (err) res.json(err);
      else res.json(mailData);
    });
  }

  sendNotification(req, res) {}
}

module.exports = new emailController();
