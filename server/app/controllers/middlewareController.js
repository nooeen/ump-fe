const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

class middlewareController {
    authenToken(req,res,next){
        const cookies = req.cookies;
        const token = cookies.token;
        console.log("Token key", process.env.TOKEN_KEY)
        if (typeof(token) === 'undefined') {
            res.send('Chưa đăng nhập');
        } else {
            jwt.verify(token, process.env.TOKEN_KEY, (err, data) => {
                if (err) {
                    res.send('Sai token');
                }
                next();
            });
        }
    
    }
    
}

module.exports = new middlewareController();