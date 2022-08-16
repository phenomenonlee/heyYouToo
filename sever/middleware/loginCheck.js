module.exports = (req, res, next) => {
    
    //로그인 체크
    const cookie = req.cookies;
    if (cookie.token) {
        res.status(400).send({
            errorMessage: "이미 로그인 되어 있습니다. ",
        });
        return;
    } else{
        next();
    };
};