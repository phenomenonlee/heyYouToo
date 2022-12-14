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

//브라우저에 토큰이 발급되어 있는 상태에서 로그인을 시도하면 미들웨어에서
//토큰 유무를 확인 후 다음 응답을 준다.