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
        const { id, password } = req.body;

        const response = await this.usersService.loginUser(id, password);

        // res.cookie("token", response.token);

        if (response.token) {
            return res.status(201).json({ token: response.token });
        }

        res.status(response.status).json(response.message);
    };

    checkUser = async (req, res) => {
        const { id } = req.body;

        const user = await this.usersService.checkUser(id);

        if (user) {
            res.status(400).json({ errorMessage: "중복된 아이디입니다." });
        } else {
            res.status(200).json();
        }
    };
}

module.exports = UsersController;
