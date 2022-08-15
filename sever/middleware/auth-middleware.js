const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const cookies = req.cookies;
    console.log("123456", cookies);

    //쿠키
    if (!cookies.token) {
        res.status(400).send({
            errorMessage: "123로그인 후 사용하세요.",
        });
        return;
    }

    try {
        const user = jwt.verify(cookies.token, "hohoho");
        res.locals.userId = user.userId;
        res.locals.nickname = user.nickname;
        next();
    } catch (error) {
        console.log(error);
        res.status(400).send({
            errorMessage: "로그인 후 사용하세요.",
        });
        return;
    }
};
