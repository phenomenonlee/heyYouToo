const jwt = require("jsonwebtoken");
//const {User} = require("../models");
const {User} = require("../../models");
module.exports = (req, res, next)=> {
    const {authorization} = req.headers;
    
    const [tokenType, tokenValue] = authorization.split(' ');
    
    
    if (tokenType !== 'Bearer') {
        res.status(401).send ({
        errorMessage: '로그인 후 사용하세요.',
        });
        return;

    }
    
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