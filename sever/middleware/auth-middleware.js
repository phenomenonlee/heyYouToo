const jwt = require("jsonwebtoken");
const {User} = require("../models");
module.exports = (req, res, next)=> {
    const cookies = req.cookies;
    
    if(!cookies.token){
        res.status(401).send({
            errorMessage:'로그인 후 사용하세요.'
        });
        return;
    };
    
    try {
        
        const {user} = jwt.verify(tokenValue, "hohoho");
        
        
            res.locals.userid = user.userId;
            res.locals.nickName = user.nickName;
        
        next();
        
    } catch (error) {
    res.status(401).send ({
        errorMessage: '로그인 후 사용하세요.',
       });
       return;
    }
};