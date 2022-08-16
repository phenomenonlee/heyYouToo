const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // const cookies = req.cookies;
    const { cookie } = req.headers;

    //쿠키
    if (!cookie.token) {
        res.status(400).json({
            errorMessage: cookie,
        });
        return;
    }

    try {
        const user = jwt.verify(cookie.token, "hohoho");
        res.locals.userId = user.userId;
        res.locals.nickname = user.nickname;
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({
            errorMessage: "로그인 후 사용하세요.",
        });
        return;
    }
};
