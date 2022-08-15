const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const cookies = req.cookies;

    //쿠키
    if (!cookies.token) {
        res.status(400).send({
            errorMessage: "로그인 후 사용하세요.",
        });
        return;
    }

    try {
        const user = jwt.verify(cookies.token, "hohoho");
        res.locals.userId = user.userId;
        res.locals.nickname = user.nickname;
        next();
    } catch (error) {
        console.log("여기가 에러메시지", error);
        res.status(400).send({
            errorMessage: "로그인 후 사용하세요.",
        });
        return;
    }
};
