var nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: 'vupv223@gmail.com',
        pass: '***********',
        },
    secure: true,
    });

class emailController {

    send(req,res){
        const mailData = {
            from: 'vupv223@gmail.com',
            to: 'duyngoc.nguyen2001@gmail.com',
            subject: 'UET MANAGEMENT PLATFORM',
            text: 'abc!',
            html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
        };

        transporter.sendMail(mailData, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
              res.json("ok");
         });

    }
}

module.exports = new emailController;