const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // const cookies = req.cookies;
    const { cookie } = req.headers;

    const [tokenType, tokenValue] = (cookie || "").split("=");

    //쿠키
    if (tokenType !== "token") {
        res.status(400).send({
            errorMessage: "token이 아닙니다",
        });
        return;
    }

    try {
        const tokenvoll = jwt.verify(tokenValue, "hohoho");
        res.locals.userId = tokenvoll.userId;
        res.locals.nickname = tokenvoll.nickname;
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({
            errorMessage: "로그인 후 사용하세요.",
        });
        return;
    }
};
