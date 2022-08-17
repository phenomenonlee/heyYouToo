const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // const cookies = req.cookies;

    const { authorization } = req.headers;
    const [tokenType, tokenValue] = (authorization || "").split(" ");

    if (tokenType !== "Bearer") {
        res.status(400).json({
            errorMessage: "로그인 후 사용하세요.",
        });
        return;
    }

    /* if (!cookies.token) {
        res.status(400).json({
            errorMessage: "로그인 후 사용하세요.",
        });
        return;
    }
    try {
        const user = jwt.verify(cookies.token, "hohoho");
        res.locals.userId = user.userId;
        res.locals.nickname = user.nickname;
        next(); */
    try {
        const user = jwt.verify(tokenValue, "hohoho");
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
