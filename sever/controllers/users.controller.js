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
    //아이디 중복체크
    checkUser = async (req, res) => {
        const { id } = req.body;

        const user = await this.usersService.checkUser(id);

        if (user) {
            res.status(200).json();
        } else {
            res.status(400).json({ errorMessage: "중복된 아이디입니다." });
        }
    };
}

module.exports = UsersController;

//라우터에서 컨트롤러로 콜스택이 동작하면 각 기능에 맞게 컨트롤러에서 서비스로
//호출하고 컨트롤러에서는 리스폰역할을 담당하는 기능을 한다.