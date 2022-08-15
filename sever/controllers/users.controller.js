const UsersService = require("../services/users.service");

class UsersController {
    usersService = new UsersService();

    //회원가입
    createUser = async (req, res, next) => {
        const { id, password, confirmPw, nickName } = req.body;
        const response = await this.usersService.createUser(
            id,
            password,
            confirmPw,
            nickName
        );

        res.status(response.status).json(response.message);
    };

    //로그인
    loginUser = async (req, res, next) => {
        const cookie = req.cookies;
        if (cookie.Bearer) {
            res.status(400).send({
                errorMessage: "이미 로그인 되어 있습니다. ",
            });
            return;
        }
        const { id, password } = req.body;

        const response = await this.usersService.loginUser(id, password);

        if (response.token) {
            return res.status(201).json({ token: response.token });
        }
        res.status(response.status).json(response.message);
    };
}

module.exports = UsersController;
